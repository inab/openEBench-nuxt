<template>
	<v-container>
		<!--SearchBar /-->

		<v-row justify="space-around">
			<v-col cols="2">
				<v-card
					id="fixed-card"
					class="mr-5 ml-5 mt-5"
					max-width="500"
					elevation="0"
				>
					<v-list>
						<v-list-item-group v-model="selected" active-class="primary--text">
							<v-list-item v-for="(item, i) in items" :key="i">
								<v-list-item-content
									:active="selected"
									@click="$vuetify.goTo('#' + item)"
								>
									<v-list-item-title class="text-subtitle-2" v-text="item">
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-col>
			<v-col v-if="!loading" class="mt-5 pl-5" cols="8">
				<EntryIntro
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
					:id="item"
					:key="i"
					class="mt-5 mb-5 pb-5 pl-5"
				>
					<v-card-title
						ref="Items"
						class="text-h5 card-titles"
						v-text="item"
					></v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import EntryIntro from '~/components/Tools/ToolEntry/EntryIntro.vue';

export default {
	name: 'ToolEntry',
	components: {
		EntryIntro,
	},
	data() {
		return {
			items: [
				'Documentation',
				'Accessibility',
				'Interoperability',
				'Reproducibility',
				'Recognition',
				'Publication',
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
			activeItem: 0,
		};
	},
	beforeMount() {
		window.addEventListener('scroll', this.handleScroll);

		// Get name and type from URL
		// this.$store.dispatch('tool/setToolName', this.$route.params.name)
		const payload = {
			name: this.$route.params.name,
			type: this.$route.params.type,
		};
		this.$store.dispatch('tool_entry/retrieveTool', payload);
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
		elementIsVisibleInViewport(id, partiallyVisible = true) {
			if (this.visible) {
				const { top, left, bottom, right } =
					this.$refs.Items[id].getBoundingClientRect();
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
				this.visibleItems[i] = this.elementIsVisibleInViewport(i);
			}
			// first visibleItem is activeItem
			for (let i = 0; i < this.items.length; i++) {
				if (this.visibleItems[i]) {
					this.selected = i;
					break;
				}
			}
		},
	},
};
</script>
<style scoped>
#fixed-card {
	position: fixed;
	width: 180px;
}

.card-titles {
	font-weight: 400;
	font-size: 1.2rem !important;
}
</style>
