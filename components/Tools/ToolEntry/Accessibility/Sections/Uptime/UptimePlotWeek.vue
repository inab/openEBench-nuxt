<template>
	<div>
		<accessibilityPlot :data-items="data" week :xrange="range()" width="900" />
	</div>
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
			data: 'uptimeWeek',
		}),
	},
	methods: {
		range() {
			// minus 2/3 a day
			let min = this.data[0].date - 57600000;
			// plus 2/3 a day
			let max = this.data[this.data.length - 1].date + 57600000;

			return [min, max];
		},
	},
};
</script>
