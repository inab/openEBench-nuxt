<template>
	<accessibilityPlot :data-items="data" width="900" />
</template>
<script>
import { accessibilityPlot } from '@inb/oeb_visualizations';
import { mapGetters } from 'vuex';

export default {
	name: 'UptimePlotMonth',
	components: {
		accessibilityPlot,
	},
	computed: {
		...mapGetters('tool_entry', {
			data: 'uptimeMonth',
		}),
	},
};
</script>
