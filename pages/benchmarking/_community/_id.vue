<template>
	<v-container fluid>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.challenge"
			class="mb-5"
			type="heading, list-item-three-line"
		/>
		<div v-else>
			<h1 class="text-h4 mb-5">
				{{ challenge.name }} ({{ challenge.acronym }})
			</h1>
			<p class="text-body-2 text--secondary d-flex align-center">
				In order to facilitate the interpretation of benchmarking results
				OpenEbench offers several ways to visualize metrics: <br />
				In this 2D plot two metrics from the challenge
				{{ challenge.acronym }} are represented in the X and Y axis, showing the
				results from the participants in this challenge. The gray line
				represents the pareto frontier, which runs over the participants showing
				the best efficiency and the arrow in the plot represents the optimal
				corner.
				<br />
				The blue selection list can be used to switch between the different
				classification methods / visualization modes (square quartiles, diagonal
				quartiles and k-means clustering) Along with the chart these results are
				also transformed to a table which separates the participants in
				different groups.
			</p>
		</div>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.datasets"
			type="card-heading, image"
		/>
		<v-tabs
			v-else
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
		};
	},
	computed: {
		...mapGetters('challenge', {
			datasets: 'datasetsList',
			challenge: 'challenge',
		}),
		...mapGetters('community', {
			currentEvent: 'currentEvent',
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
					text: this.currentEvent
						? this.currentEvent.name
						: this.$route.params.community,
					disabled: false,
					exact: true,
					to: './',
				},
				{
					text: this.challenge ? this.challenge.name : '',
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
			this.$store.dispatch('challenge/getDatasets', {
				id: this.$route.params.id,
			});
			this.$store.dispatch('challenge/getChallenge', {
				id: this.$route.params.id,
			});
		}
	},
};
</script>
