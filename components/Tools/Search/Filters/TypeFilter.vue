<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Type of Tool</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="type" />
		</v-expansion-panel-content>
		<v-divider></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';

export default {
	name: 'TypeFilter',
	components: {
		CheckboxFilterExpand,
	},
	data() {
		return {
			newItems: [],
			labels: {
				cmd: 'Command Line Tool',
				app: 'Desktop Application',
				web: 'Web Application',
				lib: 'Library',
				rest: 'REST API',
				workflow: 'Workflow',
				sparql: 'SPARQL Endpoint',
				unknown: 'Unknown',
			},
		};
	},
	// All compute is common to all filters... so we should have a mixin
	computed: {
		...mapState({
			totalTools: (state) => state.tool.totalTools,
			stats: (state) => state.tool.stats,
		}),
		items() {
			const newItems = [];
			for (const key in this.stats.type) {
				newItems.push({
					value: key,
					label: this.labels[key],
					count: this.stats.type[key],
					percent: this.percentage(this.stats.type[key]),
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
