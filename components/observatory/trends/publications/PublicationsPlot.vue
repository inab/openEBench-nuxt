<template>
	<div id="plot_5"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'PublicationsPlot',
	props: {
		tools: {
			type: Object,
			required: true,
		},
		publications: {
			type: Object,
			required: true,
		},
		citations: {
			type: Object,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 500,
		},
	},
	data() {
		return {
			layout: {
				grid: {
					rows: 2,
					columns: 1,
					roworder: 'top to bottom',
				},
				yaxis: {
					title: 'Number of publications',
				},

				yaxis2: {
					title: 'Citations (last 3 years)',
					side: 'left',
					showgrid: false,
					range: [0, this.citations.y[0] * 1.2],
				},
				xaxis: {
					title: 'journal',
				},
				autosize: true,
				margin: {
					autoexpand: true,
					t: 10,
					b: 90,
				},
				hoverlabel: {
					bgcolor: '#FFF',
				},
				height: this.height,
				title: {
					text: this.title,
					font: {
						size: 16,
					},
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},

	mounted() {
		const tracePublications = {
			x: this.publications.x,
			y: this.publications.y,
			type: 'scatter',
			mode: 'lines+markers',
			name: 'Publications',
			marker: {
				color: '#0e3487',
				size: 6,
			},
			line: {
				color: '#0e3487',
				width: 1,
				dash: 'dash',
			},
			hovertemplate: '%{y} publications<extra></extra>',
			xaxis: 'x',
			yaxis: 'y',
			showlegend: false,
		};

		const traceCitations = {
			x: this.citations.x,
			y: this.citations.y,
			name: 'Citation',
			marker: {
				color: '#ff213f',
				size: 6,
			},
			line: {
				color: '#ff213f',
				width: 1,
			},
			hovertemplate: '%{y} citations in the last 3 years <extra></extra>',
			xaxis: 'x',
			yaxis: 'y2',
			showlegend: false,
		};

		const data = [tracePublications, traceCitations];
		Plotly.newPlot('plot_5', {
			data,
			layout: this.layout,
			config: this.config,
		});
	},
};
</script>
