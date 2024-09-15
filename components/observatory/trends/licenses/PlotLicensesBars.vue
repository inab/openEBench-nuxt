<template>
	<div id="plot_2" :style="{ height: height + 'px', width: '100%' }"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'PlotLicensesBars',
	props: {
		counts_permissive: {
			type: Array,
			required: true,
		},
		licenses_permissive: {
			type: Array,
			required: true,
		},
		counts_copyleft: {
			type: Array,
			required: true,
		},
		licenses_copyleft: {
			type: Array,
			required: true,
		},
		counts_data: {
			type: Array,
			required: true,
		},
		licenses_data: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		height: {
			type: Number,
			default: 300,
		},
	},
	data() {
		return {
			labs: {
				Artistic:
					'<a href="https://opensource.org/licenses/artistic-license">Artistic</a>',
				MIT: '<a href="https://opensource.org/licenses/MIT">MIT</a>',
				Apache:
					'<a href="https://opensource.org/licenses/apachepl.php">Apache</a>',
				BSD: '<a href="https://www.freebsd.org/doc/en_US.ISO8859-1/articles/bsdl-gpl/article.html">BSD</a>',
				GPL: '<a href="https://www.gnu.org/licenses/gpl-3.0.html">GPL</a>',
				AGPL: '<a href="https://www.gnu.org/licenses/agpl-3.0.html">AGPL</a>',
				LGPL: '<a href="https://www.gnu.org/licenses/lgpl-3.0.html">LGPL</a>',
				'CeCILL-C':
					'<a href="https://spdx.org/licenses/CECILL-C.html">CeCILL-C</a>',
				CeCILL:
					'<a href="https://spdx.org/licenses/CECILL-C.html">CeCILL-C</a>',
				CC: '<a href="https://creativecommons.org/licenses/">CC</a>',
			},
			layout: {
				yaxis: {
					title: 'Number of instances',
				},
				xaxis: {
					title: 'License Family/Type',
					categoryorder: 'total ascending',
				},
				hoverlabel: { bgcolor: '#FFF' },
				autosize: true,
				height: this.height,
				margin: {
					b: 70,
					t: 40,
					r: 0,
				},
				title: {
					text: this.title,
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	computed: {
		trace1() {
			const trace1 = this.build_trace(
				this.licenses_copyleft,
				this.counts_copyleft,
				'Copyleft',
				'#eb9b34',
				'#ffffff',
				this.labs
			);
			return trace1;
		},

		trace2() {
			const trace2 = this.build_trace(
				this.licenses_permissive,
				this.counts_permissive,
				'Permissive',
				'#ffd299',
				'#ffffff',
				this.labs
			);
			return trace2;
		},

		trace3() {
			const trace3 = this.build_trace(
				this.licenses_data,
				this.counts_data,
				'Data',
				'#bfbfbf',
				'#ffffff',
				this.labs
			);
			return trace3;
		},
	},

	mounted() {
		const copyleft = this.licenses_copyleft.length;
		const permissive = this.licenses_permissive.length;
		const data = this.licenses_data.length;

		let traces;
		if (copyleft === 0) {
			traces = [this.trace2, this.trace3];
		} else if (permissive === 0) {
			traces = [this.trace1, this.trace3];
		} else if (data === 0) {
			traces = [this.trace1, this.trace2];
		} else {
			traces = [this.trace1, this.trace2, this.trace3];
		}

		Plotly.newPlot('plot_2', {
			data: traces,
			layout: this.layout,
			config: this.config,
		});
	},
	methods: {
		build_trace(x, y, name, color, border, labs) {
			const trace = {
				type: 'bar',
				x: x.map(function (a) {
					return labs[a];
				}),
				y,
				name,
				customdata: y.map((c) => {
					return (c = (c / y.reduce((a, b) => a + b)) * 100);
				}),
				hovertemplate:
					'%{x} <br> %{y:,d} instances <br> %{customdata:.1f}% of OpenSource <extra></extra>',
				marker: {
					color,
					opacity: 0.9,
					line: {
						color: border,
						width: 1,
					},
				},
			};
			return trace;
		},
	},
};
</script>
