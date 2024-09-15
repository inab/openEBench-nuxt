<template>
	<div id="plot_1" :style="{ height: height + 'px', width: '100%' }"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	props: {
		labels: {
			type: Array,
			required: true,
		},
		parents: {
			type: Array,
			required: true,
		},
		values: {
			type: Array,
			required: true,
		},
		text: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 300,
		},
	},
	data() {
		return {
			layout: {
				yaxis: {
					title: '',
				},
				xaxis: {
					title: '',
				},
				height: this.height,
				autosize: true,
				margin: {
					t: 40,
					b: 0,
					l: 0,
					r: 0,
				},
				title: {
					text: this.title,
					x: 0.5,
					xanchor: 'center',
					yanchor: 'top',
				},
				hoverlabel: { bgcolor: '#FFF' },
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	watch: {
		height(newHeight) {
			this.layout.height = newHeight;
			this.plotChart();
		},
	},
	mounted() {
		this.plotChart();
	},
	methods: {
		plotChart() {
			const trace = {
				type: 'sunburst',
				labels: this.labels,
				parents: this.parents,
				values: this.values,
				branchvalues: 'total',
				textinfo: 'label',
				rotation: '152',
				marker: {
					autocolorscale: false,
					colors: [
						'#ffffff',
						'#e0e0e0',
						'#273e6e',
						'#f5971b',
						'#faebbe',
						'#3a5ba1',
					],
				},
				text: this.text,
				hovertemplate:
					'<b>%{label}</b><br>' +
					'%{value:,d} instances<br>' +
					'%{percentParent:.1%} of %{text}<extra></extra>',
			};
			Plotly.newPlot('plot_1', [trace], this.layout, this.config);
		},
	},
};
</script>

<style scoped>
#plot1 {
	width: 100%;
}
</style>
