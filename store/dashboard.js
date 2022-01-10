export default {
	state: () => {
		return {
			resourcesCount: 0,
			toolsCount: 0,
			communitiesCount: 0,
		};
	},

	actions: {
		async getCommunitiesCount({ commit }) {
			const response = await this.$graphql.$post('/graphql', {
				query: `
				{
					getCommunities {
					  _id
					}
				  }
				`,
			});

			commit('setCommunitiesCount', response.data);
		},
		async getResourcesCount({ commit }) {
			const data = await this.$axios.$get('/statistics');
			commit('setResourcesCount', data);
		},
		async getToolsCount({ commit }) {
			const response = await this.$axios.head('/aggregate', {
				params: {
					limit: 1,
				},
			});
			commit('setToolsCount', response);
		},
	},

	mutations: {
		setResourcesCount(state, payload) {
			state.resourcesCount = payload.all.total;
		},
		setToolsCount(state, payload) {
			const matches = payload.headers['content-range'].match(
				/(\d+)-(\d+|\*)\/(\d+|\*)/
			);
			state.toolsCount = parseInt(matches[3]);
		},
		setCommunitiesCount(state, payload) {
			state.communitiesCount = payload.getCommunities.length;
		},
	},

	getters: {
		resourcesCount: (state) => state.resourcesCount,
		toolsCount: (state) => state.toolsCount,
		communitiesCount: (state) => state.communitiesCount,
	},
};
