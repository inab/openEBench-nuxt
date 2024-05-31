<template>
	<div id="plot_22"></div>
</template>
<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	name: 'CompletenessPlot',
	data() {
		return {
			layout: {
				grid: {
					rows: 2,
					columns: 1,
					roworder: 'bottom to top',
				},
				yaxis: {
					title: 'Number of <br> instances',
				},
				xaxis: {
					title: 'Number of features',
				},
				yaxis2: {
					title: 'Number of <br> instances',
				},
				showlegend: false,
				autosize: true,
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
	computed: {
		...mapGetters('observatory/data', {
			completeness: 'Completeness',
		}),
	},

	mounted() {
		const traceLine = {
			y: this.completeness.cummulative_features.count_cumm,
			x: this.completeness.cummulative_features.feat_cumm,
			type: 'scatter',
			mode: 'lines',
			marker: {
				color: '#446fbd',
			},
			yaxis: 'y2',
			hovertemplate:
				'%{y:,d} instances have <br> %{x} features or less<extra></extra>',
		};

		const traceBar = {
			y: this.completeness.distribution_features.x,
			x: this.completeness.distribution_features.y,
			type: 'bar',
			marker: {
				color: '#ad3d32',
			},
			hovertemplate: '%{y:,d} instances have <br> %{x} features<extra></extra>',
		};

		const data = [traceBar, traceLine];

		Plotly.newPlot(
			'plot_22',
			/* JSON object */ {
				data,
				layout: this.layout,
				config: this.config,
			}
		);
	},
};
</script>
<style scoped>
#plot {
	padding: 0%;
	margin: 0%;
}

#plot .modebar {
	display: none !important;
}
</style>
