<template>
	<div>
		<!-- Breadcrumbs inside tool -->
		<div class="pb-0 breadcrumbs" v-if="breadcrumbs.length > 0">
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
							@click="$vuetify.goTo('#' + item.id)"
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
					<EntryIntro
						ref="Intro"
						:name="tool.label[0]"
						:description="tool.description[0].term"
						:type="tool.type"
						:version="tool.version"
						:webpage="tool.webpage"
						:sources-labels="tool.sources_labels"
					/>

					<!-- Cards seciones. -->
					<v-card
						v-for="(item, i) in items"
						:id="item.id"
						:key="i"
						elevation="2"
						class="mt-6 mb-6 pa-5 content-cards"
					>
						<v-card-title
							ref="Items"
							class="text-h5 card-titles"
							v-text="item.title"
						></v-card-title>
						<component :is="item.component"></component>
					</v-card>
				</v-col>
				<v-col v-else cols="8">
					<v-skeleton-loader
						v-bind="attrs"
						type="article, list-item-three-line, image"
					>
					</v-skeleton-loader>
				</v-col>
			</v-row>
			<VueFixedScrollBreak
				v-if="offset"
				id="to-top"
				:top-of-stop-element="offset"
			>
				<v-btn
					class="mx-2"
					fab
					dark
					small
					color="#f48f43"
					@click="$vuetify.goTo('#main-container')"
				>
					<v-icon dark> mdi-arrow-up </v-icon>
				</v-btn>
			</VueFixedScrollBreak>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import VueFixedScrollBreak from 'vue-fixed-scroll-break';
import MainCard from '~/components/Tools/MainCard.vue';
import EntryIntro from '~/components/Tools/ToolEntry/EntryIntro.vue';
import ToolBrief from '~/components/Tools/ToolEntry/ToolBrief.vue';
import CitationContent from '~/components/Tools/ToolEntry/Citation/CitationContent.vue';
import DocumentationContent from '~/components/Tools/ToolEntry/Documentation/DocumentationContent.vue';
import AccessibilityContent from '~/components/Tools/ToolEntry/Accessibility/AccessibilityContent.vue';

export default {
	name: 'ToolEntry',
	components: {
		MainCard,
		EntryIntro,
		ToolBrief,
		CitationContent,
		DocumentationContent,
		AccessibilityContent,
		VueFixedScrollBreak,
	},
	layout: 'DefaultLayoutWOBreadcrumbs',
	data() {
		return {
			items: [
				{
					title: 'Documentation',
					id: 'documentation',
					component: 'DocumentationContent',
				},
				{
					title: 'Accessibility',
					id: 'accessibility',
					component: 'AccessibilityContent',
				},
				{
					title: 'Citation',
					id: 'citation',
					component: 'CitationContent',
				},
				{
					title: 'Licensing',
					id: 'licensing',
					component: '',
				},
				{
					title: 'Recognition',
					id: 'recognition',
					component: '',
				},
				{
					title: 'Similar Software',
					id: 'similar',
					component: '',
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
		}),
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
	},

	beforeMount() {
		// Get name and type from URL
		// this.$store.dispatch('tool/setToolName', this.$route.params.name)
		const payload = {
			name: this.$route.params.id,
		};

		this.$store.dispatch('tool_entry/retrieveTool', payload);
		window.addEventListener('scroll', this.handleScroll);
	},

	unmounted() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	methods: {
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

			this.offset = this.$root.$children[2].$refs.Footer.$el.offsetTop; // GoToTop button position -> stop at footer

			// 500 the height of the fixed menu + tool brief + nav bar
			this.offsetMenu = window.innerHeight - 500; // Menu position -> stop at footer
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
	top: 100px;
	z-index: 50px;
}

#tool-brief {
	position: fixed;
	width: 180px;
}

.content-cards {
	min-height: 300px;
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
