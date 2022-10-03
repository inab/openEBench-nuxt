export default {
	namespaced: true,
	state: () => {
		return {
			tools: [],
			loading: {
				tools: false,
			},
		};
	},

	actions: {
		async getTools({ commit }) {
			commit('setLoading', { tools: true });

			const response = await this.$graphql.$post('/graphql', {
				query: `
					query ($community_id: String!) {
						getTools(toolFilters:{community_id: $community_id}) {
							registry_tool_id
							name
						}
					}
				`,
				variables: {
					community_id: 'OEBC002',
				},
			});
			commit('setTools', response.data);
			commit('setLoading', { tools: false });
		},
	},

	mutations: {
		setTools(state, payload) {
			console.log(payload);
			state.tools = payload.getTools.map((tool) => {
				return tool;
			});
		},
		setLoading(state, loading) {
			state.loading[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
		},
	},

	getters: {
		toolsList: (state) => state.tools,
	},
};
