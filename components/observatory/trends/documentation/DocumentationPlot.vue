<template>
	<div ref="plotContainer" class="w-full"></div>
</template>

<script>
// @ts-ignore
import Plotly from 'plotly.js-dist';

export default {
	name: 'DocumentationPlot',

	props: {
		// Expected: Record<string, { web?, downloadable?, github?, gitlab?, total? }>
		data: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	},

	data() {
		return {
			colorMap: {
				web: '226f54',
				downloadable: '87c38f',
				github: 'f4f0bb',
				gitlab: 'd3d3d3',
				total: '2c423f',
			},
			formats: ['web', 'downloadable', 'github', 'gitlab', 'total'],
		};
	},

	mounted() {
		this.drawPlot();
	},

	watch: {
		data: {
			handler() {
				this.drawPlot();
			},
			deep: true,
		},
	},

	beforeDestroy() {
		const el = this.$refs.plotContainer;
		if (el) Plotly.purge(el);
	},

	methods: {
		drawPlot() {
			if (!this.data || Object.keys(this.data).length === 0) {
				// keep same behavior as v3
				// eslint-disable-next-line no-console
				console.warn('No data to plot.');
				return;
			}

			const el = this.$refs.plotContainer;
			if (!el) {
				// eslint-disable-next-line no-console
				console.warn('Plot container is not mounted.');
				return;
			}

			// Sort entries by total (ascending), like your v3 code currently does
			const sortedEntries = Object.entries(this.data).sort(
				([, a], [, b]) => (a?.total ?? 0) - (b?.total ?? 0)
			);

			const docTypes = sortedEntries.map(([key]) => key);
			const sortedData = sortedEntries.map(([, value]) => value || {});

			const traces = this.formats.map((fmt) => ({
				y: docTypes,
				x: sortedData.map((d) => (d && d[fmt] != null ? d[fmt] : 0)),
				name: fmt,
				type: 'bar',
				orientation: 'h',
				marker: { color: this.colorMap[fmt] },
				hovertemplate:
					'<b>%{y}</b><br>Format: ' + fmt + '<br>Count: %{x}<extra></extra>',
			}));

			const layout = {
				title: '',
				barmode: 'group',
				yaxis: {
					title: { text: 'Documentation Type', standoff: 10 },
					automargin: true,
					ticksuffix: '  ',
				},
				xaxis: {
					title: 'Number of Documentation Links',
				},

				// alternating row background shapes (kept as in your v3 code)
				shapes: docTypes
					.map((_, i) => {
						if (i % 2 !== 0) {
							return {
								type: 'rect',
								xref: 'paper',
								yref: 'y',
								x0: 0,
								x1: 1,
								y0: i - 0.5,
								y1: i + 0.5,
								fillcolor: 'ffc971',
								opacity: 0,
								layer: 'below',
								line: { width: 0 },
							};
						}
						return null;
					})
					.filter(Boolean),

				margin: {
					l: 250,
					r: 40,
					t: 60,
					b: 100,
				},

				height: 50 + docTypes.length * 40,
				hoverlabel: { bgcolor: '#FFF' },
			};

			Plotly.newPlot(el, traces, layout, { responsive: true });
		},
	},
};
</script>
