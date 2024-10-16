const parseDataURL = require('data-urls');
const { labelToName, decode } = require('whatwg-encoding');

export default {
	namespaced: true,
	state: () => {
		return {
			community: {},
			events: [],
			currentEvent: null,
			datasets: [],
			tools: [],
			loading: {
				events: false,
				tools: false,
				datasets: false,
				community: false,
			},
			error: false,
		};
	},

	actions: {
		async getCommunity({ commit }, params) {
			commit('setLoading', { community: true });
			commit('setLoading', { events: true });
			commit('setLoading', { tools: true });
			commit('setLoading', { datasets: true });

			try {
				const response = await this.$graphql.$post('/graphql', {
					query: `
            query ($community_id: String!) {
              getCommunities(communityFilters: {id: $community_id}) {
              _id
              name
              acronym
              description
              status
              keywords
              references
              community_contact_ids
              links {
                uri
                comment
                label
              }
              _metadata
              __typename
              }
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
              getDatasets(datasetFilters: {community_id: $community_id, visibility: "public"}) {
                name
                type
                datalink {
                  uri
                  __typename
                }
                __typename
              }
              getTools(toolFilters: {community_id: $community_id}) {
                _id
                name
                status
                description
                registry_tool_id
                __typename
              }
            }
          `,
					variables: {
						community_id: params.id,
					},
				});
				commit('setCommunity', response.data);
				commit('setLoading', { community: false });
				commit('setEvents', response.data);
				commit('setLoading', { events: false });
				commit('setDatasets', response.data);
				commit('setLoading', { datasets: false });
				commit('setTools', response.data);
				commit('setLoading', { tools: false });
			} catch (error) {
				commit('setLoading', { community: false });
				commit('setLoading', { events: false });
				commit('setLoading', { datasets: false });
				commit('setLoading', { tools: false });
				commit('setError', true);
			}
		},
	},

	mutations: {
		setCommunity(state, payload) {
			state.community = payload.getCommunities.map((community) => {
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
				return community;
			})[0];
		},
		setEvents(state, payload) {
			state.events = payload.getBenchmarkingEvents.sort((a, b) => {
				if (a._id < b._id) {
					return 1;
				}
				if (a._id > b._id) {
					return -1;
				}
				return 0;
			});
			this.commit('community/setCurrentEvent', state.events[0]);
		},
		setCurrentEvent(state, currentEvent) {
			state.currentEvent = currentEvent;
		},
		setDatasets(state, payload) {
			state.datasets = payload.getDatasets;
		},
		setTools(state, payload) {
			state.tools = payload.getTools;
		},
		setLoading(state, loading) {
			state.loading[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
		},
		setError(state, error) {
			state.error = error;
		},
	},

	getters: {
		community: (state) => state.community,
		communityReferences: (state) => {
			return state.community.references
				? state.community.references.map((reference) => {
						return {
							href: 'https://doi.org/' + reference.split(':')[1],
							doi: reference,
						};
				  })
				: [];
		},
		events: (state) => state.events,
		getEventById: (state) => (id) => {
			return state.events.find((event) => event._id === id);
		},
		currentEvent: (state) => state.currentEvent,
		datasets: (state) => state.datasets,
		tools: (state) => state.tools,
	},
};
