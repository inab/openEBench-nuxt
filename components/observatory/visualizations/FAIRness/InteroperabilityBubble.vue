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
	name: 'InteroperabilityBubble',
	components: {
		CommonTemplate,
		BubbleChart,
	},
	mixins: [plotMixin, FAIRMixin],
	data() {
		return {
			labels: {
				I1: 'I1.<br> Documentation on <br>Input/Output datatypes <br>and formats',
				I2: 'I2.<br> Workflow <br> compatibility',
				I3: 'I3.<br> Dependencies <br> availability',
			},
		};
	},
	created() {
		this.fetchData('I');
	},
};
</script>
