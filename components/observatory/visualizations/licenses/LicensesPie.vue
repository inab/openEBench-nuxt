<template>
	<CommonTemplate :isLoading="isLoading">
		<PlotLicensesPie
			v-if="!isLoading"
			:labels="labels"
			:parents="parents"
			:values="values"
			:text="text"
			:height="plotHeight"
		/>
	</CommonTemplate>
</template>

<script>
import PlotLicensesPie from '~/components/observatory/trends/licenses/PlotLicensesPie.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'LicensesPiePage',
	components: {
		CommonTemplate,
		PlotLicensesPie,
	},
	mixins: [plotMixin],
	data() {
		return {
			labels: [],
			parents: [],
			values: [],
			text: [],
			isLoading: true,
			collection: this.$route.params.collection,
		};
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/licenses_summary_sunburst?collection=${collection}`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;

				this.labels = data.ids;
				this.parents = data.parents;
				this.values = data.v;
				this.text = data.text;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching licenses data:', error);
				this.isLoading = false;
			}
		},
	},
	created() {
		this.fetchData();
	},
};
</script>

<style scoped>
.text-center {
	text-align: center;
}
</style>
