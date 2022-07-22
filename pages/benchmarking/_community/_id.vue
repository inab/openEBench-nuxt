<template>
	<v-container fluid>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.challenge"
			class="mb-5"
			type="heading, list-item-three-line"
		/>
		<div v-else>
			<h1 class="text-h4">
				{{ challenge.acronym }}
			</h1>
			<h2 class="text-subtitle-1 mb-5">
				{{ challenge.name }}
			</h2>
			<p class="text--secondary">
				In this 2D plot two metrics from the challenge
				{{ challenge.acronym }} are represented in the X and Y axis, showing the
				results from the participating tools in this challenge. The gray line
				represents the pareto frontier, which runs over the participants tools,
				showing the best efficiency, while the arrow in the plot represents the
				optimal corner.
			</p>
			<v-alert class="mt-8" border="left" dense text color="info" type="info">
				The menu button above the diagram can be used to switch between the
				different classification methods / visualization modes (Square
				Quartiles; Diagonal Quartiles, and k-means Clustering).
			</v-alert>
		</div>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.datasets"
			type="card-heading, image"
		/>
		<div v-else>
			<h2 class="text-h6 mt-8">
				Choose the metrics you want to visualize in the diagram:
			</h2>
			<v-chip-group v-model="tab" active-class="accent--text" column mandatory>
				<v-chip v-for="item in datasets" :key="item._id">
					{{
						item.datalink.inline_data.visualization.type == '2D-plot'
							? item.datalink.inline_data.visualization.x_axis +
							  ' + ' +
							  item.datalink.inline_data.visualization.y_axis
							: item.datalink.inline_data.visualization.metric
					}}
				</v-chip>
			</v-chip-group>
			<v-tabs-items v-model="tab">
				<v-tab-item
					v-for="(item, index) in datasets"
					:key="index"
					:transition="false"
				>
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
							index == tab &&
							item.graphData
						"
						:id="item._id"
						:key="item._id"
						:data="item.graphData"
						:metric-name="item.datalink.inline_data.visualization.metric"
						class="mt-5"
					/>
					<div v-else>No visual representation implemented</div>
				</v-tab-item>
			</v-tabs-items>
		</div>
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
			tab: 0,
		};
	},
	computed: {
		...mapGetters('challenge', {
			datasets: 'datasetsList',
			challenge: 'challenge',
		}),
		...mapGetters('community', {
			currentEvent: 'currentEvent',
			community: 'community',
		}),
		breadcrumbs() {
			return [
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
					text: this.community.acronym
						? this.community.acronym
						: this.$route.params.community + ' Events',
					disabled: false,
					exact: true,
					to: 'events',
				},
				{
					text: this.currentEvent
						? this.currentEvent.name
						: this.$route.params.community + ' Results',
					disabled: false,
					exact: true,
					to: './',
				},
				{
					text: this.challenge ? this.challenge.acronym : '',
					disabled: true,
					to: this.$route.params.id,
				},
			];
		},
	},
	watch: {
		breadcrumbs() {
			this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		if (this.$store.state.challenge.challenge._id !== this.$route.params.id) {
			this.$store.dispatch('challenge/getChallenge', {
				id: this.$route.params.id,
			});
		}
	},
};
</script>
