<template>
	<div
		:data-id="id"
		class="benchmarkingChart_scatter"
		:data-api-url="apiUrl"
		toTable="true"
		data-mode="openebench"
	/>
</template>

<script>
// eslint-disable-next-line camelcase
import { load_scatter_visualization } from '@inb/oeb-chart-scatter';

export default {
	props: {
		id: {
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
				load_scatter_visualization();
			} catch (error) {}
		},
	},
};
</script>

<style lang="scss">
.benchmarkingTable_scatter {
	background-color: #fff;
	width: 28vw;
}

.benchmarkingSVG {
	width: 69vw !important;
}
</style>
>
