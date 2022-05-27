export default {
	state: () => {
		return {
			resourcesCount: 0,
			toolsCount: 0,
			communitiesCount: 0,
			projectsCount: 0,
		};
	},

	actions: {
		async getCommunitiesCount({ commit }) {
			const response = await this.$graphql.$post('/graphql', {
				query: `
				{
					getCommunities {
					  _id
					  _metadata
					}
				  }
				`,
			});

			commit('setCommunitiesCount', response.data);
		},
		async getResourcesCount({ commit }) {
			const response = await this.$observatory.$get('tools/count_total');
			commit('setResourcesCount', response[0]);
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
			state.resourcesCount = payload.data;
		},
		setToolsCount(state, payload) {
			const matches = payload.headers['content-range'].match(
				/(\d+)-(\d+|\*)\/(\d+|\*)/
			);
			state.toolsCount = parseInt(matches[3]);
		},
		setCommunitiesCount(state, payload) {
			const communities = payload.getCommunities.map((community) => {
				community._metadata = JSON.parse(community._metadata);
				return community;
			});

			state.communitiesCount = communities.filter((item) =>
				item._metadata ? !item._metadata.project_spaces : true
			).length;

			state.projectsCount = communities.filter((item) =>
				item._metadata ? item._metadata.project_spaces : false
			).length;
		},
	},

	getters: {
		resourcesCount: (state) => state.resourcesCount,
		toolsCount: (state) => state.toolsCount,
		communitiesCount: (state) => state.communitiesCount,
		projectsCount: (state) => state.projectsCount,
	},
};
