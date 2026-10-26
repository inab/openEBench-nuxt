<template>
	<div>
		<div :id="label"></div>
	</div>
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

			// Check if data_control.data is an empty object
			const data =
				Object.keys(this.data_control.data).length === 0
					? [this.data_tool]
					: [this.data_control.data, this.data_tool];

			const names =
				Object.keys(this.data_control.data).length === 0
					? [this.toolName]
					: ['Average of all tools', this.toolName];

			const colors =
				Object.keys(this.data_control.data).length === 0
					? [this.colorFill]
					: ['#b8b8b8', this.colorFill];

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
