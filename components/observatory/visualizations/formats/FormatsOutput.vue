<template>
	<CommonTemplate :is-loading="isLoading">
		<formatsPlot :data="formatsPlotData" :color="color" />
	</CommonTemplate>
</template>

<script>
import FormatsPlot from '~/components/observatory/trends/formats/FormatsPlot.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'FormatsOutput',
	components: {
		CommonTemplate,
		FormatsPlot,
	},
	mixins: [plotMixin],
	data() {
		return {
			formatsPlotData: {},
			isLoading: true,
			color: '#6FAD6F',
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/output_formats?collection=${collection}`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;
				this.formatsPlotData = data;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching licenses data:', error);
				this.isLoading = false;
			}
		},
	},
};
</script>
