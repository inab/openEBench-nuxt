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
				'webpage',
				'publication',
				'download',
				'source_code',
				'operating_system',
				'input',
				'output',
				'dependencies',
				'test',
				'documentation',
				'license',
				'authors',
				'repository',
				'topics',
			],
			feat_labels: {
				name: 'Name',
				description: 'Description',
				version: 'Version',
				type: 'Type',
				webpage: 'Webpage',
				publication: 'Publication',
				download: 'Download',
				source_code: 'Source code',
				operating_system: 'Operating system',
				input: 'Input format',
				output: 'Output format',
				dependencies: 'Dependencies',
				test: 'Testing',
				documentation: 'Documentation',
				license: 'License',
				authors: 'Authors',
				repository: 'Repository',
				topics: 'Topics',
			},
			fps: {
				sources: [
					'Bioconda',
					'Bioconductor',
					'bio.tools',
					'Galaxy Toolshed',
					'Galaxy Europe',
					'SourceForge',
					'GitHub',
				],
			},
			colors: [
				'#fab370',
				'#fab370',
				'#fab370',
				'#fab370',
				'#fab370',
				'#fab370',
				'#fab370',
			],
			colors_l: [
				'#ed8828',
				'#ed8828',
				'#ed8828',
				'#ed8828',
				'#ed8828',
				'#ed8828',
				'#ed8828',
			],
		};
	},
	computed: {
		...mapGetters('observatory/data', {
			features: 'Features',
			sources: 'FeaturesLabels',
			featuresControl: 'FeaturesControl',
		}),
		...mapGetters('observatory', {
			currentCollection: 'getCurrentCollection',
		}),
	},
	mounted() {
		const scatterData = {
			source: this.fps.sources,
			values: this.features_names.map(this.map_feat_names),
			xaxis: 'x2',
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
				color: '#77A7D4',
				opacity: 1,
			},
			hovertemplate:
				'"%{x}" information available <br> for %{y} software<extra></extra>',
			name:
				this.currentCollection === 'tools'
					? 'All tools'
					: this.currentCollection,
			showlegend: this.currentCollection !== 'tools',
		};

		data.push(barsPlot);

		const barsDataControl = this.bar_plot_data_restruct(this.featuresControl);
		const barsPlotControl = {
			x: barsDataControl.map(function (item) {
				return item[0];
			}),
			y: barsDataControl.map(function (item) {
				return item[1];
			}),
			xaxis: 'x1',
			yaxis: 'y1',
			type: 'bar',
			marker: {
				color: '#E4E4E4',
				opacity: 1,
			},
			hovertemplate:
				'"%{x}" information available <br> for %{y} software<extra></extra>',
			name: 'All tools',
			showlegend: true,
		};

		if (this.currentCollection !== 'tools') {
			data.push(barsPlotControl);
		}

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
				title: 'Software',
				automargin: true,
				tickformat: ',.0%',
			},
			yaxis2: {
				automargin: true,
			},
			xaxis2: {
				showticklabels: false,
				automargin: true,
				match: 'x',
			},
			autosize: true,
			margin: {
				autoexpand: true,
				t: 0,
				r: 20,
				l: 0,
			},
			height: 550,
			showlegend: true,
			legend: {
				x: 0.1,
				y: -0.4,
				xanchor: 'center',
				yanchor: 'bottom',
				orientation: 'h',
			},
			font_size: 12,
			font_color: 'black',
			font_family: 'Balto, sans-serif',
			bargap: 0.1,
			bargroupgap: 0.0,
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
		map_feat_names(featureKey) {
			return this.sources.map((src) => src.features[featureKey] || 0);
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
						newX.push(this.feat_labels[this.features_names[index]]);
						newY.push(scatterData.source[i]);
						newCol.push(this.colors[i]);
						newColL.push(this.colors_l[i]);
						labels.push(this.feat_labels[this.features_names[index]]);
					}
				}
				const trace = {
					x: newX,
					y: newY,
					name: this.getTraceName(index),
					xaxis: 'x',
					yaxis: 'y2',
					type: 'scatter',
					mode: 'markers',
					marker: {
						size: 8,
						color: newCol,
						line: { width: 2, color: newColL },
					},
					hovertemplate: '%{text}  <extra></extra>',
					text: labels,
					showlegend: false,
				};
				scatterPlot.push(trace);
			}

			return scatterPlot;
		},
		getTraceName(index) {
			if (index === 17) return 'All tools';
			return null;
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
