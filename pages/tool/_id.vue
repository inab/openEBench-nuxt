<template>
	<v-container id="main-container" ref="Main" fluid class="pt-2 pl-0 pr-0">
		<v-container class="pt-4">
			<v-row justify="space-around">
				<v-col v-if="!loading" cols="2">
					<div v-show="!introVisible">
						<VueFixedScrollBreak
							:total-offset="offsetMenu"
							:top-of-stop-element="offset"
						>
							<ToolBrief
								:name="tool.label[0]"
								:type="tool.type"
								:version="tool.version"
								:sources-labels="tool.sources_labels"
								:webpage="tool.webpage"
							/>
							<v-card class="fixed-card" max-width="500" elevation="0">
								<v-list class="pt-0 pb-0">
									<v-list-item-group
										v-model="activeItem"
										active-class="primary--text"
									>
										<v-list-item v-for="(item, i) in items" :key="i">
											<v-list-item-content
												:active="activeItem === i"
												@click="$vuetify.goTo('#' + item.id)"
											>
												<v-list-item-title
													class="text-subtitle-2"
													v-text="item.title"
												>
												</v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list-item-group>
								</v-list>
							</v-card>
						</VueFixedScrollBreak>
					</div>
					<div v-show="introVisible">
						<v-card
							class="fixed-card fixed-first"
							max-width="500"
							elevation="0"
						>
							<v-list class="pt-0 pb-0">
								<v-list-item-group
									v-model="activeItem"
									active-class="primary--text"
								>
									<v-list-item v-for="(item, i) in items" :key="i">
										<v-list-item-content
											:active="activeItem === i"
											@click="$vuetify.goTo('#' + item.id)"
										>
											<v-list-item-title
												class="text-subtitle-2"
												v-text="item.title"
											>
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
					</div>
				</v-col>
				<v-col v-if="!loading" cols="8">
					<EntryIntro
						ref="Intro"
						:name="tool.label[0]"
						:description="tool.description[0].term"
						:type="tool.type"
						:version="tool.version"
						:webpage="tool.webpage"
						:sources-labels="tool.sources_labels"
					/>

					<v-card
						v-for="(item, i) in items"
						:id="item.id"
						:key="i"
						elevation="2"
						class="mt-8 pt-4 mb-5 pb-6 pl-5 content-cards"
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
				<v-col v-if="!loading" cols="2" class="mt-0 pt-1 pl-5" justify="left">
					<v-row>
						<div id="fixed-fair">
							<FAIRtreeview
								:active="sectionsIndicatorsMap[activeItem]"
								:open="sectionsOpen[activeItem]"
							/>
						</div>
					</v-row>
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
		</v-container>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import VueFixedScrollBreak from 'vue-fixed-scroll-break';
import SearchBar from '~/components/Tools/ToolEntry/SearchBar.vue';
import EntryIntro from '~/components/Tools/ToolEntry/EntryIntro.vue';
import ToolBrief from '~/components/Tools/ToolEntry/ToolBrief.vue';
import CitationContent from '~/components/Tools/ToolEntry/Citation/CitationContent.vue';
import DocumentationContent from '~/components/Tools/ToolEntry/Documentation/DocumentationContent.vue';
import FAIRtreeview from '~/components/Tools/ToolEntry/FAIR/FAIRtreeview.vue';

export default {
	name: 'ToolEntry',
	components: {
		SearchBar,
		EntryIntro,
		ToolBrief,
		CitationContent,
		DocumentationContent,
		FAIRtreeview,
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
					component: '',
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
			sectionsIndicatorsMap: [
				['F2', 'R1', 'R3'],
				['A1', 'A3'],
				['F3'],
				['R2'],
				[],
				[],
				[],
			],
			sectionsOpen: [['F', 'R'], ['A'], ['F'], ['R'], [], []],
		};
	},

	beforeMount() {
		// Get name and type from URL
		// this.$store.dispatch('tool/setToolName', this.$route.params.name)
		const payload = {
			name: this.$route.params.name,
			type: this.$route.params.type,
		};

		this.$store.dispatch('tool_entry/retrieveTool', payload);
		window.addEventListener('scroll', this.handleScroll);
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
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
			if (this.$refs.Intro.$refs.Intro !== undefined) {
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
	width: 180px;
}

.fixed-first {
	position: fixed;
}

#tool-brief {
	position: fixed;
	width: 180px;
}

.card-titles {
	font-weight: 400;
	font-size: 1.2rem !important;
}

.content-cards {
	min-height: 300px;
}

#to-top {
	position: fixed;
	right: 280px;
}

#fixed-fair {
	position: fixed;
	top: 85px;
	width: 260px;
	word-wrap: normal;
}
</style>
