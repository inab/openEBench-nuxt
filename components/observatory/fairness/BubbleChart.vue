<template>
	<div>
		<div :id="divId"></div>
	</div>
</template>
<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'BubbleChart',
	props: {
		divId: {
			type: String,
			required: true,
		},
		collection: {
			type: String,
			required: true,
		},
		collectionScores: {
			type: Array,
			required: true,
		},
		indicatorsLabels: {
			type: Object,
			required: true,
		},
		controlScores: {
			type: Array,
			required: true,
		},
		collectionColors: {
			type: Array,
			required: true,
		},
		collectionColorsLines: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 350,
		},
	},
	data() {
		return {
			config: {
				responsive: true,
				displayModeBar: false,
			},
			controlColors: this.buildControlColors(),
			controlColorsLines: this.buildControlColors(),
		};
	},
	mounted() {
		const traces = this.build_control_colllection_traces();
		const layout = {
			yaxis: {
				title: 'Indicator',
				showline: false,
			},
			xaxis: {
				title: 'Score',
				zeroline: false,
				showline: true,
			},
			showlegend: true,
			height: this.height,
			hovermode: 'closest',
			hoverlabel: { bgcolor: '#FFF' },
			autosize: true,
			margin: {
				autoexpand: true,
				t: 20,
				l: 150,
			},
			title: this.title,
		};

		Plotly.newPlot(this.divId, {
			data: traces,
			layout,
		});
	},
	methods: {
		buildControlColors() {
			return Array(this.indicatorsLabels.length).fill('#bfbfbf');
		},
		build_control_colllection_traces() {
			let controlCollectiontraces = [];

			// control scores
			if (this.collection !== 'tools') {
				const traceControl = this.build_trace(
					this.controlScores,
					this.indicatorsLabels,
					'All tools',
					Array(this.controlScores.length).fill('#bfbfbf'),
					Array(this.controlScores.length).fill('#bfbfbf'),
					'markers'
				);
				controlCollectiontraces = controlCollectiontraces.concat(traceControl);
			}

			// collection scores
			const collectionTitle =
				this.collection === 'tools' ? 'All tools' : this.collection;

			const traceCollection = this.build_trace(
				this.collectionScores,
				this.indicatorsLabels,
				collectionTitle,
				this.collectionColors,
				this.collectionColorsLines,
				'markers+text'
			);
			controlCollectiontraces = controlCollectiontraces.concat(traceCollection);

			return controlCollectiontraces;
		},

		build_trace(scores, labels, collectionTitle, colors, colorsLines, mode) {
			console.log(scores);
			console.log(this.controlScores);
			const traces = [];
			let item;
			for (let i = 0, len = scores.length; i < len; i++) {
				item = scores[i];
				const trace = {
					y: Array(item.scores.length).fill(labels[item.indicator]),
					x: item.scores,
					name: collectionTitle + ' - ' + item.indicator,
					customdata: item.count,
					text: item.percent,
					textposition: 'inside',
					texttemplate: '%{text:,.1%}',
					hovertemplate:
						'Score: %{x:.2f}<br>Tools: %{customdata:,}<br>Percentage: %{text:,.1%}',
					mode, // 'markers+text' shows text inside
					textfont: {
						size: 14,
					},
					marker: {
						size: item.percent,
						sizeref: 0.0003, // scaling factor
						sizemode: 'area',
						color: Array(item.scores.length).fill(colors[i]),
						line: {
							width: 1.5,
							color: Array(item.scores.length).fill(colorsLines[i]),
						},
					},
				};
				traces.push(trace);
			}
			return traces;
		},
	},
};
</script>
