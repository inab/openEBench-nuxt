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
						links {
							uri
							comment
							label
						}
						benchmarkingEvents {
							_id
						}
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
				if (community.status === 'abandoned') community.status = 'inactive';
				return community;
			});
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	getters: {
		communitiesList: (state) => state.list,
		getCommunityById: (state) => (id) => {
			return state.list.find((community) => community._id === id);
		},
	},
};
