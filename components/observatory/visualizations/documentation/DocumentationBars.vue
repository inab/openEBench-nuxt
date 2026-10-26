<template>
	<CommonTemplate :is-loading="isLoading">
		<DocumentationPlot :data="documentationPlotData" />
	</CommonTemplate>
</template>

<script>
import DocumentationPlot from '~/components/observatory/trends/documentation/DocumentationPlot.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'DocumentationBars',
	components: {
		CommonTemplate,
		DocumentationPlot,
	},
	mixins: [plotMixin],
	data() {
		return {
			documentationPlotData: {},
			isLoading: true,
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/documentation?collection=${collection}`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;
				this.documentationPlotData = data;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching licenses data:', error);
				this.isLoading = false;
			}
		},
	},
};
</script>
