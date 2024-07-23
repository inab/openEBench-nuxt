<template>
	<CommonTemplate :is-loading="isLoading">
		<VersionControlPlot
			v-if="!isLoading"
			:x-values="xValues"
			:y-values="yValues"
			:height="plotHeight"
		/>
	</CommonTemplate>
</template>

<script>
import VersionControlPlot from '~/components/observatory/trends/versionControl/VersionControlPlot.vue';
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';

export default {
	name: 'VersionControlBars',
	components: {
		CommonTemplate,
		VersionControlPlot,
	},
	mixins: [plotMixin],
	data() {
		return {
			xValues: [],
			yValues: [],
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
			const URL = `/stats/tools/version_control_repositories?collection=${collection}`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URL);
				const data = response.data.data;

				this.xValues = Object.values(data);
				this.yValues = Object.keys(data);
				this.isLoading = false;
			} catch (error) {
				console.error('Error fetching version control data:', error);
				this.isLoading = false;
			}
		},
	},
};
</script>
