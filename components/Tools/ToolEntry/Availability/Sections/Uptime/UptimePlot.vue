<template>
	<accessibilityPlot :data-items="dataItems" :dtick="Number(dtick)" />
</template>
<script>
import { accessibilityPlot } from '@inb/oeb_visualizations';

export default {
	name: 'UptimePlot',
	components: {
		accessibilityPlot,
	},
	props: {
		dataItems: {
			type: Array,
			default: () => [],
		},
		dtick: {
			type: [String, Number],
			default: '86400000',
		},
	},
};
</script>
