<template>
	<div id="chart-box-plot" :data-id="id"></div>
</template>

<script>
const loadBoxplotVisualization = (data) => {
	if (data.data.length > 0) {
		const yaxis = data.data[0].metric_id;
		const cx = data.data.map((x) => x.name);
		const cq1 = data.data.map((x) => x.q1);
		const cq3 = data.data.map((x) => x.q3);
		const cmn = data.data.map((x) => x.mean);
		const cmd = data.data.map((x) => x.median);
		const lf = data.data.map((x) => x.lowerfence);
		const uf = data.data.map((x) => x.upperfence);
		Plotly.newPlot(
			'chart-box-plot',
			[
				{
					type: 'box',
					x: cx,
					q1: cq1,
					mean: cmn,
					median: cmd,
					q3: cq3,
					lowerfence: lf,
					upperfence: uf,
				},
			],
			{
				margin: { t: 0 },
				yaxis: { title: { text: yaxis } },
			}
		);
	}
};

export default {
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	async mounted() {
		this.loadVisualization(await this.getData());
	},
	methods: {
		async getData() {
			// OEBD0100000013
			return await this.$axios.get(
				'https://openebench.bsc.es/api/scientific/widget/box-plot/' +
					this.id +
					'?log2=true'
			);
		},

		loadVisualization(data) {
			try {
				loadBoxplotVisualization(data);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="scss">
.benchmarkingTable_scatter {
	background-color: #fff;
	width: 28vw;
}

.benchmarkingSVG {
	width: 69vw !important;
}
</style>
>
