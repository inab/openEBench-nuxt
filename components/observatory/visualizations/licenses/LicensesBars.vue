<template>
	<CommonTemplate :is-loading="isLoading">
		<PlotLicensesBars
			v-if="!isLoading"
			:counts_permissive="counts_permissive"
			:counts_copyleft="counts_copyleft"
			:counts_data="counts_data"
			:licenses_permissive="licenses_permissive"
			:licenses_copyleft="licenses_copyleft"
			:licenses_data="licenses_data"
			:height="plotHeight"
			:title="plotTitle"
		/>
		<div v-else class="loading-text">Loading...</div>
		<div v-if="error" class="error-text">Failed to load data: {{ error }}</div>
	</CommonTemplate>
</template>

<script>
import PlotLicensesBars from '~/components/observatory/trends/licenses/PlotLicensesBars.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'LicensesBarsPage',
	components: {
		CommonTemplate,
		PlotLicensesBars,
	},
	mixins: [plotMixin],
	data() {
		return {
			counts_permissive: [],
			counts_copyleft: [],
			counts_data: [],
			licenses_permissive: [],
			licenses_copyleft: [],
			licenses_data: [],
			isLoading: true,
			error: null,
			collection: this.$route.params.collection,
			plotTitle: this.$route.query.title,
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const collection = this.collection || 'tools';
			const URL = `/stats/tools/licenses_open_source?collection=${collection}`;
			this.isLoading = true;
			this.error = null;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;

				this.counts_permissive = data.counts_permissive;
				this.licenses_permissive = data.licenses_permissive;
				this.counts_copyleft = data.counts_copyleft;
				this.licenses_copyleft = data.licenses_copyleft;
				this.counts_data = data.counts_data;
				this.licenses_data = data.licenses_data;
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching licenses data:', error);
				this.error = 'Unable to fetch data. Please try again later.';
				this.isLoading = false;
			}
		},
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
