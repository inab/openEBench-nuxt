<template>
	<div :class="{ 'is-loading': loading }">
		<!-- Breadcrumbs inside tool -->
		<div v-if="breadcrumbs.length > 0" class="pb-0 breadcrumbs">
			<v-breadcrumbs :items="breadcrumbs" dark class="v-breadcrumbs">
				<template #divider>
					<v-icon class="v-breadcrumbs-divider">mdi-chevron-right</v-icon>
				</template>
				<template #item="{ item }">
					<v-breadcrumbs-item
						:to="item.to"
						:disabled="item.disabled"
						exact
						class="white--text"
					>
						{{ item.text }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
		</div>

		<div class="tool-brief-wrapper">
			<ToolBrief
				v-if="!introVisible && hasToolData"
				:name="tool.label[0]"
				:type="tool.type"
				:version="tool.version"
				:sources-labels="tool.sources_labels"
				:webpage="tool.webpage"
			/>
		</div>

		<!-- SideBar -->
		<v-card
			:class="[
				'fixed-card ml-6',
				{ 'fixed-card--sticky': !introVisible && !loading },
			]"
			max-width="500"
			elevation="0"
		>
			<v-list nav dense class="pt-0 pb-0">
				<v-list-item-group v-model="activeItem" active-class="primary--text">
					<v-list-item v-for="(item, i) in items" :key="i">
						<v-list-item-content
							:active="activeItem === i"
							@click="$vuetify.goTo('#' + item.id, { offset: 60 })"
						>
							<v-list-item-title
								class="text-subtitle-1 pb-1"
								v-text="item.title"
							>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>

		<!-- FAIRsoft scores: fixed in the right gutter, mirroring the left nav.
			 Shown only from 1500px up; below that it is hidden and the content
			 cards reclaim the freed space (see #main-container / .fair-fixed rules). -->
		<div v-if="hasToolData" class="fair-fixed">
			<FAIRScores />
		</div>

		<div id="main-container" ref="Main" class="pt-2">
			<v-row justify="center">
				<v-col v-if="hasToolData" cols="7" lg="12">
					<!-- Card principal -->
					<v-card elevation="1" class="mt-0 mb-6 pa-5 content-cards">
						<EntryIntro
							ref="Intro"
							:name="tool.label[0]"
							:description="toolDescription"
							:type="tool.type"
							:version="tool.version"
							:webpage="tool.webpage"
							:sources-labels="tool.sources_labels"
						/>
					</v-card>

					<!-- Cards seciones. -->
					<v-card
						v-for="(item, i) in items"
						:id="item.id"
						:key="i"
						elevation="1"
						class="mt-6 mb-6 pa-5 content-cards"
					>
						<v-card-title
							ref="Items"
							class="text-h5 card-titles font-weight-bold mb-2"
							v-text="item.title"
						></v-card-title>
						<component :is="item.component"></component>
					</v-card>
				</v-col>

				<v-col v-else cols="7">
					<v-skeleton-loader
						type="article, list-item-three-line, article, list-item-three-line, image"
					>
					</v-skeleton-loader>
				</v-col>
			</v-row>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import MainCard from '~/components/Tools/MainCard.vue';
import EntryIntro from '~/components/Tools/ToolEntry/EntryIntro.vue';
import ToolBrief from '~/components/Tools/ToolEntry/ToolBrief.vue';
import CitationContent from '~/components/Tools/ToolEntry/Citation/CitationContent.vue';
import DocumentationContent from '~/components/Tools/ToolEntry/Documentation/DocumentationContent.vue';
import AvailabilityContent from '~/components/Tools/ToolEntry/Availability/AvailabilityContent.vue';
import LicenseContent from '~/components/Tools/ToolEntry/License/LicenseContent.vue';
import SimilarSoftwareContent from '~/components/Tools/ToolEntry/SimilarSoftware/SimilarSoftwareContent.vue';
import FAIRScores from '~/components/Tools/ToolEntry/FAIR/FAIRScores.vue';
import { pickDescription } from '~/utils/toolDescription';

export default {
	name: 'ToolEntry',
	components: {
		MainCard,
		EntryIntro,
		ToolBrief,
		CitationContent,
		DocumentationContent,
		AvailabilityContent,
		LicenseContent,
		SimilarSoftwareContent,
		FAIRScores,
	},
	layout: 'DefaultLayoutWOBreadcrumbs',
	data() {
		return {
			sections: [
				{
					title: 'Documentation',
					id: 'documentation',
					component: 'DocumentationContent',
				},
				{
					title: 'Availability',
					id: 'availability',
					component: 'AvailabilityContent',
				},
				{
					title: 'Citation',
					id: 'citation',
					component: 'CitationContent',
				},
				{
					title: 'Licensing',
					id: 'licensing',
					component: 'LicenseContent',
				},
				{
					title: 'Similar Software',
					id: 'similar-software',
					component: 'SimilarSoftwareContent',
				},
			],
			selected: 0,
			visible: false,
			visibleItems: {
				0: true,
				1: false,
				2: false,
				3: false,
				4: false,
				5: false,
			},
			introVisible: true,
			activeItem: 0,
		};
	},

	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
			similarTools: 'similarTools',
			loadingSimilar: 'loadingSimilar',
		}),
		// Whether the tool has loaded with renderable data. The template reads
		// tool.label[0] / tool.description[0].term directly, so we must not render
		// the content (or flip out of the skeleton) until those fields exist —
		// otherwise an empty tool (e.g. a 404) crashes the render before the error
		// page can take over.
		hasToolData() {
			return !this.loading && !!this.tool?.label?.length;
			// Whether the availability section should be shown (has uptime, galaxy, or installation info)
		},

		hasAvailability() {
			const allowedTypes = [
				'web',
				'rest',
				'sparql',
				'soap',
				'workbench',
				'suite',
			];
			const hasUptime = (this.tool?.type || []).some((t) =>
				allowedTypes.includes(t)
			);
			const source = this.tool?.source || [];
			const hasGalaxy = source.includes('galaxy');
			const hasInstallation =
				source.includes('bioconda_recipes') ||
				source.includes('bioconductor') ||
				this.tool?.repository?.length > 0 ||
				this.tool?.download?.length > 0;
			return hasUptime || hasGalaxy || hasInstallation;
		},
		// Whether the tool has any usable licensing information
		hasLicenseInfo() {
			return (this.tool?.license || []).some(
				(item) => item.term?.name || item.term?.url
			);
		},
		// Whether the similar software section should be shown
		hasSimilarSoftware() {
			return this.loadingSimilar || this.similarTools.length > 0;
		},
		// Whether the documentation section should be shown. The card renders
		// Documents (documentation entries with a URL), Related topics and
		// Function (operations); a documentation entry that only carries inline
		// `content` (no URL) renders nothing, so it must not, on its own, show
		// the card.
		hasDocumentation() {
			const hasDocuments = (this.tool?.documentation || []).some(
				(doc) => doc.term?.url
			);
			const hasTopics = (this.tool?.topics || []).some(
				(topic) => topic.term?.term
			);
			const hasOperations = (this.tool?.operations || []).some(
				(operation) => operation.term?.term
			);
			return hasDocuments || hasTopics || hasOperations;
		},
		// Sections to render, hiding cards that have no information
		items() {
			return this.sections.filter((section) => {
				if (section.id === 'documentation') return this.hasDocumentation;
				if (section.id === 'licensing') {
					return this.hasLicenseInfo;
				}
				if (section.id === 'similar-software') {
					return this.hasSimilarSoftware;
				}
				if (section.id === 'availability') return this.hasAvailability;
				return true;
			});
		},
		// Breadcrumbs: Home > Tools > Search (clickable) > Tool Name
		breadcrumbs() {
			const referrerFilters = this.$store.state.tool?.referrerFilters || {};
			const hasReferrerFilters = Object.keys(referrerFilters).length > 0;
			const searchTerm =
				typeof referrerFilters.q === 'string' && referrerFilters.q.trim()
					? referrerFilters.q.trim()
					: '';
			const crumbs = [{ text: 'Home', disabled: false, exact: true, to: '/' }];

			if (hasReferrerFilters) {
				crumbs.push({
					text: 'Tools',
					disabled: false,
					exact: true,
					to: {
						path: '/tool/search',
						query: referrerFilters,
					},
				});
			} else {
				crumbs.push({
					text: 'Tools',
					disabled: false,
					exact: true,
					to: '/tool',
				});
			}

			if (searchTerm) {
				crumbs.push({
					text: `Search: ${searchTerm}`,
					disabled: true,
				});
			}

			crumbs.push({
				text: this.loading
					? '...'
					: this.tool.label?.[0] || this.$route.params.id,
				disabled: true,
			});
			return crumbs;
		},
		// Get other description in documentation Help.
		toolDescription() {
			// Caso normal — prefer the first non-markdown description entry.
			const description = pickDescription(this.tool?.description);

			if (description) {
				return description;
			}

			// Fallback a documentation
			const content = this.tool?.documentation?.find(
				(doc) => doc.term?.type === 'help'
			)?.term?.content;

			if (!content) {
				return '';
			}

			return this.extractDescription(content);
		},
	},

	watch: {
		'$route.params.id'(toolParam) {
			this.loadTool(toolParam); // already calls loadTool, no change needed
		},

		// Fetch similar tools at the page level so the card's visibility can be
		// determined even when the (conditionally rendered) child isn't mounted.
		'tool.id': {
			immediate: true,
			handler(toolId) {
				if (toolId) {
					this.retrieveSimilarTools(toolId);
				}
			},
		},
	},

	beforeMount() {
		// Get name and type from URL
		// this.$store.dispatch('tool/setToolName', this.$route.params.name)
		this.loadTool(this.$route.params.id);
	},

	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},

	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	methods: {
		...mapActions('tool_entry', ['retrieveSimilarTools']),

		async loadTool(toolParam) {
			// Split "name-id" → extract the id (last segment after final dash)
			const lastDash = toolParam.lastIndexOf('-');
			const toolId =
				lastDash !== -1 ? toolParam.slice(lastDash + 1) : toolParam;
			const toolName =
				lastDash !== -1 ? toolParam.slice(0, lastDash) : toolParam;

			try {
				const found = await this.$store.dispatch('tool_entry/retrieveTool', {
					name: toolName,
					id: toolId,
				});
				if (found === false) {
					this.$nuxt.error({ statusCode: 404, message: 'Tool not found' });
				}
			} catch (e) {
				// Surface genuine (non-404) failures on the error page too.
				this.$nuxt.error({
					statusCode: e?.response?.status || 500,
					message: 'Unable to load this tool',
				});
			}
		},
		elementIsVisibleInViewport(ref, partiallyVisible = true) {
			if (this.visible) {
				const { top, left, bottom, right } = ref.getBoundingClientRect();
				const { innerHeight, innerWidth } = window;
				return partiallyVisible
					? ((top > 0 && top < innerHeight) ||
							(bottom > 0 && bottom < innerHeight)) &&
							((left > 0 && left < innerWidth) ||
								(right > 0 && right < innerWidth))
					: top >= 0 &&
							left >= 0 &&
							bottom <= innerHeight &&
							right <= innerWidth;
			} else {
				return false;
			}
		},

		menuSections() {
			const refs = this.$refs.Items;
			if (!refs || !Array.isArray(refs) || refs.length === 0) return;

			for (let i = 0; i < refs.length; i++) {
				const ref = refs[i];
				if (ref) {
					this.visibleItems[i] = this.elementIsVisibleInViewport(ref);
				}
			}

			for (let i = 0; i < refs.length; i++) {
				if (this.visibleItems[i]) {
					this.activeItem = i;
					break;
				}
			}
		},
		entryBriefVisibility() {
			if (this.$refs.Intro !== undefined) {
				// console.log(this.$refs.Intro);
				this.introVisible = this.elementIsVisibleInViewport(
					this.$refs.Intro.$refs.Intro
				);
			}
		},

		handleScroll() {
			this.visible = true;
			this.menuSections(); // Menu sections activiation
			this.entryBriefVisibility(); // first visibleItem is activeItem

			// 500 the height of the fixed menu + tool brief + nav bar
			this.offsetMenu = window.innerHeight - 500; // Menu position -> stop at footer
		},

		extractDescription(content) {
			const firstLine = content
				.split('\n')
				.map((line) => line.trim())
				.find(
					(line) =>
						line &&
						!line.startsWith('**') &&
						!line.startsWith('..') &&
						!line.startsWith('---')
				);

			return firstLine || '';
		},
	},
};
</script>
<style scoped>
.fixed-card {
	width: 200px;
	margin-top: 24px;
	margin-left: 64px !important;
	position: absolute;
	z-index: 50px;
}

.fixed-card ::v-deep .v-list--dense .v-list-item .v-list-item__title {
	font-size: 1.05rem;
}

.fixed-card--sticky {
	position: fixed;
	z-index: 50px;
}

#tool-brief {
	position: fixed;
	width: 180px;
}

.content-cards {
	min-height: 200px;
	max-width: 960px;
	margin-left: auto;
	margin-right: auto;
}

#to-top {
	position: fixed;
	right: 80px;
}

.fair-fixed {
	display: none; /* shown only on wide screens (see media query below) */
	position: fixed;
	top: 130px; /* clears the app header + breadcrumbs, aligns near the main card top */
	right: 0;
	width: 340px; /* spans the reserved right gutter (see padding-right below) */
	justify-content: center; /* center the card within the gutter, not flush right */
	word-wrap: normal;
	z-index: 50;
}

/* lg–wide: not yet enough room to center the 960px card beside the edge-pinned
   nav, so push the content right to clear the fixed left nav. */
@media (min-width: 1264px) {
	#main-container {
		padding-left: 300px; /* clear the fixed left nav (64px margin + 200px width + gap) */
		padding-right: 48px;
	}
}

/* Wide: enough room to center the 960px card in the viewport and tuck the left
   nav right beside it (anchored to the card's left edge: 50% - 480 - 24 - 200). */
@media (min-width: 1450px) {
	#main-container {
		padding-left: 48px;
		padding-right: 48px;
	}

	.fixed-card {
		left: calc(50% - 704px);
		margin-left: 0 !important;
	}
}

/* Extra-wide: room to also show the FAIR panel hugging the card's right edge
   (anchored at 50% + 480 + 24), with the card still centered. */
@media (min-width: 1600px) {
	.fair-fixed {
		display: flex;
		left: calc(50% + 504px);
		right: auto;
		width: 280px;
	}
}

.v-breadcrumbs {
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	flex: 0 1 auto;
	list-style-type: none;
	margin: 0;
}

::v-deep .v-breadcrumbs__item {
	color: var(--v-anchor-base) !important;
}

::v-deep .v-breadcrumbs__item--disabled {
	color: rgba(0, 0, 0, 38%) !important;
}

.v-breadcrumbs-divider {
	color: rgba(0, 0, 0, 38%) !important;
}

/* Por defecto, alineado con el fixed-card que tiene margin-left: 64px */
.tool-brief-wrapper {
	position: fixed;
	top: 64px;
	left: 0; /* ocupa todo el ancho */
	width: 100%;
	z-index: 100;
}

@media (min-width: 1450px) {
	.tool-brief-wrapper {
		left: calc(50% - 704px); /* mismo que .fixed-card en wide */
		width: calc(100% - (50% - 704px));
	}
}

/* Medium-wide (e.g. 14" laptops ~1512px): not enough room to center the 960px
   card AND hug the FAIR panel to its right edge (that needs 1600px). Instead,
   stop centering: keep the nav in the left gutter, pin the FAIR panel to the
   right gutter, and let the content reflow between them so the scores stay
   visible. Placed after the 1450/1600 rules so it overrides them in this band. */
@media (min-width: 1400px) and (max-width: 1599.98px) {
	#main-container {
		padding-left: 300px; /* clear the fixed left nav (64 + 200 + gap) */
		padding-right: 320px; /* reserve the right gutter for the FAIR panel */
	}

	.fixed-card {
		left: auto;
		margin-left: 64px !important;
	}

	.tool-brief-wrapper {
		left: 0;
		width: 100%;
	}

	.fair-fixed {
		display: flex;
		left: auto;
		right: 24px;
		width: 280px;
	}
}

.is-loading {
	cursor: wait;
}
</style>
