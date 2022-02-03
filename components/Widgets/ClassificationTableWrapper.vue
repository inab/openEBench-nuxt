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
import debounce from 'lodash.debounce';

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
		debounce: {
			type: Number,
			required: false,
			default: 1000,
		},
	},
	watch: {
		filterArray() {
			this.debouncedFilterArrayWatch();
		},
	},
	created() {
		this.debouncedFilterArrayWatch = debounce(() => {
			this.loadTable();
		}, this.debounce);
	},
	beforeDestroy() {
		this.debouncedFilterArrayWatch.cancel();
	},
	mounted() {
		this.loadTable();
	},
	methods: {
		loadTable() {
			try {
				run_summary_table(this.filterArray, this.id);
			} catch (error) {}
		},
	},
};
</script>
