<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Sources</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="source" />
		</v-expansion-panel-content>
		<v-divider></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';

export default {
	name: 'SourcesFilter',
	components: {
		CheckboxFilterExpand,
	},
	data() {
		return {
			newItems: [],
			labels: {
				biotools: 'bio.tools',
				bioconda: 'Bioconda',
				bioconductor: 'Bioconductor',
				galaxy: 'GalaxyEU',
				toolshed: 'Toolshed',
				github: 'Github',
				sourceforge: 'Sourceforge',
				bitbucket: 'Bitbucket',
			},
		};
	},
	computed: {
		...mapState({
			totalTools: (state) => state.tool.totalTools,
			stats: (state) => state.tool.stats,
		}),
		items() {
			const newItems = [];
			for (const key in this.stats.source) {
				newItems.push({
					value: key,
					label: this.labels[key],
					count: this.stats.source[key],
					percent: this.percentage(this.stats.source[key]),
				});
			}
			// sort by count
			newItems.sort((a, b) => b.count - a.count);
			return newItems;
		},
	},
	methods: {
		percentage(count) {
			return count / this.totalTools;
		},
	},
};
</script>
