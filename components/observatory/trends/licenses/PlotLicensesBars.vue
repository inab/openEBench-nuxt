<template>
	<div id="plot_2"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import { mapGetters } from 'vuex';

export default {
	name: 'PlotLicensesBars',
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
				height: 300,
				margin: {
					autoexpand: true,
					b: 70,
					t: 20,
					r: 50,
				},
			},
			config: {
				responsive: true,
				displayModeBar: false,
			},
		};
	},
	computed: {
		...mapGetters('observatory/trends', {
			data_licenses: 'LicensesOpenSource',
		}),

		trace1() {
			const trace1 = this.build_trace(
				'licenses_copyleft',
				'counts_copyleft',
				'Copyleft',
				'#eb9b34',
				'#ffffff',
				this.labs
			);
			return trace1;
		},

		trace2() {
			const trace2 = this.build_trace(
				'licenses_permissive',
				'counts_permissive',
				'Permissive',
				'#ffd299',
				'#ffffff',
				this.labs
			);
			return trace2;
		},

		trace3() {
			const trace3 = this.build_trace(
				'licenses_data',
				'counts_data',
				'Data',
				'#bfbfbf',
				'#ffffff',
				this.labs
			);
			return trace3;
		},
	},

	mounted() {
		const copyleft =
			this.$store.state.observatory.trends._licensesOpenSource.licenses_copyleft
				.length;
		const permissive =
			this.$store.state.observatory.trends._licensesOpenSource
				.licenses_permissive.length;
		const data =
			this.$store.state.observatory.trends._licensesOpenSource.licenses_data
				.length;

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
			const X = this.data_licenses[x];
			const Y = this.data_licenses[y];
			const trace = {
				type: 'bar',
				x: X.map(function (a) {
					return labs[a];
				}),
				y: Y,
				name,
				customdata: Y.map((c) => {
					return (c = (c / Y.reduce((a, b) => a + b)) * 100);
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
