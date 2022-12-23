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
		async getChallenge({ commit, dispatch }, params) {
			commit('setLoading', { challenge: true });
			commit('setLoading', { datasets: true });

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
						}

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

			commit('setChallenge', response.data);
			commit('setLoading', { challenge: false });

			commit('setDatasets', response.data);

			dispatch('getGraphData');
		},

		getGraphData({ state, commit }) {
			let i = 0;
			state.datasets.forEach(async (dataset) => {
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

				i++;
				if (i === state.datasets.length)
					commit('setLoading', { datasets: false });
			});

			if (state.datasets.length === 0)
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
		setDatasetGraphData(state, { id, response }) {
			state.datasets.find((x) => x._id === id).graphData = response;
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
