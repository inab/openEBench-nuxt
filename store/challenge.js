const PARTICIPANT_ID_KEY = 'level_2:participant_id';
const EXCLUDE_PARTICIPANT_KEY = 'level_2:exclude_participant';
const CHALLENGE_LABEL_KEY = 'level_2:challenge_id';
const METRIC_ID_KEY = 'level_2:metric_id';

export default {
	state: () => {
		return {
			datasets: [],
			participants: {},
			challenge: {},
			metrics: [],
			loading: {
				datasets: false,
				participants: false,
				metrics: false,
				challenge: false,
			},
		};
	},

	actions: {
		async getChallenge({ commit, dispatch }, params) {
			commit('setLoading', { challenge: true });
			commit('setLoading', { datasets: true });
			commit('setLoading', { participants: true });
			commit('setLoading', { metrics: true });

			const response = await this.$graphql.$post('/graphql', {
				query: `
					query ($id: String!) {
						getChallenges(challengeFilters: { id: $id }) {
							_id
							name
							acronym
							metrics_categories {
								metrics {
									metrics_id
									tool_id
								}
							}
							participant_datasets: datasets(datasetFilters: {type: "participant"}) {
								_id
								orig_id
								datalink {
									inline_data
									schema_url
									uri
									schema_uri
								}
								depends_on {
									tool_id
									metrics_id
									rel_dataset_ids {
										dataset_id
									}
								}
 								_metadata
							}
							assessment_datasets: datasets(datasetFilters: {type: "assessment"}) {
								_id
								orig_id
								datalink {
									inline_data
									schema_url
									uri
									schema_uri
								}
								depends_on {
									tool_id
									metrics_id
									rel_dataset_ids {
										dataset_id
									}
								}
 								_metadata
							}
						}

						getDatasets(
							datasetFilters: { challenge_id: $id, type: "aggregation" }
						) {
							datalink {
								inline_data
							}
							_id
						}
						
						getMetrics {
							_id
							orig_id
							representation_hints
							_metadata
						}
					}
				`,
				variables: {
					id: params.id,
				},
			});

			// Tidying up _metadata
			response.data.getChallenges.forEach((challenge) => {
				if (
					typeof challenge._metadata === 'string' ||
					challenge._metadata instanceof String
				) {
					challenge._metadata = JSON.parse(challenge._metadata);
				}

				challenge.participant_datasets.forEach((participant) => {
					if (
						typeof participant.datalink.inline_data === 'string' ||
						participant.datalink.inline_data instanceof String
					) {
						participant.datalink.inline_data = JSON.parse(
							participant.datalink.inline_data
						);
					}
					if (
						typeof participant._metadata === 'string' ||
						participant._metadata instanceof String
					) {
						participant._metadata = JSON.parse(participant._metadata);
					}
				});

				challenge.assessment_datasets.forEach((assessment) => {
					if (
						typeof assessment.datalink.inline_data === 'string' ||
						assessment.datalink.inline_data instanceof String
					) {
						assessment.datalink.inline_data = JSON.parse(
							assessment.datalink.inline_data
						);
					}
					if (
						typeof assessment._metadata === 'string' ||
						assessment._metadata instanceof String
					) {
						assessment._metadata = JSON.parse(assessment._metadata);
					}
				});
			});
			response.data.getDatasets.forEach((aggregation) => {
				if (
					typeof aggregation.datalink.inline_data === 'string' ||
					aggregation.datalink.inline_data instanceof String
				) {
					aggregation.datalink.inline_data = JSON.parse(
						aggregation.datalink.inline_data
					);
				}
				if (
					typeof aggregation._metadata === 'string' ||
					aggregation._metadata instanceof String
				) {
					aggregation._metadata = JSON.parse(aggregation._metadata);
				}
			});
			response.data.getMetrics.forEach((metric) => {
				if (
					typeof metric.representation_hints === 'string' ||
					metric.representation_hints instanceof String
				) {
					metric.representation_hints = JSON.parse(metric.representation_hints);
				}
				if (
					typeof metric._metadata === 'string' ||
					metric._metadata instanceof String
				) {
					metric._metadata = JSON.parse(metric._metadata);
				}
			});

			commit('setChallenge', response.data);
			commit('setLoading', { challenge: false });

			commit('setDatasets', response.data.getDatasets);
			commit('setParticipants', response.data.getChallenges[0]);
			commit('setLoading', { participants: false });

			commit('setMetrics', response.data.getMetrics);
			commit('setLoading', { metrics: false });

			dispatch('getGraphData');
		},

		getGraphData({ state, commit }) {
			state.datasets.forEach(async (dataset, i, datasets) => {
				const id = dataset._id;
				// TODO remove if statement, once more visualizations are consuming the widget endpoint
				const response =
					dataset.datalink.inline_data.visualization.type === 'bar-plot'
						? await this.$graphql
								.$get(
									`/widget/${dataset.datalink.inline_data.visualization.type}/${dataset._id}`
								)
								.catch(() => {
									return [];
								})
						: [];
				await commit('setDatasetGraphData', { id, response });

				if (i + 1 === datasets.length)
					commit('setLoading', { datasets: false });
			});

			if (state.datasets.length === 0)
				commit('setLoading', { datasets: false });
		},
	},

	mutations: {
		setDatasets(state, datasets) {
			state.datasets = datasets;
		},
		setMetrics(state, metrics) {
			state.metrics = metrics.map((metric) => {
				const allLabels = [];
				let proposedLabel;
				if (metric._metadata) {
					proposedLabel = metric._metadata[METRIC_ID_KEY];
					if (proposedLabel !== undefined) {
						allLabels.push(proposedLabel);
					}
				}
				if (metric.orig_id) {
					const colonPos = metric.orig_id.indexOf(':');
					if (colonPos >= 0) {
						// Removing prefix
						proposedLabel = metric.orig_id.substring(colonPos + 1);
						if (proposedLabel !== undefined) {
							allLabels.push(proposedLabel);
						}
					}
					allLabels.push(metric.orig_id);
				}

				metric.metrics_label = allLabels[0];

				return metric;
			});
		},
		setChallenge(state, payload) {
			state.challenge = payload.getChallenges[0];

			// Obtaining the challenge label
			let challengeLabel;
			if (state.challenge._metadata) {
				challengeLabel = state.challenge._metadata[CHALLENGE_LABEL_KEY];
			}

			if (state.challenge.acronym) {
				challengeLabel = state.challenge.acronym;
			}

			if (challengeLabel === undefined) {
				let chaOrigId = state.challenge.orig_id;
				if (!chaOrigId) {
					chaOrigId = state.challenge._id;
				}
				const colonPos = chaOrigId.indexOf(':');
				if (colonPos >= 0) {
					// Removing prefix
					challengeLabel = chaOrigId.substring(colonPos + 1);
				} else {
					challengeLabel = chaOrigId;
				}

				// TODO: remove benchmarking event label prefix
			}

			state.challenge.challenge_label = challengeLabel;
		},
		setParticipants(state, challenge) {
			// Store and index all the participant datasets, and their related
			// assessments
			state.participants = {};
			challenge.participant_datasets.forEach((participant) => {
				// Skip excluded participants
				if (
					participant._metadata &&
					participant._metadata[EXCLUDE_PARTICIPANT_KEY]
				) {
					return;
				}

				state.participants[participant._id] = participant;
				participant.assessments = [];

				// Obtaining the participant label
				let parLabel;
				if (participant._metadata) {
					parLabel = participant._metadata[PARTICIPANT_ID_KEY];
				}

				if (parLabel === undefined) {
					let parOrigId = participant.orig_id;
					if (!parOrigId) {
						parOrigId = participant._id;
					}
					const colonPos = parOrigId.indexOf(':');
					if (colonPos >= 0) {
						// Removing prefix
						parLabel = parOrigId.substring(colonPos + 1);
					} else {
						parLabel = parOrigId;
					}

					// Removing suffix
					if (parLabel.endsWith('_P')) {
						parLabel = parLabel.substring(0, parLabel.length - 2);
					}
				}

				participant.participant_label = parLabel;
			});
			challenge.assessment_datasets.forEach((assessment) => {
				assessment.depends_on.rel_dataset_ids.forEach((participantRef) => {
					if (participantRef.dataset_id in state.participants) {
						state.participants[participantRef.dataset_id].assessments.push(
							assessment
						);
					}
				});
			});
		},
		setDatasetGraphData(state, { id, response }) {
			state.datasets.find((x) => x._id === id).graphData = response;
		},
		setLoading(state, loading) {
			state.loading[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
		},
	},

	getters: {
		datasetsList: (state) => state.datasets,
		participants: (state) => {
			const participants = Object.values(state.participants).sort((a, b) =>
				a.participant_label.localeCompare(b.participant_label, {
					sensitivity: 'base',
				})
			);
			return participants;
		},
		metrics: (state) => state.metrics,
		challenge: (state) => state.challenge,
	},
};
