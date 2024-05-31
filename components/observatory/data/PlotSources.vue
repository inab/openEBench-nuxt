<template>
	<div id="plot_21"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	name: 'PlotSources',
	props: ['small'],
	data() {
		return {
			nums: ['1', '2', '3', '4', '5'],
			colors_primary: [
				'#1d4421',
				'#3d643f',
				'#5d865e',
				'#80aa80',
				'#a3cfa3',
				'#c9f5c8',
			],
			colors_secondary: ['#b72f1e', '#f88b69', '#f9d3c6', '#3669a3'],
			titles: {
				github: 'GitHub',
				galaxy: 'Galaxy Europe',
				bioconda: 'Bioconda',
				toolshed: 'Galaxy Toolshed',
				biotools: 'bio.tools',
				bioconductor: 'Bioconductor',
				sourceforge: 'SourceForge',
				bitbucket: 'Bitbucket',
				opeb_metrics: 'OpenEBench',
			},
			layout_base: {
				barmode: 'stack',
				xaxis: {
					title: 'Number of sources',
				},
				yaxis: {
					title: 'Number of instances',
				},
				autosize: true,
				height: 300,
				margin: {
					autoexpand: true,
					t: 0,
					b: 40,
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	computed: {
		layout() {
			const l = this.layout_base;
			if (this.small) {
				l.legend = { orientation: 'h', y: 5, x: -0.2, size: 15 };
				return l;
			} else {
				l.legend = {};
				return l;
			}
		},
		...mapGetters('observatory/data', {
			coverage_sources: 'CoverageSources',
		}),
	},
	mounted() {
		const colors = {
			github: this.colors_secondary[0],
			galaxy: this.colors_primary[1],
			bioconda: this.colors_primary[3],
			toolshed: this.colors_primary[2],
			biotools: this.colors_primary[0],
			bioconductor: this.colors_primary[4],
			sourceforge: this.colors_primary[5],
			bitbucket: this.colors_secondary[1],
			opeb_metrics: this.colors_secondary[3],
		};

		const data = this.build_bar_traces(colors);

		const lineData = {
			x: this.nums,
			y: this.nums.map(this.build_line_trace),
			marker: {
				color: '#FFD700',
			},
			name: 'Instances',
			hovertemplate: '%{x} sources or less: %{y:,d} instances <extra></extra>',
			type: 'line',
		};

		data.push(lineData);

		Plotly.newPlot(
			'plot_21',
			/* JSON object */ {
				data,
				layout: this.layout,
				config: this.config,
			}
		);
	},
	methods: {
		build_bar_traces(colors) {
			const traces = [];
			for (const [key] of Object.entries(this.coverage_sources.counts)) {
				const trace = {
					x: this.nums,
					y: this.coverage_sources.counts[key],
					name: this.titles[key],
					marker: {
						color: colors[key],
					},
					type: 'bar',
					meta: this.titles[key],
					hovertemplate:
						'Of instances found in %{x} sources: <br>' +
						'%{y:,d} are found in %{meta} <extra></extra>',
				};
				traces.push(trace);
			}
			return traces;
		},
		build_line_trace(n) {
			return this.coverage_sources.counts_cummulative[n];
		},
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
<style scoped>
.js-plotly-plot .plotly .main-svg .infolayer .legend {
	width: 100% !important;
}
</style>
