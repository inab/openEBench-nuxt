<template>
	<div>
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

		<ToolBrief
			v-if="!introVisible && !loading"
			:name="tool.label[0]"
			:type="tool.type"
			:version="tool.version"
			:sources-labels="tool.sources_labels"
			:webpage="tool.webpage"
		/>

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
							<v-list-item-title class="text-subtitle-2" v-text="item.title">
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>

		<div id="main-container" ref="Main" class="pt-6">
			<v-row justify="center">
				<v-col v-if="!loading" cols="7">
					<!-- Card principal -->
					<v-card elevation="1" class="mt-6 mb-6 pa-5 content-cards">
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
				<v-col v-else cols="8">
					<v-skeleton-loader type="article, list-item-three-line, image">
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
		// Sections to render, hiding cards that have no information
		items() {
			return this.sections.filter((section) => {
				if (section.id === 'licensing') {
					return this.hasLicenseInfo;
				}
				if (section.id === 'similar-software') {
					return this.hasSimilarSoftware;
				}
				return true;
			});
		},
		// Breadcrumbs: Home > Tools > Search (clickable) > Tool Name
		breadcrumbs() {
			const searchedTerm = this.$store.getters['tool/searchedTerm'];
			const crumbs = [
				{ text: 'Home', disabled: false, exact: true, to: '/' },
				{ text: 'Tools', disabled: false, exact: true, to: '/tool' },
			];
			if (searchedTerm) {
				crumbs.push({
					text: `Search: ${searchedTerm}`,
					disabled: false,
					exact: true,
					to: `/tool/search?q=${searchedTerm}`,
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
			// Caso normal
			const description = this.tool?.description?.[0]?.term;

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
		window.addEventListener('scroll', this.handleScroll);
	},

	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	methods: {
		...mapActions('tool_entry', ['retrieveSimilarTools']),

		loadTool(toolParam) {
			// Split "name-id" → extract the id (last segment after final dash)
			const lastDash = toolParam.lastIndexOf('-');
			const toolId =
				lastDash !== -1 ? toolParam.slice(lastDash + 1) : toolParam;
			const toolName =
				lastDash !== -1 ? toolParam.slice(0, lastDash) : toolParam;

			this.$store.dispatch('tool_entry/retrieveTool', {
				name: toolName,
				id: toolId,
			});
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
			for (let i = 0; i < this.items.length; i++) {
				const ref = this.$refs.Items[i];
				if (ref !== undefined) {
					this.visibleItems[i] = this.elementIsVisibleInViewport(ref);
				}
			}
			// activeItem is the first visibleItem
			for (let i = 0; i < this.items.length; i++) {
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
	margin-left: 150px !important;
	position: absolute;
	z-index: 50px;
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
}

#to-top {
	position: fixed;
	right: 80px;
}

#fixed-fair {
	position: fixed;
	top: 85px;
	width: 260px;
	word-wrap: normal;
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
</style>
