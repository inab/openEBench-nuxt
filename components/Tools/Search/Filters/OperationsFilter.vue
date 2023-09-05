<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Operations</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="operations" />
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';
import { EDAMDict } from '~/static/dictionaries/EDAM.js';

export default {
	name: 'OperationsFilter',
	components: {
		CheckboxFilterExpand,
	},
	computed: {
		...mapState({
			totalTools: (state) => state.tool.totalTools,
			stats: (state) => state.tool.stats,
		}),
		items() {
			const newItems = [];
			for (const key in this.stats.operations) {
				newItems.push({
					value: key,
					label: EDAMDict(key),
					count: this.stats.operations[key],
					percent: this.percentage(this.stats.operations[key]),
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
