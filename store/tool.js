export default {
	namespaced: true,
	state: () => {
		return {
			toolsDisplayCards: false,
		};
	},
	actions: {
		updateToolsDisplayCards({ commit }, value) {
			commit('updateToolsDisplayCards', value);
		},
	},
	mutations: {
		updateToolsDisplayCards(state, value) {
			state.toolsDisplayCards = value;
		},
	},
	getters: {
		toolsDisplayCards: (state) => state.toolsDisplayCards,
	},
};
