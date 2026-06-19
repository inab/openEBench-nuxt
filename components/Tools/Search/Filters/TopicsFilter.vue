<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Topics</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilterExpand :items="items" property="topics" />
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapState } from 'vuex';
import CheckboxFilterExpand from './CheckboxFilterExpand.vue';
import { EDAMDict } from '~/static/dictionaries/EDAM.js';

export default {
	name: 'TopicsFilter',
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
			for (const key in this.stats.topics) {
				newItems.push({
					value: key,
					label:
						EDAMDict(key) ||
						key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
					count: this.stats.topics[key],
					percent: this.percentage(this.stats.topics[key]),
				});
			}
			newItems.sort((a, b) => b.count - a.count);
			return newItems;
		},
	},
	watch: {
		'stats.topics': {
			deep: true,
			handler() {
				const hasItems = this.items.length > 0;
				this.$emit('has-active-filters', hasItems);
			},
		},
	},
	mounted() {
		this.$emit('has-active-filters', this.items.length > 0);
	},
	methods: {
		percentage(count) {
			return count / this.totalTools;
		},
	},
};
</script>
