<template>
	<accessibilityPlot :data-items="data" sixMonths width="900" />
</template>
<script>
import { accessibilityPlot } from '@inb/oeb_visualizations';
import { mapGetters } from 'vuex';

export default {
	name: 'UptimePlot6Month',
	components: {
		accessibilityPlot,
	},
	computed: {
		...mapGetters('tool_entry', {
			data: 'uptime6Month',
		}),
	},
};
</script>
