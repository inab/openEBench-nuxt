<template>
	<CommonTemplate :is-loading="isLoading">
		<PublicationsPlot
			v-if="!isLoading"
			:x-values="xValues"
			:y-percentage-values="yPercentageValues"
			:y-i-f-values="yIFValues"
			:text-percentage-tools="textPercentageTools"
			:text-percentage-journals="textPercentageJournals"
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
			xValues: [],
			yPercentageValues: [],
			yIFValues: [],
			textPercentageTools: [],
			textPercentageJournals: [],
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

				this.xValues = data.IF_tools.x;
				this.yPercentageValues = data.percentages.y;
				this.yIFValues = data.IF_tools.y;
				this.textPercentageTools = data.percentages.text_tools;
				this.textPercentageJournals = data.percentages.text_journals;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching publications scatters data:', error);
				this.isLoading = false;
			}
		},
	},
};
</script>
