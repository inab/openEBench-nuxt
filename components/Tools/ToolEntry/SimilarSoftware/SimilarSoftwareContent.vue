<template>
	<v-container class="mt-0 pt-0 pl-6">
		<div>
			<v-row class="mt-2 pt-0 mb-0">
				<v-col cols="12" class="mt-0 pt-0 pl-1 ml-1 pb-0">
					<!-- Loading -->
					<v-skeleton-loader
						v-if="loadingSimilar"
						type="image, image, image"
					></v-skeleton-loader>

					<!-- Empty -->
					<p
						v-else-if="similarTools.length === 0"
						class="text--secondary text-body-2"
					>
						No similar tools found.
					</p>

					<!-- Carousel: one page (3 cards) visible, slides horizontally -->
					<template v-else>
						<div class="carousel-viewport">
							<div
								class="carousel-track"
								:style="{ transform: `translateX(-${(page - 1) * 100}%)` }"
							>
								<div v-for="(chunk, p) in pages" :key="p" class="carousel-page">
									<v-row>
										<v-col
											v-for="(item, i) in chunk"
											:key="item.tool_id || i"
											cols="12"
											sm="6"
											md="4"
										>
											<div
												class="similar-card fill-height d-flex flex-column"
												:class="{
													'similar-card--strong': isStrongMatch(item.score),
												}"
											>
												<!-- Name + strong match badge -->
												<div
													class="d-flex align-center flex-wrap"
													style="gap: 6px"
												>
													<nuxt-link
														:to="'/tool/' + item.tool_name + '-' + item.tool_id"
														class="similar-title text-truncate"
														>{{ item.tool_name }}</nuxt-link
													>
													<v-chip
														v-if="isStrongMatch(item.score)"
														x-small
														color="green lighten-4"
														text-color="green darken-3"
														class="strong-chip"
													>
														<v-icon x-small left>mdi-star</v-icon>
														Strong match
													</v-chip>
												</div>

												<!-- Description -->
												<!-- eslint-disable-next-line vue/no-v-html -->
												<div
													v-if="displayDescription(item)"
													class="text-body-2 text--secondary mt-1 similar-description"
													v-html="renderMarkdown(displayDescription(item))"
												></div>

												<v-spacer></v-spacer>

												<!-- Source icons -->
												<div
													v-if="hasSources(item)"
													class="similar-sources d-flex align-center flex-wrap mt-2"
													style="gap: 4px"
												>
													<LinkChipWImage
														v-for="[key, value] in Object.entries(
															item.sources_labels
														)"
														:key="key"
														:link="value"
														:type="key"
														:text="key"
														minimal
													/>
												</div>

												<!-- Topics & operations -->
												<div
													v-if="allTags(item).length > 0"
													class="similar-tags d-flex align-center flex-wrap mt-2"
												>
													<LinkChipTopicOperation
														v-for="(tag, t) in visibleTags(item)"
														:key="tag.uri || t"
														:uri="tag.uri"
														:text="cleanString(tag.term)"
														:icon="tag.icon"
														:attach="false"
													/>
													<v-chip
														v-if="hiddenTagCount(item) > 0"
														label
														small
														light
														color="grey lighten-4"
														class="mr-1 mt-1"
														@click="expandTags(item)"
													>
														+{{ hiddenTagCount(item) }} more
													</v-chip>
													<v-chip
														v-else-if="
															isExpanded(item) && isTagsCollapsible(item)
														"
														label
														small
														light
														color="grey lighten-4"
														class="mr-1 mt-1"
														@click="collapseTags(item)"
													>
														show less
													</v-chip>
												</div>
											</div>
										</v-col>
									</v-row>
								</div>
							</div>
						</div>

						<!-- Count + dots in one tight row -->
						<div class="carousel-footer">
							<span v-if="similarTools.length" class="similar-count">
								Showing {{ similarTools.length }} most similar tools
							</span>

							<div
								v-if="pageCount > 1"
								class="d-flex align-center"
								style="gap: 4px"
							>
								<v-btn
									icon
									x-small
									:disabled="page === 1"
									aria-label="Previous"
									@click="prevPage"
								>
									<v-icon size="16">mdi-chevron-left</v-icon>
								</v-btn>

								<span
									v-for="p in pageCount"
									:key="p"
									class="page-dot"
									:class="{ 'page-dot--active': p === page }"
									@click="page = p"
								/>

								<v-btn
									icon
									x-small
									:disabled="page === pageCount"
									aria-label="Next"
									@click="nextPage"
								>
									<v-icon size="16">mdi-chevron-right</v-icon>
								</v-btn>
							</div>
						</div>
					</template>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import LinkChipWImage from '~/components/Tools/Search/Card/LinkChipWImage.vue';
import LinkChipTopicOperation from '~/components/Tools/Search/Card/LinkChipTopicOperation.vue';

const HIGH_MATCH_THRESHOLD = 0.85;
const MAX_VISIBLE_TAGS = 3;

export default {
	name: 'SimilarSoftwareContent',
	components: { LinkChipWImage, LinkChipTopicOperation },
	data() {
		return {
			page: 1,
			perPage: 3,
			// Fallback descriptions (from "help" documentation) keyed by tool_id,
			// used for similar tools that have no description of their own.
			fallbackDescriptions: {},
			// Per-card expansion state for the topics/operations chips,
			// keyed by tool_id.
			expandedTags: {},
		};
	},

	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			similarTools: 'similarTools',
			loadingSimilar: 'loadingSimilar',
		}),

		pageCount() {
			return Math.ceil(this.similarTools.length / this.perPage);
		},

		pages() {
			const chunks = [];
			for (let i = 0; i < this.similarTools.length; i += this.perPage) {
				chunks.push(this.similarTools.slice(i, i + this.perPage));
			}
			return chunks;
		},
	},

	watch: {
		similarTools: {
			immediate: true,
			handler() {
				this.page = 1;
				this.fetchMissingDescriptions();
			},
		},
	},

	methods: {
		// Description shown on the card: the tool's own, or a "help" doc fallback.
		displayDescription(item) {
			const text =
				item.description || this.fallbackDescriptions[item.tool_id] || '';
			// Drop a leading "What it does" heading (optionally bold / colon).
			return text
				.replace(/^\s*(\*\*)?\s*what it does\s*(\*\*)?\s*:?\s*/i, '')
				.trimStart();
		},

		// Render inline markdown (bold, italics, links, …) as sanitized HTML.
		renderMarkdown(text) {
			if (!text) return '';
			return DOMPurify.sanitize(marked.parseInline(text));
		},

		// For similar tools without a description, fetch their record and use the
		// content of a "help" documentation element instead.
		async fetchMissingDescriptions() {
			await Promise.all(
				this.similarTools
					.filter(
						(item) =>
							item.tool_name &&
							!item.description &&
							!(item.tool_id in this.fallbackDescriptions)
					)
					.map(async (item) => {
						try {
							const { data } = await this.$observatory.get(
								`/tools?name=${encodeURIComponent(item.tool_name)}`
							);
							const help = (data?.documentation || []).find(
								(doc) => doc.term?.type === 'help' && doc.term?.content
							);
							this.$set(
								this.fallbackDescriptions,
								item.tool_id,
								help ? help.term.content : ''
							);
						} catch (e) {
							this.$set(this.fallbackDescriptions, item.tool_id, '');
						}
					})
			);
		},

		isStrongMatch(score) {
			return typeof score === 'number' && score >= HIGH_MATCH_THRESHOLD;
		},

		hasSources(item) {
			return item.sources_labels && Object.keys(item.sources_labels).length > 0;
		},

		// Strip surrounding quotes from a term label.
		cleanString(str) {
			if (!str) return '';
			return str.replace(/^"|"$/g, '');
		},

		// Topics and operations merged into a single chip list, each tagged
		// with its own icon. (The similarity API currently returns topics only,
		// but operations are handled too in case they appear.)
		allTags(item) {
			const topics = (item.topics || []).map((t) => ({
				...t,
				icon: 'mdi-label-multiple',
			}));
			const operations = (item.operations || []).map((o) => ({
				...o,
				icon: 'mdi-cog',
			}));
			return [...topics, ...operations];
		},

		isExpanded(item) {
			return !!this.expandedTags[item.tool_id];
		},

		visibleTags(item) {
			const tags = this.allTags(item);
			return this.isExpanded(item) ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
		},

		hiddenTagCount(item) {
			if (this.isExpanded(item)) return 0;
			return Math.max(this.allTags(item).length - MAX_VISIBLE_TAGS, 0);
		},

		isTagsCollapsible(item) {
			return this.allTags(item).length > MAX_VISIBLE_TAGS;
		},

		expandTags(item) {
			this.$set(this.expandedTags, item.tool_id, true);
		},

		collapseTags(item) {
			this.$set(this.expandedTags, item.tool_id, false);
		},

		prevPage() {
			if (this.page > 1) this.page -= 1;
		},

		nextPage() {
			if (this.page < this.pageCount) this.page += 1;
		},

		dotColor(index) {
			const colors = ['dot-green', 'dot-orange', 'dot-blue', 'dot-teal'];
			return colors[index % colors.length];
		},
	},
};
</script>

<style scoped>
.carousel-viewport {
	overflow-x: hidden;
	overflow-y: visible;
	width: 100%;

	/* No horizontal padding: overflow:hidden clips at the padding box, so any
	   horizontal padding would reveal a sliver of the adjacent page's edge card.
	   Vertical padding gives top/bottom breathing room for the cards' shadows. */
	padding: 4px 0 12px;
}

.carousel-track {
	display: flex;
	transition: transform 0.4s ease;
	will-change: transform;
}

.carousel-page {
	flex: 0 0 100%;
	width: 100%;
}

.carousel-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 6px; /* ← snug under cards */
}

.similar-card {
	padding: 12px;
	border: 1px solid rgba(0, 0, 0, 8%);
	border-radius: 6px;
	height: 100%;
	min-height: 200px;
	transition: box-shadow 0.2s ease;
}

.similar-card:hover {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 10%);
}

.similar-card--strong {
	background-color: rgba(76, 175, 80, 6%);
	border-left: 3px solid #4caf50;
}

.similar-title {
	font-weight: 600;
	font-size: 0.92rem;
	color: rgba(0, 0, 0, 87%);
	line-height: 1.4;
	text-decoration: none;
	max-width: 100%;
}

.similar-description {
	/* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
	display: -webkit-box;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
	/* stylelint-enable value-no-vendor-prefix, property-no-vendor-prefix */
	overflow: hidden;
}

.similar-title:hover {
	color: #0b579f;
	text-decoration: underline;
}

.strong-chip {
	font-weight: 600;
}

/* pale blue background for the source icon chips */
.similar-sources ::v-deep .v-chip {
	background-color: #e0eaf3 !important;
}

.similar-sources ::v-deep .v-chip:hover {
	background-color: #cbdcec !important;
}

.pub-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-top: 4px;
	flex-shrink: 0;
}

.pub-line {
	width: 2px;
	height: 20px;
	flex-shrink: 0;
}

.dot-black {
	background-color: rgba(17, 16, 16, 95%);
}

.dot-strong {
	background-color: #4caf50;
}

.dot-green {
	background-color: #4caf50;
}

.dot-orange {
	background-color: #ff9800;
}

.dot-blue {
	background-color: #2196f3;
}

.dot-teal {
	background-color: #009688;
}

.similar-count {
	font-size: 0.75rem;
	color: rgba(0, 0, 0, 38%);
	font-weight: 400;
	font-style: italic;
	margin: 0;
	line-height: 1;
}

.page-dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: rgba(0, 0, 0, 18%);
	cursor: pointer;
	transition: background 0.2s, transform 0.2s;
	flex-shrink: 0;
}

.page-dot--active {
	background: #0b579f;
	transform: scale(1.25);
}

.page-dot:hover:not(.page-dot--active) {
	background: rgba(0, 0, 0, 35%);
}
</style>
