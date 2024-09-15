<template>
	<CommonTemplate :is-loading="isLoading">
		<BubbleChart
			v-if="!isLoading"
			div-id="visualization"
			:collection="collection"
			:collection-scores="collection_scores"
			:indicators-labels="labels"
			:control-scores="control_scores"
			:collection-colors="colors"
			:collection-colors-lines="colors_lines"
			:height="plotHeight"
			:title="plotTitle"
		/>
	</CommonTemplate>
</template>
<script>
import CommonTemplate from '~/components/observatory/visualizations/commonTemplate.vue';
import plotMixin from '~/mixins/embeddedPlotsMixin.js';
import FAIRMixin from '~/mixins/FAIRnessMixin.js';
import BubbleChart from '~/components/observatory/fairness/BubbleChart.vue';

export default {
	name: 'FindabilityBubble',
	components: {
		CommonTemplate,
		BubbleChart,
	},
	mixins: [plotMixin, FAIRMixin],
	data() {
		return {
			labels: {
				F3: 'F3.<br> Searchability',
				F2: 'F2.<br> Existence <br> of Metadata',
				F1: 'F1.<br> Identity <br> uniqueness',
			},
		};
	},
	created() {
		this.fetchData('F');
	},
};
</script>
