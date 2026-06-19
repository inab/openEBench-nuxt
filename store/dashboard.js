const parseDataURL = require('data-urls');
const { labelToName, decode } = require('whatwg-encoding');

export default {
	state: () => {
		return {
			resourcesCount: 0,
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
			const response = await this.$observatory.$get('/stats/tools/count_total');
			commit('setResourcesCount', response[0]);
		},
	},

	mutations: {
		setResourcesCount(state, payload) {
			state.resourcesCount = payload.data;
		},
		setCommunitiesCount(state, payload) {
			const communities = payload.getCommunities.map((community) => {
				community._metadata = JSON.parse(community._metadata);
				if (community._metadata && 'project:summary' in community._metadata) {
					const dataURL = parseDataURL(community._metadata['project:summary']);
					const encodingName = labelToName(
						dataURL.mimeType.parameters.get('charset') || 'utf-8'
					);
					const decodedSummary = decode(dataURL.body, encodingName);

					community.summary = decodedSummary;
					community._metadata['project:summary'] = decodedSummary;
				} else {
					community.summary = null;
				}
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
		communitiesCount: (state) => state.communitiesCount,
		projectsCount: (state) => state.projectsCount,
	},
};
