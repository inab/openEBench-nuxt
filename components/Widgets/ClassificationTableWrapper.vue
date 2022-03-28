<template>
	<div
		:id="id"
		class="oeb-table caption"
		:data-benchmarkingevent="id"
		:data-mode="dataMode"
		:data-api-url="apiUrl"
		:data-bench-event-api-url="benchEventApiUrl"
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
	data() {
		return {
			apiUrl: this.$config
				? this.$config.SCIENTIFIC_SERVICE_URL + '/graphql'
				: 'https://dev-openebench.bsc.es/api/scientific/graphql',
			benchEventApiUrl: this.$config
				? this.$config.BENCH_EVENT_API_URL
				: 'https://dev-openebench.bsc.es/rest/bench_event_api',
			dataMode: this.$config ? this.$config.ENVIRONMENT : 'dev-openebench',
		};
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

<style lang="scss">
.oeb-table-scroll {
	margin-top: 15px;
}
</style>
