<template>
	<div id="plot_23"></div>
</template>
<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'PlotTypes',
	data() {
		return {
			data_types: {
				cmd: 17170,
				script: 716,
				lib: 8191,
				db: 1951,
				unknown: 3087,
				web: 6040,
				workflow: 403,
				app: 1779,
				rest: 301,
				plugin: 212,
				soap: 565,
				undefined: 2971,
				ontology: 35,
				suite: 332,
				workbench: 223,
				sparql: 11,
			},
			layout: {
				yaxis: {
					title: '',
					categoryorder: 'total ascending',
				},
				xaxis: {
					title: 'Number of instances',
				},
				showlegend: false,
				margin: {
					autoexpand: true,
					t: 0,
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	mounted() {
		const data = this.build_data();

		const labels = data.types;
		const newLabels = labels.map(function (lab) {
			return lab + '   ';
		});

		const trace = {
			x: data.values,
			y: newLabels,
			type: 'bar',
			orientation: 'h',
			marker: {
				color: '#ebd471',
			},
			hovertemplate: '%{y} <br> %{x:,d} instances <extra></extra>',
		};

		Plotly.newPlot(
			'plot_23',
			/* JSON object */ {
				data: [trace],
				layout: this.layout,
				config: this.config,
			}
		);
	},
	methods: {
		build_data() {
			const newValues = {
				values: [],
				types: [],
			};
			for (const [key, value] of Object.entries(this.data_types)) {
				newValues.types.push(key);
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
