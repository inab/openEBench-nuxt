<template>
	<div id="plot_4"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	name: 'VersionControlPlot',
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
				height: 275,
				hoverlabel: { bgcolor: '#FFF' },
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	computed: {
		...mapGetters('observatory', {
			data_vc: 'trends/VersionControlRepositories',
		}),
	},
	mounted() {
		const trace = this.build_trace(this.data_vc, this.labels);
		Plotly.newPlot('plot_4', {
			data: [trace],
			layout: this.layout,
			config: this.config,
		});
	},
	methods: {
		build_trace(data, labs) {
			const x = [];
			const y = [];
			for (const [key, value] of Object.entries(data)) {
				x.push(value);
				y.push(key);
			}
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
