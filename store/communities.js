export default {
	state: () => {
		return {
			list: [],
			loading: false,
		};
	},

	actions: {
		async getCommunities({ commit }) {
			commit('setLoading', true);

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
				if (community.status === 'abandoned') community.status = 'inactive';
				return community;
			});
		},
		setLoading(state, loading) {
			state.loading = loading;
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
