<template>
	<accessibilityPlot :data-items="data" />
</template>
<script>
import { accessibilityPlot } from '@inb/oeb_visualizations';

export default {
	name: 'UptimePlotMonth',
	components: {
		accessibilityPlot,
	},
	data() {
		return {
			data: [
				{
					date: '2022-10-23T07:54:06.716122Z',
					code: 200,
					access_time: 51,
				},
				{
					date: '2022-10-24T07:58:50.609475Z',
					code: 200,
					access_time: 67,
				},
				{
					date: '2022-10-25T07:51:53.841140Z',
					code: 200,
					access_time: 55,
				},
				{
					date: '2022-10-26T07:53:06.060685Z',
					code: 200,
					access_time: 46,
				},
				{
					date: '2022-10-27T07:48:13.525298Z',
					code: 200,
					access_time: 65,
				},
				{
					date: '2022-10-28T07:48:38.916127Z',
					code: 200,
					access_time: 64,
				},
				{
					date: '2022-10-29T07:48:25.752029Z',
					code: 200,
					access_time: 47,
				},
			],
		};
	},
};
</script>
