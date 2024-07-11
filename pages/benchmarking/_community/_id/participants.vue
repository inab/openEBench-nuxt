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
			<h2 class="text-subtitle-1 font-italic mb-5">
				{{ challenge.name }}
			</h2>
			<!-- TODO -->
			<p class="text--secondary">
				List of tools participating in the challenge, together with a summary of
				the metrics obtained.
			</p>
		</div>

		<!-- Participants and metrics available. -->
		<div v-if="participants.length > 0">
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

			<v-skeleton-loader
				v-if="$store.state.challenge.loading.participants"
				type="card-heading, image"
			/>
			<div v-else>
				<h2 class="text-h6 mt-8">
					Choose one of the {{ participants.length }} participants whose metrics
					you want to visualize in the radar plot:
				</h2>
				<!-- CHIPS -->
				<v-data-table
					v-if="participants.length > 15"
					:items="participants"
					:items-per-page="15"
					hide-default-header
					disable-sort
					class="no-hover my-4"
				>
					<template #body="{ items }">
						<tbody>
							<tr
								v-for="(row, rowIndex) in chunk(items, 3)"
								:key="rowIndex"
								active-class="accent--text"
							>
								<td
									v-for="participant in row"
									:key="participant._id"
									class="pa-2"
								>
									<v-chip
										class="chip"
										:class="{ 'accent--text': tab === participant._id }"
										:input-value="tab === participant._id"
										@click="tab = participant._id"
									>
										{{ formatLabel(participant.participant_label) }}
									</v-chip>
								</td>
							</tr>
						</tbody>
					</template>
				</v-data-table>

				<!-- Chips for less than 15 participants -->
				<div class="my-4" v-else :value="tab" column>
					<v-chip
						class="chip2 mx-1 my-1"
						:class="{ 'accent--text': tab === participant._id }"
						v-for="participant in participants"
						:key="participant._id"
						:input-value="tab === participant._id"
						@click="selectParticipant(participant._id)"
					>
						{{ formatLabel(participant.participant_label) }}
					</v-chip>
				</div>

				<!-- Chart or no visualization -->
				<v-tabs-items v-if="tab" v-model="tab">
					<v-tab-item
						v-for="(item, index) in participants"
						:key="index"
						:value="item._id"
						:transition="false"
					>
						<!-- No Visualization -->
						<div
							class="text--secondary mt-6 mx-10"
							align="center"
							color="rgba(0, 0, 0, 0.6)"
						>
							<v-img :src="illustration" contain max-height="300" />
							<h2>No chart available.</h2>
							<p class="text-h6">
								No visual representation implemented yet. Check back soon!
							</p>
						</div>
					</v-tab-item>
				</v-tabs-items>
			</div>
		</div>
		<!-- No participants and metrics available. -->
		<div v-else>
			<div class="mt-8" align="center">
				<v-img :src="illustration" contain max-height="300" />
				<h2>No participants and metrics available.</h2>
			</div>
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
			tab: null,
			illustration: require('~/static/images/illustrations/empty-state.svg'),
			pagination: {
				page: 1,
				itemsPerPage: 15,
			},
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
		participants(newParticipants) {
			if (newParticipants.length > 0) {
				this.tab = newParticipants[0]._id;
			} else {
				this.tab = null;
			}
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		if (this.$store.state.challenge.challenge._id !== this.$route.params.id) {
			this.$store.dispatch('challenge/getChallenge', {
				id: this.$route.params.id,
			});
		}

		if (this.participants.length > 0) {
			this.tab = this.participants[0]._id;
		}
	},
	methods: {
		// Format participants label text
		formatLabel(text) {
			if (text.startsWith('Dataset_participant:')) {
				return text.replace('Dataset_participant:', '');
			}
			return text;
		},
		chunk(array, size) {
			const chunkedArr = [];
			for (let i = 0; i < array.length; i += size) {
				chunkedArr.push(array.slice(i, i + size));
			}
			return chunkedArr;
		},
		selectParticipant(id) {
			this.tab = id;
		},
	},
};
</script>

<style scoped>
.container {
	height: calc(100% - 390px);
}

.chip {
	width: 340px !important;
	text-align: center;
	justify-content: center;
}

.chip2 {
	width: 260px !important;
	text-align: center;
	justify-content: center;
}

.no-hover tbody tr:hover {
	background-color: transparent !important;
}
</style>
