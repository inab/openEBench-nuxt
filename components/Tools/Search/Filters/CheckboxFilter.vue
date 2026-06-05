<template>
	<div>
		<StripeStats
			v-for="(item, i) in items"
			:key="i"
			:label="item.label"
			:count="item.count"
			:percent="item.percent"
			:active="active.includes(i)"
			@update:active="updateActive(i)"
		/>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import StripeStats from './StripeStats.vue';
import { filtersToQuery } from '~/utils/toolFilters';

export default {
	name: 'CheckboxFilter',
	components: {
		StripeStats,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		property: {
			type: String,
			required: true,
		},
	},
	computed: {
		...mapGetters({
			filters: 'tool/filters',
		}),

		active() {
			// index of items whose value is in filters property proterty
			const active = [];
			for (let i = 0; i < this.items.length; i++) {
				if (this.filters[this.property].includes(this.items[i].value)) {
					active.push(i);
				}
			}
			return active;
		},
	},
	methods: {
		updateActive(i) {
			// add or remove index from active array
			if (this.active.includes(i)) {
				this.active.splice(this.active.indexOf(i), 1);
			} else {
				this.active.push(i);
			}
			// values are items from items array whose index is in active array
			const payload = {
				property: this.property,
				values: this.active.map((i) => this.items[i].value),
			};

			// Update state for an immediate, snappy checkbox UI, then push the
			// full filter set into the URL. The search page's $route.query watcher
			// is the single place that re-runs the search, so we don't dispatch
			// searchTools here (that would double-fetch).
			this.$store.dispatch('tool/updateFilters', payload);

			const { q, searchIn } = this.$route.query;
			this.$router
				.replace({
					path: '/tool/search',
					query: {
						q,
						searchIn,
						page: 0,
						...filtersToQuery(this.filters),
					},
				})
				.catch(() => {});
		},
	},
};
</script>
