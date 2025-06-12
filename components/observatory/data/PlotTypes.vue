<template>
	<div id="plot_23"></div>
</template>
<script>
import { mapGetters } from 'vuex';
import Plotly from 'plotly.js-dist';

export default {
	name: 'PlotTypes',
	data() {
		return {
			layout: {
				yaxis: {
					title: '',
					categoryorder: 'total ascending',
				},
				xaxis: {
					title: 'Percentage of software',
					tickformat: ',.0%',
				},
				margin: {
					autoexpand: true,
					t: 0,
					l: 130,
				},
				legend: {
					x: 0.8,
					y: 1.1,
					xanchor: 'center',
					yanchor: 'top',
					orientation: 'h',
				},
				hovermode: 'y unified',
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	computed: {
		...mapGetters('observatory/data', {
			types_data: 'Types',
			types_data_control: 'TypesControl',
		}),
		...mapGetters('observatory', {
			currentCollection: 'getCurrentCollection',
		}),
	},
	mounted() {
		const data = this.build_data(this.types_data);
		const dataControl = this.build_data(this.types_data_control);
		const trace = {
			x: data.values,
			y: data.types,
			type: 'bar',
			orientation: 'h',
			marker: {
				color: '#6fc765',
			},
			hovertemplate: '%{x} of software <extra></extra>',
			name: this.currentCollection,
		};

		const traceControl = {
			x: dataControl.values,
			y: dataControl.types,
			type: 'bar',
			orientation: 'h',
			marker: {
				color: 'lightgrey',
			},
			hovertemplate: '%{x} of software <extra></extra>',
			name: 'All tools',
		};

		const traces = [];
		if (this.currentCollection !== 'tools') {
			traces.push(traceControl);
		}
		traces.push(trace);

		Plotly.newPlot(
			'plot_23',
			/* JSON object */ {
				data: traces,
				layout: this.layout,
				config: this.config,
			}
		);
	},
	methods: {
		build_data(typesData) {
			const typeLabels = {
				cmd: 'Command-line tool',
				web: 'Web application',
				lib: 'Library',
				app: 'Application',
				db: 'Database',
				undefined: 'Undefined',
				soap: 'SOAP service',
				rest: 'REST API',
				plugin: 'Plugin',
				suite: 'Software suite',
				script: 'Script',
				workbench: 'Workbench',
				workflow: 'Workflow',
				sparql: 'SPARQL endpoint',
				ontology: 'Ontology',
			};

			const newValues = {
				values: [],
				types: [],
			};

			for (const [key, value] of Object.entries(typesData)) {
				const label = typeLabels[key] || key; // fallback to key if no mapping exists
				newValues.types.push(label + '  ');
				newValues.values.push(value);
			}

			return newValues;
		},
	},
};
</script>
<style scoped>
#plot {
	padding: 0%;
	margin: 0%;
}

.v-card {
	padding: 4em;
	clear: left;
}

#plot .modebar {
	display: none !important;
}
</style>
