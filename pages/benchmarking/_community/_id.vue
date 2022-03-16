<template>
	<v-container fluid>
		<v-tabs
			v-model="tab"
			class="mb-10"
			show-arrows
			next-icon="mdi-arrow-right-bold-box-outline"
			prev-icon="mdi-arrow-left-bold-box-outline"
		>
			<v-tab v-for="(item, index) in datasets" :key="index">
				{{
					item.datalink.inline_data.visualization.type == '2D-plot'
						? item.datalink.inline_data.visualization.x_axis +
						  '+' +
						  item.datalink.inline_data.visualization.y_axis
						: item.datalink.inline_data.visualization.metric
				}}
			</v-tab>
			<v-tab-item v-for="(item, index) in datasets" :key="index">
				<chart-scatter-visualizer-wrapper
					v-if="
						item.datalink.inline_data.visualization.type == '2D-plot' &&
						index == tab
					"
					:id="item._id"
					:key="item._id"
					class="mt-5"
				/>
				<chart-barplot-visualizer-wrapper
					v-else-if="
						item.datalink.inline_data.visualization.type == 'bar-plot' &&
						index == tab
					"
					:id="item._id"
					:key="item._id"
					class="mt-5"
				/>
				<div v-else>No visual representation implemented</div>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ChartBarplotVisualizerWrapper from '~/components/Widgets/ChartBarplotVisualizerWrapper';
import ChartScatterVisualizerWrapper from '~/components/Widgets/ChartScatterVisualizerWrapper';

export default {
	name: 'CommunityParticipantPage',
	components: { ChartBarplotVisualizerWrapper, ChartScatterVisualizerWrapper },
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			tab: null,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Benchmarking Communities',
					disabled: false,
					exact: true,
					to: '/benchmarking',
				},
				{
					text: this.$route.params.community,
					disabled: false,
					exact: true,
					to: './',
				},
				{
					text: this.$route.params.id,
					disabled: true,
					to: this.$route.params.id,
				},
			],
		};
	},
	computed: {
		...mapGetters('benchmark', {
			datasets: 'datasetsList',
		}),
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		this.$store.dispatch('benchmark/getDatasets', {
			id: this.$route.params.id,
		});
	},
};
</script>
