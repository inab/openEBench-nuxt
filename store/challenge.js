export default {
	state: () => {
		return {
			datasets: [],
			challenge: {},
			loading: {
				datasets: false,
				challenge: false,
			},
		};
	},

	actions: {
		async getChallenge({ commit }, params) {
			commit('setLoading', { challenge: true });

			const response = await this.$graphql.$post('/graphql', {
				query: `
					query getChallenges($id: String!) {
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
						}
					}
				`,
				variables: {
					id: params.id,
				},
			});

			commit('setChallenge', response.data);
			commit('setLoading', { challenge: false });
		},
		async getDatasets({ commit }, params) {
			commit('setLoading', { datasets: true });

			const response = await this.$graphql.$post('/graphql', {
				query: `
					query getDatasets($id: String!) {
						getDatasets(
							datasetFilters: { challenge_id: $id, type: "aggregation" }
						) {
							datalink {
								inline_data
							}
							_id
						}
					}
				`,
				variables: {
					id: params.id,
				},
			});

			commit('setDatasets', response.data);
			commit('setLoading', { datasets: false });
		},
	},

	mutations: {
		setDatasets(state, payload) {
			state.datasets = payload.getDatasets.map((dataset) => {
				dataset.datalink.inline_data = JSON.parse(dataset.datalink.inline_data);
				return dataset;
			});
		},
		setChallenge(state, payload) {
			state.challenge = payload.getChallenges[0];
		},
		setLoading(state, loading) {
			state.loading[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
		},
	},

	getters: {
		datasetsList: (state) => state.datasets,
		challenge: (state) => state.challenge,
	},
};
