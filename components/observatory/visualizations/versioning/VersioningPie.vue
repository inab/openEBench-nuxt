<template>
	<CommonTemplate :isLoading="isLoading">
		<VersioningPlot
			v-if="!isLoading"
			:labels="labels"
			:values="values"
			:height="plotHeight"
		/>
	</CommonTemplate>
</template>

<script>
import VersioningPlot from '~/components/observatory/trends/versioning/VersioningPlot.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'VersioningPie',
	components: {
		CommonTemplate,
		VersioningPlot,
	},
	mixins: [plotMixin],
	data() {
		return {
			labels: [],
			values: [],
			isLoading: true,
			collection: this.$route.params.collection,
			plotTitle: this.$route.query.title,
		};
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/semantic_versioning?collection=${collection}`;
			this.isLoading = true;
			this.error = null;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;

				this.labels = data.labels;
				this.values = data.values;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching licenses data:', error);
				this.error = 'Unable to fetch data. Please try again later.';
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

.loading-text {
	text-align: center;
	font-size: 1.2em;
	margin-top: 20px;
}

.error-text {
	text-align: center;
	color: red;
	font-size: 1.2em;
	margin-top: 20px;
}
</style>
