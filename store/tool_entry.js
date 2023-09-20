export default {
	namespaced: true,
	state: () => {
		return {
			tool: {},
			loading: true,
		};
	},
	actions: {
		async retrieveTool({ commit }, payload) {
			commit('updateLoading', true);
			const { data } = await this.$observatory.get(
				`/tools?name=${payload.name}&type=${payload.type}`
			);
			commit('updateTool', data);
			commit('updateLoading', false);
		},
	},
	mutations: {
		updateTool(state, payload) {
			state.tool = payload;
		},
		updateLoading(state, payload) {
			state.loading = payload;
		},
	},
	getters: {
		tool(state) {
			return state.tool;
		},
		loading(state) {
			return state.loading;
		},
	},
};
