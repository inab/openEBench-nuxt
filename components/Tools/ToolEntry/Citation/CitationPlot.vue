<template>
	<citationsPlot
		v-if="dataTraces.length > 0"
		:dataTraces="dataTraces"
		:colors="colors"
		:showlegend="false"
	/>
</template>

<script>
import { citationsPlot } from '@inb/oeb_visualizations';

export default {
	name: 'CitationPlot',
	components: { citationsPlot },
	props: {
		dataTraces: {
			type: Array,
			required: true,
		},
		colors: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
};
</script>
