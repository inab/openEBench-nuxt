<template>
	<div ref="plotContainer" class="w-full h-[700px]"></div>
</template>

<script>
// @ts-ignore
import Plotly from 'plotly.js-dist';

export default {
	name: 'FormatsPlot',

	props: {
		data: {
			type: Object,
			required: true,
			default: () => ({}),
		},
		color: {
			type: String,
			default: 'cornflowerblue',
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
		color() {
			this.drawPlot();
		},
	},

	beforeDestroy() {
		const el = this.$refs.plotContainer;
		if (el) Plotly.purge(el);
	},

	methods: {
		createHorizontalBarPlot(container, data) {
			if (!data || Object.keys(data).length === 0) {
				// eslint-disable-next-line no-console
				console.warn('No data to plot.');
				return;
			}

			// Sort descending by count
			const sorted = Object.entries(data).sort(
				([, a], [, b]) => (b || 0) - (a || 0)
			);

			// Take top 15 and reverse for nice top-to-bottom ordering
			const top15 = sorted.slice(0, 15).reverse();

			const labels = top15.map(([label]) => label);
			const counts = top15.map(([, count]) => count);

			const trace = {
				x: counts,
				y: labels,
				type: 'bar',
				orientation: 'h',
				marker: {
					color: this.color,
				},
				width: 0.6,
				hovertemplate: '<b>%{y}</b><br>Count: %{x}<extra></extra>',
			};

			const layout = {
				title: '',
				xaxis: {
					title: 'Count',
				},
				yaxis: {
					automargin: true,
					ticksuffix: '  ',
				},
				margin: {
					l: 100,
					r: 20,
					t: 50,
					b: 0,
				},
				height: 50 + labels.length * 40,
				hoverlabel: { bgcolor: '#FFF' },
			};

			Plotly.newPlot(container, [trace], layout, { responsive: true });
		},

		drawPlot() {
			const el = this.$refs.plotContainer;
			if (!el) return;

			// Purge before re-plotting to prevent overlays / memory growth
			Plotly.purge(el);

			this.createHorizontalBarPlot(el, this.data);
		},
	},
};
</script>
