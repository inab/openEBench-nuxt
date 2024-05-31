<template>
	<div>
		<br />
		<LoaderWidgets
			v-if="preparedData"
			:data-chart="preparedData"
		></LoaderWidgets>
	</div>
</template>
<script>
import LoaderWidgets from '@inb/oeb-widgets/components/LoaderWidgets.vue';

export default {
	name: 'LoaderChartWidgets',
	components: {
		LoaderWidgets,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
		metrics: {
			type: Array,
			required: false,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			fetchedData: Object,
			preparedData: null,
		};
	},
	async mounted() {
		await this.fetchDataAndRender(this.data);
	},
	methods: {
		// Prepare data
		async fetchDataAndRender(data) {
			// Sets charging status based on data presence
			this.loading = !data;
			const visualization = data.datalink.inline_data.visualization;
			const type = visualization.type;
			// Prepare the data to pass to the component
			this.preparedData = {
				_id: data._id,
				dates: data.dates,
				dataset_contact_ids: data.dataset_contact_ids,
				inline_data: {
					challenge_participants: [],
					visualization: {},
				},
			};
			// Prepare specific data for Plots
			if (type === 'bar-plot') {
				// Process challenge_participants data for BarPlot
				data.datalink.inline_data.challenge_participants.forEach(
					(participant) => {
						const preparedParticipant = {
							tool_id: participant.tool_id,
							metric_value: participant.metric_value,
							stderr: participant.stderr,
						};
						this.preparedData.inline_data.challenge_participants.push(
							preparedParticipant
						);
					}
				);
				// Process visualization data for BarPlot
				const visualization = data.datalink.inline_data.visualization;
				this.preparedData.inline_data.visualization = {
					metric: visualization.metric,
					type: visualization.type,
				};
			} else if (type === '2D-plot') {
				// Process challenge_participants data for ScatterPlot
				data.datalink.inline_data.challenge_participants.forEach(
					(participant) => {
						const preparedParticipant = {
							tool_id: participant.tool_id,
							metric_x: participant.metric_x,
							stderr_x: participant.stderr_x,
							metric_y: participant.metric_y,
							stderr_y: participant.stderr_y,
						};
						this.preparedData.inline_data.challenge_participants.push(
							preparedParticipant
						);
					}
				);

				// Process visualization data for ScatterPlot
				const visualization = data.datalink.inline_data.visualization;
				const optimization = visualization.optimization
					? visualization.optimization
					: null;

				// get metrics
				let xAxis, yAxis;
				try {
					const metricsNames =
						this.metrics.length > 0
							? await this.getMetricsNames(
									visualization.x_axis,
									visualization.y_axis
							  )
							: {
									metricX: visualization.x_axis,
									metricY: visualization.y_axis,
							  };
					xAxis = metricsNames.metricX;
					yAxis = metricsNames.metricY;
				} catch (error) {
					console.error('Error getting the metric names:', error); // eslint-disable-line no-console
					xAxis = visualization.x_axis;
					yAxis = visualization.y_axis;
				}

				this.preparedData.inline_data.visualization = {
					type: visualization.type,
					x_axis: xAxis,
					y_axis: yAxis,
					optimization,
				};
			} else {
				return null;
			}

			// Check the display type and set the corresponding status
			if (visualization && type) {
				this.visualizationType = type;
			}
		},

		// Get metrics title
		getMetricsNames(metricX, metricY) {
			const metricNames = { metricX: '', metricY: '' };
			if (this.metrics.length > 0) {
				this.metrics.forEach(function (metric) {
					if (metric._metadata && 'level_2:metric_id' in metric._metadata) {
						if (metric._metadata['level_2:metric_id'] === metricX) {
							metricNames.metricX = metric.title;
						}
						if (metric._metadata['level_2:metric_id'] === metricY) {
							metricNames.metricY = metric.title;
						}
					}
				});
			} else {
				return [];
			}
			return metricNames;
		},
	},
};
</script>
