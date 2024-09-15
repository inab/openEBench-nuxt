<template>
	<div id="plot_4"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'VersionControlPlot',
	props: {
		xValues: {
			type: Array,
			required: true,
		},
		yValues: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 275,
		},
	},
	data() {
		return {
			labels: {
				gitlab:
					'<a href="https://gitlab.com/gitlab-org/gitlab", taget="blank_">GitLab    </a>',
				bitbucket:
					'<a href="https://bitbucket.org/", taget="blank_">Bitbucket    </a>',
				sourceforge:
					'<a href="https://sourceforge.net/", taget="blank_">SourceForge    </a>',
				github:
					'<a href="https://github.com/gitlab", taget="blank_">GitHub    </a>',
			},
			layout: {
				showlegend: false,
				yaxis: {
					automargin: true,
				},
				xaxis: {
					title: 'Number of instances',
				},
				margin: {
					autoexpand: true,
					t: 10,
					b: 50,
				},
				autosize: true,
				height: this.height,
				title: {
					text: this.title,
					font: {
						size: 16,
					},
				},
				hoverlabel: { bgcolor: '#FFF' },
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},

	mounted() {
		const trace = this.build_trace(this.xValues, this.yValues, this.labels);
		Plotly.newPlot('plot_4', {
			data: [trace],
			layout: this.layout,
			config: this.config,
		});
	},
	methods: {
		build_trace(x, y, labs) {
			const trace = {
				type: 'bar',
				y: y.map(function (a) {
					return labs[a];
				}),
				x,
				orientation: 'h',
				marker: {
					color: '#4f71b8',
				},
				hoverinfo: 'x',
				hovertemplate: '%{x:,d} instances <extra></extra>',
			};
			return trace;
		},
	},
};
</script>
