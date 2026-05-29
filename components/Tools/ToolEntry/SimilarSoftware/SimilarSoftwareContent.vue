<template>
	<v-container class="mt-0 pt-0 pl-6">
		<div>
			<v-row class="mt-2 pt-0 mb-2">
				<v-col cols="12" class="mt-0 pt-0 pl-1 ml-1">
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
														:to="'/tool/' + item.tool_name"
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
												<div
													v-if="item.description"
													class="text-body-2 text--secondary mt-1 similar-description"
												>
													{{ item.description }}
												</div>

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
											</div>
										</v-col>
									</v-row>
								</div>
							</div>
						</div>

						<!-- Arrows, bottom right -->
						<div
							v-if="pageCount > 1"
							class="d-flex align-center justify-end mt-2"
						>
							<span class="text-caption text--secondary mr-2">
								{{ page }} / {{ pageCount }}
							</span>
							<v-btn
								icon
								small
								:disabled="page === 1"
								aria-label="Previous"
								@click="prevPage"
							>
								<v-icon>mdi-chevron-left</v-icon>
							</v-btn>
							<v-btn
								icon
								small
								:disabled="page === pageCount"
								aria-label="Next"
								@click="nextPage"
							>
								<v-icon>mdi-chevron-right</v-icon>
							</v-btn>
						</div>
					</template>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import LinkChipWImage from '~/components/Tools/Search/Card/LinkChipWImage.vue';

const HIGH_MATCH_THRESHOLD = 0.85;

export default {
	name: 'SimilarSoftwareContent',
	components: { LinkChipWImage },
	data() {
		return {
			page: 1,
			perPage: 3,
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
		similarTools() {
			this.page = 1;
		},
	},

	methods: {
		isStrongMatch(score) {
			return typeof score === 'number' && score >= HIGH_MATCH_THRESHOLD;
		},

		hasSources(item) {
			return item.sources_labels && Object.keys(item.sources_labels).length > 0;
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

	/* breathing room so card borders/shadows aren't clipped */
	padding: 4px 2px 12px;
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
	color: #1976d2;
	text-decoration: underline;
}

.strong-chip {
	font-weight: 600;
}

/* pale blue background for the source icon chips */
.similar-sources ::v-deep .v-chip {
	background-color: #e3f2fd !important;
}

.similar-sources ::v-deep .v-chip:hover {
	background-color: #bbdefb !important;
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
</style>
