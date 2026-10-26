<template>
	<CommonTemplate :is-loading="isLoading">
		<PublicationsPlot
			v-if="!isLoading"
			:tools="data_plot.tools"
			:publications="data_plot.publications"
			:citations="data_plot.citations"
			:height="plotHeight"
		/>
	</CommonTemplate>
</template>
<script>
import PublicationsPlot from '~/components/observatory/trends/publications/PublicationsPlot.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'PublicationsScatters',
	components: {
		CommonTemplate,
		PublicationsPlot,
	},
	mixins: [plotMixin],
	data() {
		return {
			data_plot: {
				tools: { x: [], y: [] },
				publications: { x: [], y: [] },
				citations: { x: [], y: [] },
			},
			isLoading: true,
			collection: this.$route.params.collection,
		};
	},

	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/publications_journals_IF?collection=${collection}`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;
				this.data_plot = data;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching publications scatters data:', error);
				this.isLoading = false;
			}
		},
	},
};
</script>
