<template>
	<div ref="plotContainer" class="w-full h-[700px]"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'DependencyLollipopPlot',

	props: {
		// In your v3 component you typed it as an array, but you actually treat it as an object:
		// Object.entries(props.data) => { "r-base": 3992, ... }
		//
		// So for v2, accept BOTH:
		// - Object map: { [name]: count }
		// - Array: [{ name, count }]
		data: {
			type: [Object, Array],
			required: true,
			default: () => ({}),
		},
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
		// Clean up plotly instance
		const el = this.$refs.plotContainer;
		if (el) Plotly.purge(el);
	},

	methods: {
		normalizeData() {
			// Returns: { names: string[], counts: number[] }
			if (Array.isArray(this.data)) {
				const names = this.data.map((d) => d.name);
				const counts = this.data.map((d) => d.count);
				return { names, counts };
			}

			// object map
			const names = Object.keys(this.data || {});
			const counts = Object.values(this.data || {});
			return { names, counts };
		},

		drawPlot() {
			const el = this.$refs.plotContainer;
			if (!el) return;

			const { names, counts } = this.normalizeData();

			const sticks = names.map((name, i) => ({
				type: 'scatter',
				x: [0, counts[i]],
				y: [name, name],
				mode: 'lines',
				line: {
					color: '#ABC8F5',
					width: 2,
				},
				hoverinfo: 'none',
				showlegend: false,
			}));

			const dots = {
				type: 'scatter',
				x: counts,
				y: names,
				mode: 'markers+text',
				marker: {
					color: '#6696DE',
					size: 16,
					line: { color: 'white', width: 2 },
				},
				text: counts.map(String),
				textposition: 'right',
				hovertemplate: '<b>%{y}</b><br>Used by: %{x} projects<extra></extra>',
				name: 'Dependencies',
				showlegend: false,
			};

			const layout = {
				title: '',
				xaxis: {
					title: 'Number of Dependent Projects',
					zeroline: false,
				},
				yaxis: {
					autorange: 'reversed',
					automargin: true,
					ticksuffix: '  ',
				},
				showlegend: false,
				margin: {
					l: 200,
					r: 50,
					t: 20,
					b: 60,
				},
				height: 700,
				hoverlabel: { bgcolor: '#FFF' },
			};

			Plotly.newPlot(el, [...sticks, dots], layout, { responsive: true });
		},
	},
};
</script>
