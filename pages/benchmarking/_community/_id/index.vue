<template>
	<v-container>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.challenge"
			class="mb-5"
			type="heading, list-item-three-line"
		/>
		<div v-else class="mx-3">
			<h1 class="text-h4">
				{{ challenge.challenge_label }} ({{ challenge._id }})
			</h1>
			<h2 class="text-subtitle-1 font-italic mb-5">
				{{ challenge.name }}
			</h2>

			<!-- Description -->
			<div v-if="!$store.state.challenge.loading.datasets">
				<div v-for="(item, index) in datasets" :key="index">
					<div v-if="index == tab">
						<div v-if="item">
							<ChartDescriptionCard
								:data="item"
								:challenge_label="challenge.challenge_label"
							></ChartDescriptionCard>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.datasets"
			type="card-heading, image"
		/>
		<div v-else>
			<h2 class="text-h6 mt-8 mx-3">
				Choose the metrics you want to visualize in the diagram:
			</h2>
			<v-chip-group
				v-model="tab"
				active-class="accent--text"
				column
				mandatory
				class="mx-3"
			>
				<v-chip v-for="item in datasets" :key="item._id">
					<span
						v-if="item.datalink.inline_data.visualization.type == 'box-plot'"
					>
						{{ item.datalink.inline_data.visualization.available_metrics[0] }}
					</span>
					<span v-else>
						{{
							item.datalink.inline_data.visualization.type == '2D-plot'
								? item.datalink.inline_data.visualization.x_axis +
								  ' + ' +
								  item.datalink.inline_data.visualization.y_axis
								: item.datalink.inline_data.visualization.metric
						}}
					</span>
				</v-chip>
			</v-chip-group>
			<v-tabs-items v-model="tab" class="mx- 4">
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
						<div
							class="text--secondary mt-6 mx-10"
							align="center"
							color="rgba(0, 0, 0, 0.6)"
						>
							<v-img :src="illustration" contain max-height="300" />

							<h2>No chart available</h2>
							<p class="text-h6">
								We're working on adding a new visualization. Check back soon!
							</p>
						</div>
					</div>
				</v-tab-item>
			</v-tabs-items>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import LoaderChartWidgets from '~/components/Widgets/LoaderChartWidgets';
import ChartDescriptionCard from '~/components/Cards/ChartDescriptionCard';

export default {
	name: 'CommunityChallengePlotsPage',
	components: {
		LoaderChartWidgets,
		ChartDescriptionCard,
	},
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			tab: 0,
			m: [],
			illustration: require('~/static/images/illustrations/empty-state.svg'),
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

<style scoped>
.container {
	max-width: 1300px !important;
}
</style>
