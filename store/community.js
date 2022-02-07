export default {
	state: () => {
		return {
			events: [],
			loading: false,
		};
	},

	actions: {
		async getBenchmarkingEvents({ commit }, params) {
			commit('setLoading', true);
			const response = await this.$graphql.$post('/graphql', {
				query: `
					query getBenchmarkingEvents($community_id: String!) {
						getBenchmarkingEvents(benchmarkingEventFilters: {community_id: $community_id}) {
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
							url
							__typename
						}
						__typename
						}
					}
				`,
				variables: {
					community_id: params.id,
				},
			});
			commit('setEvents', response.data);
			commit('setLoading', false);
		},
	},

	mutations: {
		setEvents(state, payload) {
			state.events = payload.getBenchmarkingEvents;
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	getters: {
		events: (state) => state.events,
	},
};
