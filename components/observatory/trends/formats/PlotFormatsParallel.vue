<template>
	<div id="plot_7"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { inputData } from './parallelInputFormats.js';
import { outputData } from './parallelOutputFormats.js';
import { sameDifferentData } from './parallelSameDifferentFormats.js';

export default {
	name: 'PlotFormatsParallel',
	data() {
		return {
			inputData,
			outputData,
			sameDifferentData,
			layout: {
				title: '',
				autosize: true,
				height: 600,
				margin: {
					autoexpand: true,
					t: 20,
					l: 160,
					r: 10,
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	mounted() {
		const inputDim = {
			label: 'Input formats',
			values: inputData.values.slice(0, 500),
		};
		const outputDim = {
			label: 'Output formats',
			values: outputData.values.slice(0, 500),
		};
		const sameDifferentDim = {
			label: 'Input and output formats',
			values: sameDifferentData.values.slice(0, 500),
			categoryarray: [0, 1],
			ticktext: ['same', 'different'],
		};
		const color = sameDifferentDim.values;
		const colorscale = [
			[0, '#ECA447'],
			[1, '#748BBC'],
		];

		const trace1 = {
			type: 'parcats',
			dimensions: [inputDim, outputDim, sameDifferentDim],
			line: {
				color,
				hoveron: 'color',
				colorscale,
				hoverinfo: 'count+probability',
				labelfont: { size: 14 },
				arrangement: 'freeform',
				cmin: 0,
				cmax: 1,
				shape: 'hspline',
			},
		};

		Plotly.newPlot('plot_7', [trace1], this.layout, this.config);
	},
};
</script>
