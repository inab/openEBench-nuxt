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
					title: 'Percentage of <br> software',
					tickformat: ',.0%',
				},
				xaxis: {
					tickformat: '%{x}',

					ticksuffix: ' features or less',
					tickmode: 'array',
					showticksuffix: false,
					showticklabels: false,
				},
				xaxis2: {
					title: 'Number of features',
					tickformat: '%{x} ',
					ticksuffix: ' features',
					tickmode: 'array',
					showticksuffix: false,
				},
				yaxis2: {
					title: 'Percentage of <br> software',
					tickformat: ',.0%',
				},
				showlegend: true,
				legend: {
					x: 0.8,
					y: 1.2,
					xanchor: 'center',
					yanchor: 'top',
					orientation: 'h',
				},
				autosize: true,
				margin: {
					autoexpand: true,
					t: 0,
				},
				hovermode: 'x unified',
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
			completenessControl: 'CompletenessControl',
		}),
		...mapGetters('observatory', {
			currentCollection: 'getCurrentCollection',
		}),
	},

	mounted() {
		const traceLine = {
			y: this.completeness.cummulative_features.count_cumm_pct,
			x: this.completeness.cummulative_features.feat_num,
			type: 'scatter',
			mode: 'lines',
			marker: {
				color: '#3978ed',
			},
			yaxis: 'y2',
			xaxis: 'x',
			legendgroup: this.currentCollection,
			name: this.currentCollection,
			hovertemplate: '%{y} of software<extra></extra>',
		};
		const traceLineControl = {
			y: this.completenessControl.cummulative_features.count_cumm_pct,
			x: this.completenessControl.cummulative_features.feat_num,
			type: 'scatter',
			mode: 'lines',
			marker: {
				color: 'lightgrey',
			},
			yaxis: 'y2',
			xaxis: 'x',
			name: 'All tools',
			legendgroup: 'All tools',
			hovertemplate: '%{y} of software<extra></extra>',
		};

		const traceBar = {
			y: this.completeness.distribution_features.x,
			x: this.completeness.distribution_features.y,
			type: 'bar',
			xaxis: 'x2',
			name: this.currentCollection,
			legendgroup: this.currentCollection,
			marker: {
				color: '#ff8957',
			},
			hovertemplate: '%{y} of software <extra></extra>',
		};

		const traceBarControl = {
			y: this.completenessControl.distribution_features.x,
			x: this.completenessControl.distribution_features.y,
			type: 'bar',
			xaxis: 'x2',
			legendgroup: 'All tools',
			marker: {
				color: 'lightgrey',
			},
			name: 'All tools',
			hovertemplate: '%{y} of software have <br> %{x} features<extra></extra>',
		};

		let data;
		if (this.currentCollection === 'tools') {
			data = [traceBar, traceLine];
		} else {
			data = [traceBar, traceLine, traceBarControl, traceLineControl];
		}

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
