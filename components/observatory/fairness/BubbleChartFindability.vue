<template>
	<div>
		<div id="findability"></div>
	</div>
</template>
<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			config: {
				responsive: true,
				displayModeBar: false,
			},
			colors: ['#5da4d6', '#ff900e', '#2ca065'],
			colors_lines: ['#0075c7', '#995302', '#046b37'],
		};
	},
	computed: {
		...mapGetters('observatory', {
			fair_scores: 'fairness/FAIRscores',
			control_fair_scores: 'fairness/ControlFAIRscores',
			current_collection: 'getCurrentCollection',
		}),
	},
	mounted() {
		const traces = this.build_traces();
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
			height: 350,
			hovermode: 'closest',
			hoverlabel: { bgcolor: '#FFF' },
			autosize: true,
			margin: {
				autoexpand: true,
				t: 20,
				l: 150,
			},
		};

		Plotly.newPlot('findability', {
			data: traces,
			layout,
		});
	},
	methods: {
		build_traces() {
			const traces = [];

			let collection;
			if (this.current_collection === 'tools') {
				collection = 'All tools';
			} else {
				collection = this.current_collection;
			}

			let scores;
			let labels;
			let item;
			let trace;

			// control scores
			if (this.current_collection !== 'tools') {
				scores = this.control_fair_scores.F.fair_scores;
				labels = this.control_fair_scores.F.labels;
				for (let i = 0, len = scores.length; i < len; i++) {
					item = scores[i];
					trace = {
						y: Array(item.scores.length).fill(labels[item.indicator]),
						x: item.scores,
						name: 'All tools' + ' - ' + item.indicator,
						customdata: item.count,
						text: item.percent,
						textposition: 'inside',
						texttemplate: '%{text:,.1%}',
						hovertemplate:
							'Score: %{x:.2f}<br>Tools: %{customdata:,}<br>Percentage: %{text:,.1%}',
						mode: 'markers', // 'markers+text' shows text inside
						textfont: {
							size: 14,
						},
						marker: {
							size: item.percent,
							sizeref: 0.0003, // scaling factor
							sizemode: 'area',
							color: Array(item.scores.length).fill('#bfbfbf'),
							line: {
								width: 1.5,
							},
						},
					};
					traces.push(trace);
				}
			}

			// collection scores
			scores = this.fair_scores.F.fair_scores;
			labels = this.fair_scores.F.labels;
			for (let i = 0, len = scores.length; i < len; i++) {
				item = scores[i];
				trace = {
					y: Array(item.scores.length).fill(labels[item.indicator]),
					x: item.scores,
					name: collection + ' - ' + item.indicator,
					customdata: item.count,
					text: item.percent,
					textposition: 'inside',
					texttemplate: '%{text:,.1%}',
					hovertemplate: 'Score: %{x:.2f}<br>Tools: %{customdata:,}',
					mode: 'markers+text', // 'markers+text' shows text inside
					textfont: {
						size: 14,
					},
					marker: {
						size: item.percent,
						sizeref: 0.0003, // scaling factor
						sizemode: 'area',
						color: Array(item.scores.length).fill(this.colors[i]),
						line: {
							width: 1.5,
							color: Array(item.scores.length).fill(this.colors_lines[i]),
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
