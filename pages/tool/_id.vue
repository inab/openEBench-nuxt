<template>
	<v-container id="main-container" ref="Main" fluid class="pt-2 pl-0 pr-0">
		<v-container class="pt-4">
			<v-row justify="space-around">
				<v-col v-if="!loading" cols="2">
					<ToolBrief
						v-show="!introVisible"
						id="tool-brief"
						:name="tool.label[0]"
						:type="tool.type"
						:version="tool.version"
						:sources-labels="tool.sources_labels"
						:webpage="tool.webpage"
					/>
					<v-card id="fixed-card" :style="top()" max-width="500" elevation="0">
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
				</v-col>
				<!--v-divider vertical></v-divider-->
				<v-col v-if="!loading" cols="8">
					<EntryIntro
						ref="Intro"
						:name="tool.label[0]"
						:description="tool.description[0].term"
						:type="tool.type"
						:version="tool.version"
						:webpage="tool.webpage"
						:repository="tool.repository"
						:license="tool.license"
						:topics="tool.topics"
						:operations="tool.operations"
					/>

					<v-card
						v-for="(item, i) in items"
						:id="item.id"
						:key="i"
						elevation="1"
						class="mt-5 mb-5 pb-5 pl-5 content-cards"
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
			<v-btn
				id="to-top"
				ref="toTop"
				class="mx-2"
				fab
				dark
				small
				color="#f48f43"
				@click="$vuetify.goTo('#main-container')"
			>
				<v-icon dark> mdi-arrow-up </v-icon>
			</v-btn>
		</v-container>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import SearchBar from '~/components/Tools/ToolEntry/SearchBar.vue';
import EntryIntro from '~/components/Tools/ToolEntry/EntryIntro.vue';
import ToolBrief from '~/components/Tools/ToolEntry/ToolBrief.vue';
import CitationContent from '~/components/Tools/ToolEntry/Citation/CitationContent.vue';
import FAIRtreeview from '~/components/Tools/ToolEntry/FAIR/FAIRtreeview.vue';

export default {
	name: 'ToolEntry',
	components: {
		SearchBar,
		EntryIntro,
		ToolBrief,
		CitationContent,
		FAIRtreeview,
	},
	layout: 'DefaultLayoutWOBreadcrumbs',
	data() {
		return {
			items: [
				{
					title: 'Citation',
					id: 'citation',
					component: 'CitationContent',
				},
				{
					title: 'Documentation',
					id: 'documentation',
					component: '',
				},
				{
					title: 'Licensing',
					id: 'licensing',
					component: '',
				},
				{
					title: 'Accessibility',
					id: 'accessibility',
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
			overviewtop: '80 px',
			sectionsIndicatorsMap: [['F3'], ['F2', 'R1', 'R3'], ['R2'], [], [], []],
			sectionsOpen: [['F'], ['F', 'R'], ['R'], [], []],
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
			const ref = this.$refs.Intro.$refs.Intro;
			if (ref !== undefined) {
				this.introVisible = this.elementIsVisibleInViewport(ref);
			}
			this.overviewtop = this.introVisible ? 90 : 240;
		},

		goToTopPosition() {
			const refFooter = this.$root.$children[2].$refs.Footer;
			const topOfFooter = refFooter.$el.offsetTop;
			const bottom = window.scrollY + window.innerHeight;
			const distanceFromFooter = bottom - topOfFooter;

			if (bottom < topOfFooter + 120) {
				this.$refs.toTop.$el.style.bottom = `${120}px`;
			} else {
				this.$refs.toTop.$el.style.bottom = `${distanceFromFooter}px`;
			}
		},
		handleScroll() {
			this.visible = true;
			this.menuSections(); // Menu sections activiation
			this.entryBriefVisibility(); // first visibleItem is activeItem
			this.goToTopPosition(); // GoToTop button position -> stop at footer
		},
		top() {
			return {
				top: this.overviewtop + 'px',
			};
		},
	},
};
</script>
<style scoped>
#fixed-card {
	position: fixed;
	width: 180px;
	top: 90px;
}

#tool-brief {
	position: fixed;
	width: 180px;
	top: 80px;
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
	bottom: 120px;
	right: 100px;
}

#fixed-fair {
	position: fixed;
	top: 85px;
	width: 260px;
	word-wrap: normal;
}
</style>
