<template>
	<div id="citation-plot"></div>
</template>
<script>
import Plotly from 'plotly.js-dist';

export default {
	name: 'CitationPlot',
	data() {
		return {
			trace1: {
				x: [
					2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
					2020, 2021, 2022,
				],
				y: [3, 5, 6, 3, 7, 8, 12, 13, 15, 25, 24, 22, 20, 16, 5, 11, 9],
				type: 'scatter',
				name: 'Paper A',
			},
			trace2: {
				x: [
					2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
					2020, 2021, 2022,
				],
				y: [3, 3, 4, 2, 3, 4, 5, 7, 10, 8, 7, 7, 6, 3, 2, 2, 1],
				type: 'scatter',
				name: 'Paper B',
			},
			layout: {
				height: 350,
				autosize: true,
				margin: {
					autoexpand: true,
					t: 25,
					l: 50,
				},
				legend: { orientation: 'h' },
			},
		};
	},
	mounted() {
		Plotly.newPlot('citation-plot', [this.trace1, this.trace2], this.layout);
	},
};
</script>
