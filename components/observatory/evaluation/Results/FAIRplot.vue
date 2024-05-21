<template>
	<div :id="label"></div>
</template>
<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	name: 'FAIRplot',
	props: {
		label: {
			type: String,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		toolName: {
			type: String,
			required: true,
		},
		colorFill: {
			type: String,
			required: true,
		},
		indicatorsLabels: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			layout: {
				height: this.height,
				polar: {
					radialaxis: {
						visible: true,
						range: [0, 1],
					},
				},
				showlegend: true,
				legend: {
					orientation: 'h',
					yanchor: 'top',
					xanchor: 'left',
					x: 0.0,
					y: 1.4,
				},
				margin: {
					t: 4,
					b: 6,
					r: 1,
					l: 1,
				},
			},
		};
	},
	computed: {
		...mapGetters('observatory/evaluation/results', {
			data_tool: 'getFAIRIndicatorsTool',
			data_control: 'getFAIRIndicatorsControl',
		}),
	},

	mounted() {
		Plotly.newPlot(this.label, this.buildTraces(), this.layout);
	},
	methods: {
		buildTraces() {
			const traces = [];
			const data = [this.data_control.data, this.data_tool[0]];
			const names = ['Average of all tools', this.toolName];
			const colors = ['#b8b8b8', this.colorFill];
			for (let i = 0; i < data.length; i++) {
				const theta = this.indicatorsLabels;
				const r = [];
				for (let j = 0; j < theta.length; j++) {
					r.push(data[i][theta[j]]);
				}
				const trace = {
					type: 'scatterpolar',
					r,
					theta,
					fill: 'toself',
					name: names[i],
					line: {
						color: colors[i],
					},
				};
				traces.push(trace);
			}
			return traces;
		},
	},
};
</script>
