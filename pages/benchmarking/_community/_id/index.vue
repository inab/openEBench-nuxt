<template>
	<v-container fluid>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.challenge"
			class="mb-5"
			type="heading, list-item-three-line"
		/>
		<div v-else>
			<h1 class="text-h4">
				{{ challenge.challenge_label }} ({{ challenge._id }})
			</h1>
			<h2 class="text-subtitle-1 mb-5">
				{{ challenge.name }}
			</h2>
			<p class="text--secondary">
				In this 2D plot two metrics from the challenge
				{{ challenge.challenge_label }} are represented in the X and Y axis,
				showing the results from the participating tools in this challenge. The
				gray line represents the pareto frontier, which runs over the
				participants tools, showing the best efficiency, while the arrow in the
				plot represents the optimal corner.
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
					<div v-if="index == tab">
						<div v-if="item">
							<LoaderChartWidgets
								:data="item"
								:metrics="metrics"
							></LoaderChartWidgets>
						</div>
						<div v-else>
							<v-progress-circular
								indeterminate
								color="primary"
							></v-progress-circular>
						</div>
					</div>
					<div v-else>
						No visual representation implemented
						<img src="" alt="" />
					</div>
				</v-tab-item>
			</v-tabs-items>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import LoaderChartWidgets from '~/components/Widgets/LoaderChartWidgets';

export default {
	name: 'CommunityChallengePlotsPage',
	components: {
		LoaderChartWidgets,
	},
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			tab: 0,
			m: [],
		};
	},
	computed: {
		...mapGetters('challenge', {
			datasets: 'datasetsList',
			challenge: 'challenge',
			metrics: 'metrics',
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
					text:
						(this.community.acronym
							? this.community.acronym
							: this.$route.params.community) + ' Events',
					disabled: false,
					exact: true,
					to: './events',
				},
				{
					text: this.currentEvent
						? this.currentEvent.name
						: this.$route.params.community + ' Results',
					disabled: false,
					exact: true,
					to: './?event=' + this.$route.params.id,
				},
				{
					text: this.challenge ? this.challenge.challenge_label : '',
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
