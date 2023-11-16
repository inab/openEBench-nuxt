<template>
	<div
		data-id="test"
		data-xaxis="true"
		data-yaxis="false"
		:data-url="url"
		data-limit="30"
		class="opebuptime"
	></div>
</template>
<script>
import { loadChart } from '@inb/oeb-uptime-chart';

export default {
	name: 'UptimePlot',
	props: {
		url: {
			type: String,
			required: true,
		},
	},
	mounted() {
		const stylesC3 = document.createElement('link');
		stylesC3.setAttribute('rel', 'stylesheet');
		stylesC3.setAttribute(
			'href',
			'https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.css'
		);
		document.head.appendChild(stylesC3);

		const d3 = document.createElement('script');
		d3.setAttribute(
			'src',
			'https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.7/d3.min.js'
		);
		document.head.appendChild(d3);

		const c3 = document.createElement('script');
		c3.setAttribute(
			'src',
			'https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.3/c3.min.js'
		);
		document.head.appendChild(c3);

		loadChart();
	},
};
</script>
