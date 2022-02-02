<template>
	<div
		:id="id"
		class="oeb-table caption"
		:data-benchmarkingevent="id"
		data-mode="dev-openebench"
		data-api-url="https://dev-openebench.bsc.es/api/scientific/graphql"
		data-bench-event-api-url="https://dev-openebench.bsc.es/rest/bench_event_api"
	/>
</template>

<script>
// eslint-disable-next-line camelcase
import { run_summary_table } from '@inb/oeb-classification-table';

export default {
	props: {
		id: {
			type: String,
			required: true,
		},
		filterArray: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	watch: {
		filterArray() {
			// look into debounce
			this.$nextTick(() => {
				this.loadTable();
			});
		},
	},
	mounted() {
		this.loadTable();
	},
	methods: {
		loadTable() {
			try {
				run_summary_table(this.filterArray, this.id);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		},
	},
};
</script>
