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

			const URL = 'https://dev2-openebench.bsc.es/api/scientific/staged/Tool';

			const response = await this.$axios
				.get(URL, {
					headers: {
						'Content-Type':
							'application/x-www-form-urlencoded; charset=UTF-8;application/json',
						'Access-Control-Allow-Origin': '*',
						Accept: 'application/json',
					},
				})
				.then((response) => {
					console.log(response);
				})
				.catch((e) => console.log(e));

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
