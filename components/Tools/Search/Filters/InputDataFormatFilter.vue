<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Input data</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="inputFormat" />
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';
import { EDAMDict } from '~/static/dictionaries/EDAM.js';

export default {
	name: 'InputDataFormatFilter',
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
			for (const key in this.stats.input) {
				newItems.push({
					value: this.keyToLabel(key),
					label: this.keyToLabel(key),
					count: this.stats.input[key],
					percent: this.percentage(this.stats.input[key]),
				});
			}
			// Sort by count. Highest count first
			newItems.sort((a, b) => b.count - a.count);
			return newItems;
		},
	},
	mounted() {
		this.$emit('has-active-filters', this.items.length > 0);
	},
	watch: {
		'stats.input': {
			deep: true,
			handler() {
				const hasItems = this.items.length > 0;
				this.$emit('has-active-filters', hasItems);
			},
		},
	},
	methods: {
		percentage(count) {
			return count / this.totalTools;
		},
		keyToLabel(key) {
			// Some keys are EDAM URIs, so we need to convert them to labels
			// Some keys are free text, and are returned as they are
			try {
				const parsedUrl = new URL(key);
				const isEdamUrl =
					parsedUrl.protocol === 'http:' &&
					parsedUrl.hostname === 'edamontology.org' &&
					parsedUrl.pathname.startsWith('/');

				if (isEdamUrl) {
					return EDAMDict(key);
				}
			} catch (e) {
				// Non-URL free text key; fall through and return as-is
			}
			return key;
		},
	},
};
</script>
