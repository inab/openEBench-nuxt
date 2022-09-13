export default {
	namespaced: true,
	state: () => {
		return {
			event: {},
			challenges: [],
			loading: {
				event: false,
				challenges: false,
			},
		};
	},

	actions: {
		async getChallenges({ commit }, params) {
			commit('setLoading', { challenges: true });
			commit('setLoading', { event: true });

			const response = await this.$graphql.$post('/graphql', {
				query: `
					query ($id: String!) {
						getBenchmarkingEvents(benchmarkingEventFilters: {id: $id}) {
							_id
							dates {
								creation
								__typename
							}
							name
							url
							challenges {
								_id
								name
								acronym
								metrics_categories {
									category
									metrics {
										metrics_id
										tool_id
									}
								}
								url
								__typename
							}
							__typename
						}
					}
				`,
				variables: {
					id: params.id,
				},
			});

			commit('setEvent', response.data);
			commit('setChallenges', response.data);
			commit('setLoading', { challenges: false, event: false });
		},
	},

	mutations: {
		setChallenges(state, payload) {
			state.challenges = payload.getBenchmarkingEvents.map((event) => {
				return event.challenges.map((challenge) => {
					return challenge;
				});
			})[0];
		},
		setEvent(state, payload) {
			state.event = payload.getBenchmarkingEvents.map((event) => {
				return event;
			})[0];
		},
		setLoading(state, loading) {
			state.loading[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
		},
	},

	getters: {
		challenges: (state) => state.challenges,
		event: (state) => state.event,
	},
};
