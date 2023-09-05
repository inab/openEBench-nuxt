<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">License</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="license" />
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';

export default {
	name: 'LicenseFilter',
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
			for (const key in this.stats.license) {
				newItems.push({
					value: key,
					label: key,
					count: this.stats.license[key],
					percent: this.percentage(this.stats.license[key]),
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
