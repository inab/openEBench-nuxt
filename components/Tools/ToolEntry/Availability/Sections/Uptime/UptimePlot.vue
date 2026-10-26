<template>
	<accessibilityPlot
		:data-items="dataItems"
		:dtick="Number(dtick)"
		:width="width"
		:height="height"
	/>
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
		// `accessibilityPlot` defaults `width` to a fixed 700px, which pins the
		// plot inside its (wider) container. Passing `null` leaves Plotly's
		// layout width unset so its `autosize`/`responsive` config makes the
		// plot fill the full container width instead.
		width: {
			type: Number,
			default: null,
		},
		height: {
			type: Number,
			default: 350,
		},
	},
};
</script>
