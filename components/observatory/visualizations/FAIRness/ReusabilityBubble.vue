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
	name: 'ReusabilityBubble',
	components: {
		CommonTemplate,
		BubbleChart,
	},
	mixins: [plotMixin, FAIRMixin],
	data() {
		return {
			labels: {
				R1: 'R1.<br> Existence of <br> documentation',
				R2: 'R2.<br> Existence of <br> License',
				R3: 'R3.<br> Contributors <br> recognition',
				R4: 'R4.<br> Provenance <br> availability',
			},
		};
	},
	created() {
		this.fetchData('R');
	},
};
</script>
