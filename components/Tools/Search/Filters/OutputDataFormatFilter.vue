<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Output data</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="output" />
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';
import { EDAMDict } from '~/static/dictionaries/EDAM.js';

export default {
	name: 'OutputDataFormatFilter',
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
			for (const key in this.stats.output) {
				newItems.push({
					value: key,
					label: this.keyToLabel(key),
					count: this.stats.output[key],
					percent: this.percentage(this.stats.output[key]),
				});
			}
			// Sort by count. Highest count first
			newItems.sort((a, b) => b.count - a.count);
			return newItems;
		},
	},
	methods: {
		percentage(count) {
			return count / this.totalTools;
		},
		keyToLabel(key) {
			// Some keys are EDAM URIs, so we need to convert them to labels
			// Some keys are free text, and are returned as they are
			if (key.includes('http://edamontology.org/')) {
				return EDAMDict(key);
			} else {
				return key;
			}
		},
	},
};
</script>
