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
				{
					date: '2022-10-30T08:54:39.833781Z',
					code: 200,
					access_time: 51,
				},
				{
					date: '2022-10-31T08:58:04.020717Z',
					code: 200,
					access_time: 44,
				},
				{
					date: '2022-11-01T08:49:07.906341Z',
					code: 200,
					access_time: 63,
				},
				{
					date: '2022-11-02T08:47:36.459380Z',
					code: 200,
					access_time: 64,
				},
				{
					date: '2022-11-03T08:54:21.199020Z',
					code: 200,
					access_time: 49,
				},
				{
					date: '2022-11-04T08:53:33.172650Z',
					code: 500,
					access_time: null,
				},
				{
					date: '2022-11-05T08:54:28.260621Z',
					code: 200,
					access_time: 58,
				},
				{
					date: '2022-11-06T09:00:15.278839Z',
					code: 200,
					access_time: 66,
				},
				{
					date: '2022-11-07T08:54:51.949921Z',
					code: 200,
					access_time: 59,
				},
				{
					date: '2022-11-08T08:51:37.119677Z',
					code: 200,
					access_time: 55,
				},
				{
					date: '2022-11-09T08:55:28.859704Z',
					code: 200,
					access_time: 59,
				},
				{
					date: '2022-11-10T08:53:46.080676Z',
					code: null,
					access_time: null,
				},
				{
					date: '2022-11-11T08:50:59.033335Z',
					code: 200,
					access_time: 55,
				},
				{
					date: '2022-11-12T08:55:49.153184Z',
					code: 200,
					access_time: 43,
				},
				{
					date: '2022-11-13T08:59:45.425038Z',
					code: 200,
					access_time: 46,
				},
				{
					date: '2022-11-14T08:58:43.666071Z',
					code: 200,
					access_time: 49,
				},
				{
					date: '2022-11-15T08:54:17.602352Z',
					code: 200,
					access_time: 44,
				},
				{
					date: '2022-11-16T08:43:16.536674Z',
					code: 200,
					access_time: 47,
				},
				{
					date: '2022-11-17T08:45:43.499569Z',
					code: 200,
					access_time: 50,
				},
				{
					date: '2022-11-18T08:43:36.372328Z',
					code: 500,
					access_time: null,
				},
				{
					date: '2022-11-19T08:44:53.357895Z',
					code: 500,
					access_time: null,
				},
				{
					date: '2022-11-20T08:49:03.335303Z',
					code: 200,
					access_time: 43,
				},
				{
					date: '2022-11-21T08:44:28.463210Z',
					code: 200,
					access_time: 43,
				},
			],
		};
	},
};
</script>
