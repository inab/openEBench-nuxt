<template>
	<div id="plot_5"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'PublicationsPlot',
	props: {
		xValues: {
			type: Array,
			required: true,
		},
		yPercentageValues: {
			type: Array,
			required: true,
		},
		yIFValues: {
			type: Array,
			required: true,
		},
		textPercentageTools: {
			type: Array,
			required: true,
		},
		textPercentageJournals: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 275,
		},
	},
	data() {
		return {
			layout: {
				grid: {
					rows: 2,
					columns: 1,
					roworder: 'top to bottom',
				},
				yaxis: {
					title: 'Percentage',
					tickformat: '.2%',
				},
				xaxis: {
					title: '',
				},
				yaxis2: {
					title: 'Impact Factor (five years)',
				},
				autosize: true,
				margin: {
					autoexpand: true,
					t: 10,
				},
				hoverlabel: {
					bgcolor: '#FFF',
				},
				height: this.height,
				title: {
					text: this.title,
					font: {
						size: 16,
					},
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},

	mounted() {
		const tracePercentage = {
			x: this.xValues,
			y: this.yPercentageValues,
			type: 'scatter',
			mode: 'lines+markers',
			name: 'Percentage of publications',
			marker: {
				color: '#15264a',
				size: 6,
			},
			line: {
				color: '#15264a',
				width: 1,
			},
			hovertemplate:
				'%{text} publications about tools out of %{customdata} total publications <extra></extra>',
			text: this.textPercentageTools,
			customdata: this.textPercentageJournals,
			textposition: [
				'center right',
				'bottom left',
				'bottom left',
				'bottom center',
				'top center',
				'bottom center',
				'top center',
				'bottom center',
				'top center',
				'top center',
			],
			xaxis: 'x',
			yaxis: 'y1',
			showlegend: false,
		};

		const traceIFTools = {
			x: this.xValues,
			y: this.yIFValues,
			name: 'Tools publications',
			marker: {
				color: '#eb9b34',
				size: 6,
			},
			line: {
				color: '#eb9b34',
				width: 1,
			},
			hovertemplate:
				'Tool publications in %{x} <br> Impact factor: %{y:.2f} <extra></extra>',
			xaxis: 'x',
			yaxis: 'y2',
			showlegend: false,
		};

		const data = [tracePercentage, traceIFTools];
		Plotly.newPlot('plot_5', {
			data,
			layout: this.layout,
			config: this.config,
		});
	},
};
</script>
