export default {
	state: () => {
		return {
			list: [],
		};
	},

	actions: {
		async getCommunities({ commit }) {
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
					}
				  }
				`,
			});

			commit('setCommunities', response.data);
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
				return community;
			});
		},
	},

	getters: {
		communitiesList: (state) => state.list,
	},
};
