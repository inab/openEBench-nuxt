<template>
	<v-container fluid class="pt-0 pl-0 pr-0">
		<SearchBar class="mt-0 pt-0" />
		<v-container>
			<v-row justify="space-around">
				<v-col v-if="!loading" cols="2">
					<ToolBrief
						v-show="!introVisible"
						:name="tool.label[0]"
						:type="tool.type"
						:version="tool.version"
						:sources-labels="tool.sources_labels"
						:webpage="tool.webpage"
						class="mt-0"
					/>

					<v-card
						id="fixed-card"
						:style="top()"
						class="mt-8"
						max-width="500"
						elevation="0"
						outlined
					>
						<v-list class="pt-0 pb-0">
							<v-list-item-group
								v-model="selected"
								active-class="primary--text"
							>
								<v-list-item v-for="(item, i) in items" :key="i">
									<v-list-item-content
										:active="selected"
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
				<v-col v-if="!loading" class="mt-5" cols="8">
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
						elevation="0"
						outlined
						class="mt-5 mb-5 pb-5 pl-5 content-cards"
					>
						<v-card-title
							ref="Items"
							class="text-h5 card-titles"
							v-text="item.title"
						></v-card-title>
					</v-card>
				</v-col>
				<v-col v-else cols="8">
					<v-skeleton-loader
						v-bind="attrs"
						type="article, list-item-three-line, image"
					>
					</v-skeleton-loader>
				</v-col>
				<v-col v-if="!loading" cols="2" class="mt-0 pt-1"> </v-col>
			</v-row>
		</v-container>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import EntryIntro from '~/components/Tools/ToolEntry/EntryIntro.vue';
import SearchBar from '~/components/Tools/ToolEntry/SearchBar.vue';
import ToolBrief from '~/components/Tools/ToolEntry/ToolBrief.vue';

export default {
	name: 'ToolEntry',
	components: {
		EntryIntro,
		SearchBar,
		ToolBrief,
	},
	layout: 'ToolEntry',
	data() {
		return {
			items: [
				{
					title: 'Documentation',
					id: 'documentation',
				},
				{
					title: 'Licensing',
					id: 'licensing',
				},
				{
					title: 'Publication',
					id: 'publication',
				},
				{
					title: 'Accessibility',
					id: 'accessibility',
				},
				{
					title: 'Recognition',
					id: 'recognition',
				},
				{
					title: 'Similar Software',
					id: 'similar',
				},
			],
			selected: 0,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: 'https://openebench.bsc.es/',
				},
				{
					text: 'Observatory',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Tool',
					disabled: false,
					exact: true,
					to: '/Tool',
				},
			],
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
		handleScroll() {
			this.visible = true;

			for (let i = 0; i < this.items.length; i++) {
				const ref = this.$refs.Items[i];
				this.visibleItems[i] = this.elementIsVisibleInViewport(ref);
			}
			// first visibleItem is activeItem
			for (let i = 0; i < this.items.length; i++) {
				if (this.visibleItems[i]) {
					this.selected = i;
					break;
				}
			}
			ref = this.$refs.Intro.$refs.Intro;
			this.introVisible = this.elementIsVisibleInViewport(ref);
			this.overviewtop = this.introVisible ? 120 : 215;
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
	top: 120px;
}

.card-titles {
	font-weight: 400;
	font-size: 1.2rem !important;
}

.content-cards {
	height: 200px;
}
</style>
