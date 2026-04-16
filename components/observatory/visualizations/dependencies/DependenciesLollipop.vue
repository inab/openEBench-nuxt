<template>
	<CommonTemplate :is-loading="isLoading">
		<DependenciesPlot :data="dependenciesPlotData" />
	</CommonTemplate>
</template>

<script>
import DependenciesPlot from '~/components/observatory/trends/dependencies/DependenciesPlot.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'DependenciesLollipop',
	components: {
		CommonTemplate,
		DependenciesPlot,
	},
	mixins: [plotMixin],
	data() {
		return {
			dependenciesPlotData: {},
			isLoading: true,
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/dependencies_count?collection=${collection}`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;
				this.dependenciesPlotData = data;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching licenses data:', error);
				this.isLoading = false;
			}
		},
	},
};
</script>
