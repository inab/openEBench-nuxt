const parseDataURL = require('data-urls');
const { labelToName, decode } = require('whatwg-encoding');

export default {
	state: () => {
		return {
			list: [],
			loading: false,
			error: false,
		};
	},

	actions: {
		async getCommunities({ commit }) {
			commit('setLoading', true);

			try {
				const response = await this.$graphql.$post('/graphql', {
					query: `
          {
            getCommunities {
              _id
              name
              acronym
              description
              status
              keywords
              links {
                uri
                comment
                label
              }
              benchmarkingEvents {
                _id
              }
              _metadata
            }
            }
          `,
				});

				commit('setCommunities', response.data);
				commit('setLoading', false);
				commit('setError', false);
			} catch (error) {
				commit('setLoading', false);
				commit('setError', true);
			}
		},
	},

	mutations: {
		setCommunities(state, payload) {
			state.list = payload.getCommunities.map((community) => {
				community.links.forEach((link) => {
					if (link.comment === '@logo') {
						community.logo = link.uri;
					}
				});
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
				if (community.status === 'abandoned') community.status = 'inactive';
				return community;
			});
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
		setError(state, error) {
			state.error = error;
		},
	},

	getters: {
		communitiesList: (state) =>
			state.list.filter(
				(item) => (item._metadata ? !item._metadata.project_spaces : true) // filter project communities
			),
		communitiesFilteredByProjects: (state) =>
			state.list.filter((item) =>
				item._metadata ? item._metadata.project_spaces : false
			),
		getCommunityById: (state) => (id) => {
			return state.list.find((community) => community._id === id);
		},
	},
};
