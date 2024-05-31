<template>
	<div id="plot_1"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			layout: {
				yaxis: {
					title: '',
				},
				xaxis: {
					title: '',
				},

				height: 350,
				autosize: true,
				margin: {
					t: 40,
					b: 20,
					l: 0,
					r: 0,
				},
				hoverlabel: { bgcolor: '#FFF' },
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	computed: {
		...mapGetters('observatory/trends', {
			data_licenses: 'LicensesSunburst',
		}),
	},
	mounted() {
		const trace = {
			type: 'sunburst',
			labels: this.data_licenses.ids,
			parents: this.data_licenses.parents,
			values: this.data_licenses.v,
			branchvalues: 'total',
			textinfo: 'label',
			rotation: '152',
			marker: {
				autocolorsacel: false,
				colors: [
					'#ffffff',
					'#e0e0e0',
					'#273e6e',
					'#f5971b',
					'#faebbe',
					'#3a5ba1',
				],
			},
			text: this.data_licenses.text,
			hovertemplate:
				'<b>%{label}</b><br>' +
				'%{value:,d} instances<br>' +
				'%{percentParent:.1%} of %{text}<extra></extra>',
		};
		Plotly.newPlot('plot_1', {
			data: [trace],
			layout: this.layout,
			config: this.config,
		});
	},
};
</script>
