<template>
	<v-container>
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
			<!-- TODO -->
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
			<v-skeleton-loader
				v-if="
					$store.state.challenge.loading.participants ||
					$store.state.challenge.loading.metrics
				"
				class="mb-5"
				type="heading, list-item-three-line"
			/>
			<challenge-participant-metrics-table
				v-else
				:metrics-table="metricsTable"
			/>
		</div>
		<v-skeleton-loader
			v-if="$store.state.challenge.loading.participants"
			type="card-heading, image"
		/>
		<div v-else>
			<h2 class="text-h6 mt-8">
				Choose one of the {{ participants.length }} participants whose metrics
				you want to visualize in the radar plot:
			</h2>
			<v-chip-group v-model="tab" active-class="accent--text" column mandatory>
				<v-chip v-for="participant in participants" :key="participant._id">
					{{ participant.participant_label }}
				</v-chip>
			</v-chip-group>
			<v-tabs-items v-model="tab">
				<v-tab-item
					v-for="(item, index) in participants"
					:key="index"
					:transition="false"
				>
					<!-- No Visualization -->
					<div
						class="text--secondary mt-6 mx-10"
						align="center"
						color="rgba(0, 0, 0, 0.6)"
					>
						<v-img :src="illustration" contain max-height="300" />
						<h2>No chart available</h2>
						<p class="text-h6">
							No visual representation implemented yet. Check back soon!
						</p>
					</div>
				</v-tab-item>
			</v-tabs-items>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ChallengeParticipantMetricsTable from '~/components/Challenges/ChallengeParticipantMetricsTable';

export default {
	name: 'CommunityChallengeParticipantsPage',
	components: { ChallengeParticipantMetricsTable },
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			tab: 0,
			illustration: require('~/static/images/illustrations/empty-state.svg'),
		};
	},
	computed: {
		...mapGetters('challenge', {
			participants: 'participants',
			metrics: 'metrics',
			challenge: 'challenge',
		}),
		...mapGetters('community', {
			currentEvent: 'currentEvent',
			community: 'community',
		}),
		metricsTable() {
			const metricsIdsDict = {};
			// Gather the metrics
			this.participants.forEach((participant) => {
				participant.assessments.forEach((assessment) => {
					if (
						typeof assessment.depends_on.metrics_id !== 'string' &&
						!(assessment.depends_on.metrics_id instanceof String)
					) {
						return;
					}

					// This metric value is unavailable or hidden for some reason
					if (
						!assessment.datalink.inline_data ||
						assessment.datalink.inline_data.hide
					) {
						return;
					}

					// TODO: deal with HUGE metrics series
					// TODO: deal with metrics which are data series

					if (!(assessment.depends_on.metrics_id in metricsIdsDict)) {
						metricsIdsDict[assessment.depends_on.metrics_id] = {
							metric: {},
							participants: {},
						};
					}
					metricsIdsDict[assessment.depends_on.metrics_id].participants[
						participant._id
					] = assessment.datalink.inline_data;
				});
			});
			// And their metadata
			this.metrics.forEach((metric) => {
				if (metric._id in metricsIdsDict) {
					metricsIdsDict[metric._id].metric = metric;
				}
			});
			const sortedMetricsIds = Object.keys(metricsIdsDict).sort();
			const dataMatrix = this.participants.map((participant) => {
				return sortedMetricsIds.map((metricsId) => {
					if (
						!(metricsId in metricsIdsDict) ||
						!(participant._id in metricsIdsDict[metricsId].participants)
					) {
						return null;
					}

					return metricsIdsDict[metricsId].participants[participant._id];
				});
			});
			return {
				participants: this.participants,
				metrics: sortedMetricsIds.map((mI) => metricsIdsDict[mI].metric),
				dataMatrix,
			};
		},
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
					to: '../events',
				},
				{
					text: this.currentEvent
						? this.currentEvent.name
						: this.$route.params.community + ' Results',
					disabled: false,
					exact: true,
					to: '../?event=' + this.$route.params.id,
				},
				{
					text: this.challenge ? this.challenge.challenge_label : '',
					disabled: false,
					exact: true,
					to: '../' + this.$route.params.id,
				},
				{
					text: 'participants',
					disabled: true,
					to: 'participants',
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
