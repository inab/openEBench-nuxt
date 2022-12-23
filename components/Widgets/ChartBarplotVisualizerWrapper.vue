<template>
	<div
		:data-id="id"
		class="benchmarkingChart_bars"
		:data-data="JSON.stringify(data)"
		:data-metric-name="metricName"
	/>
</template>

<script>
// eslint-disable-next-line camelcase
import { load_bars_visualization } from '@inb/oeb-chart-barplot';

export default {
	props: {
		id: {
			type: String,
			required: true,
		},
		data: {
			type: Array,
			required: true,
		},
		metricName: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			apiUrl: this.$config
				? this.$config.SCIENTIFIC_SERVICE_URL + '/graphql'
				: 'https://dev-openebench.bsc.es/api/scientific/graphql',
		};
	},
	mounted() {
		this.loadVisualization();
	},
	methods: {
		loadVisualization() {
			try {
				load_bars_visualization();
			} catch (error) {}
		},
	},
};
</script>

<style lang="scss">
.benchmarkingTable_bars {
	background-color: #fff;
	width: 28vw;
}
</style>
