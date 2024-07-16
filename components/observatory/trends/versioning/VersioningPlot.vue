<template>
	<div id="plot_3"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'VersioningPlot',
	props: {
		labels: {
			type: Array,
			required: true,
		},
		values: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 220,
		},
	},
	data() {
		return {
			layout: {
				showlegend: true,
				hoverlabel: { bgcolor: '#FFF' },
				height: this.height,
				autosize: true,
				margin: {
					t: 20,
					l: 0,
					r: 0,
					b: 20,
				},
				title: {
					text: this.title,
					x: 0.5,
					xanchor: 'center',
					yanchor: 'top',
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},

	mounted() {
		const trace = {
			labels: this.labels,
			values: this.values,
			type: 'pie',
			hole: 0.4,
			direction: 'clockwise',
			sort: false,
			marker: {
				colors: ['#15264a', '#4f71b8', '#bdc6d9'],
			},
			hovertemplate:
				'<b>%{label}</b><br>%{value:,d} instances<br>%{percent:.0%} of all instances<extra></extra>',
		};

		Plotly.newPlot(
			'plot_3',
			/* JSON object */ {
				data: [trace],
				layout: this.layout,
				config: this.config,
			}
		);
	},
};
</script>
