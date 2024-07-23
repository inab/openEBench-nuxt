<template>
	<div id="plot_6"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { inputData } from './inputFormats.js';
import { outputData } from './outputFormats.js';

export default {
	name: 'PlotFormats',
	data() {
		return {
			inputData,
			outputData,
			layout: {
				title: '',
				grid: {
					rows: 1,
					columns: 2,
					roworder: 'left to right',
				},
				xaxis: {
					title: 'Number of instances',
					tickfont: {
						size: 14,
					},
				},
				xaxis2: {
					title: 'Number of instances',
					tickfont: {
						size: 14,
					},
				},
				yaxis: {
					titlefont: {
						size: 16,
					},
					tickfont: {
						size: 12,
					},
				},
				hovermode: 'y unified',
				autosize: true,
				height: 650,
				margin: {
					autoexpand: true,
					t: 10,
					l: 200,
				},
				barmode: 'group',
				bargap: 0.15,
				bargroupgap: 0.1,
			},
			config: {
				responsive: true,
				displayModeBar: true,
			},
		};
	},
	mounted() {
		const trace1 = {
			y: inputData.x,
			x: inputData.y,
			name: 'Input',
			marker: { color: '#273e6e' },
			type: 'bar',
			orientation: 'h',
			xaxis: 'x',
		};

		const trace2 = {
			y: outputData.x,
			x: outputData.y,
			name: 'Output',
			marker: { color: '#3a5ba1' },
			type: 'bar',
			orientation: 'h',
			xaxis: 'x2',
		};

		Plotly.newPlot('plot_6', {
			data: [trace1, trace2],
			layout: this.layout,
			config: this.config,
		});
	},
};
</script>
