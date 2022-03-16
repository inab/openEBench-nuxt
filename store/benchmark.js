export default {
	state: () => {
		return {
			datasets: [],
			loading: false,
		};
	},

	actions: {
		async getDatasets({ commit }, params) {
			commit('setLoading', true);

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
			commit('setLoading', false);
		},
	},

	mutations: {
		setDatasets(state, payload) {
			state.datasets = payload.getDatasets.map((dataset) => {
				dataset.datalink.inline_data = JSON.parse(dataset.datalink.inline_data);
				return dataset;
			});
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	getters: {
		datasetsList: (state) => state.datasets,
	},
};
