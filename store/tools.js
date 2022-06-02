export default {
	state: () => {
		return {
			list: [],
			loading: false,
		};
	},

	actions: {
		async getTools({ commit }) {
			commit('setLoading', true);
			// put limit
			const response = await this.$axios.get('/edam/aggregate', {
				params: {
					projection: 'web',
					name: '',
					label: 'null',
					limit: 100,
				},
			});
			commit('setTools', response);
			commit('setLoading', false);
		},
	},

	mutations: {
		setTools(state, payload) {
			state.list = payload.data;
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
	},

	getters: {
		toolsList: (state) => state.list,
	},
};
