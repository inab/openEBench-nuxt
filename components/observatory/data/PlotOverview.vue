<template>
	<div id="plot"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	name: 'PlotOverview',
	data() {
		return {
			labels: [],
			features_names: [
				'name',
				'description',
				'version',
				'type',
				'links',
				'publication',
				'download',
				'inst_instr',
				'test',
				'src',
				'os',
				'input',
				'output',
				'dependencies',
				'documentation',
				'license',
				'authors',
				'repository',
				'citations',
				'bioschemas',
				'ssl',
				'operational',
			],
			feat_labels: {
				name: 'Name',
				description: 'Description',
				version: 'Version',
				type: 'Type',
				links: 'Links',
				publication: 'Publication',
				download: 'Download',
				inst_instr: 'Installation instructions',
				test: 'Test',
				src: 'Source code',
				os: 'Operating system',
				input: 'Input format',
				output: 'Output format',
				dependencies: 'Dependencies',
				documentation: 'Documentation',
				license: 'License',
				authors: 'Authors',
				repository: 'Repository',
				citations: 'Historical number of citations',
				bioschemas: 'Bioschemas',
				ssl: 'SSL',
				operational: 'Historical homepage accessibility',
			},
			fps: {
				sources: [
					'Bioconda',
					'Bioconductor',
					'bio.tools',
					'Galaxy Toolshed',
					'Galaxy Europe',
					'SourceForge',
					'Bitbucket',
					'Github',
					'OpenEBench',
				],
				data: {
					Name: [1, 1, 1, 1, 1, 1, 1, 1, 0],
					Description: [2, 2, 2, 2, 2, 2, 2, 2, 0],
					Version: [3, 3, 3, 3, 3, 3, 3, 3, 0],
					Type: [4, 4, 4, 4, 4, 0, 0, 0, 0],
					Links: [5, 5, 5, 5, 5, 5, 5, 5, 0],
					Publication: [6, 6, 6, 6, 6, 0, 0, 0, 0],
					Download: [7, 7, 7, 7, 0, 7, 7, 7, 0],
					'Installation instructions': [8, 8, 8, 8, 0, 8, 8, 8, 0],
					Test: [0, 0, 0, 9, 0, 0, 0, 0, 0],
					'Source code': [10, 10, 10, 10, 0, 10, 10, 10, 0],
					'Operating system': [0, 11, 11, 11, 11, 11, 0, 0, 0],
					'Input format': [0, 0, 12, 12, 0, 0, 0, 0, 0],
					'Output format': [0, 0, 13, 13, 0, 0, 0, 0, 0],
					Dependencies: [0, 14, 0, 14, 0, 0, 0, 0, 0],
					Documentation: [0, 15, 15, 15, 0, 0, 15, 15, 0],
					License: [16, 16, 16, 16, 16, 0, 16, 16, 0],
					Authors: [0, 17, 17, 17, 0, 0, 17, 17, 0],
					Repository: [18, 18, 18, 18, 18, 18, 18, 18, 0],
					'Historical number of citations': [0, 0, 0, 0, 0, 0, 0, 0, 19],
					Bioschemas: [0, 0, 0, 0, 0, 0, 0, 0, 20],
					SSL: [0, 0, 0, 0, 0, 0, 0, 0, 21],
					'Historical homepage accessibility': [0, 0, 0, 0, 0, 0, 0, 0, 22],
				},
			},
			colors: [
				'#7DC370',
				'#7DC370',
				'#7DC370',
				'#7DC370',
				'#7DC370',
				'#7DC370',
				'#ff6641',
				'#ff6641',
				'#5a81a6',
			],
			colors_l: [
				'#4D9243',
				'#4D9243',
				'#4D9243',
				'#4D9243',
				'#4D9243',
				'#4D9243',
				'#B7482D',
				'#B7482D',
				'#0A589F',
			],
		};
	},
	computed: {
		...mapGetters('observatory/data', {
			features: 'Features',
		}),
	},
	mounted() {
		const scatterData = {
			source: this.fps.sources,
			values: this.features_names.map(this.map_feat_names),
		};

		const data = this.build_scatter_traces(scatterData);

		const barsData = this.bar_plot_data_restruct(this.features);
		const barsPlot = {
			x: barsData.map(function (item) {
				return item[0];
			}),
			y: barsData.map(function (item) {
				return item[1];
			}),
			xaxis: 'x1',
			yaxis: 'y1',
			type: 'bar',
			marker: {
				color: '#0A3364',
				opacity: 0.8,
			},
			hovertemplate: '%{x} <extra></extra>',
		};

		data.push(barsPlot);

		const config = {
			responsive: true,
			displayModeBar: false,
		};
		const layout = {
			grid: {
				rows: 2,
				columns: 1,
				roworder: 'bottom to top',
			},
			xaxis: {
				title: 'Feature',
				tickangle: -45,
				automargin: true,
			},
			yaxis: {
				title: 'Number of instances',
				automargin: true,
			},
			yaxis2: {
				automargin: true,
			},
			xaxis2: {
				showticklabels: false,
				range: [0.5, 22.5],
				automargin: true,
			},
			autosize: true,
			margin: {
				autoexpand: true,
				t: 0,
				r: 20,
				l: 0,
			},
			height: 550,
			showlegend: false,
			font_size: 12,
			font_color: 'black',
			font_family: 'Balto, sans-serif',
			bargap: 0.1,
			bargroupgap: 0.0,
			hovermode: 'y unified',
			hoverdistance: 1,
		};

		Plotly.newPlot(
			'plot',
			/* JSON object */ {
				data,
				layout,
				config,
			}
		);
	},
	methods: {
		map_feat_names(lab) {
			return this.fps.data[this.feat_labels[lab]];
		},
		build_scatter_traces(scatterData) {
			const scatterPlot = [];
			for (let index = 0; index < scatterData.values.length; ++index) {
				const arr = scatterData.values[index];
				const newX = [];
				const newY = [];
				const newColL = [];
				const newCol = [];
				const labels = [];
				for (let i = 0; i < arr.length; ++i) {
					if (arr[i] !== 0) {
						newX.push(arr[i]);
						newY.push(scatterData.source[i]);
						newCol.push(this.colors[i]);
						newColL.push(this.colors_l[i]);
						labels.push(this.feat_labels[this.features_names[index]]);
					}
				}
				const trace = {
					x: newX,
					y: newY,
					xaxis: 'x2',
					yaxis: 'y2',
					type: 'scatter',
					mode: 'markers',
					marker: {
						size: 8,
						color: newCol,
						line: { width: 2, color: newColL },
					},
					hovertemplate: '%{text} <extra></extra>',
					text: labels,
				};
				scatterPlot.push(trace);
			}

			return scatterPlot;
		},
		bar_plot_data_restruct(features) {
			const newValues = [];
			for (const [key, value] of Object.entries(features)) {
				newValues.push([key, value]);
			}
			return newValues;
		},
		fill_scatter_labels(values, index) {
			const labels = values.map((x) =>
				x !== 0 ? this.feat_labels[this.features_names[index]] : 0
			);
			return labels;
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
