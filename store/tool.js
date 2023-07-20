export default {
	namespaced: true,
	state: () => {
		return {
			searchedTerm: '',
			toolsDisplayCards: false,
			loading: {
				search: false,
			},
			tools: [],
			counts: {},
		};
	},
	actions: {
		updateToolsDisplayCards({ commit }, value) {
			commit('updateToolsDisplayCards', value);
		},
		updateSearchedTerm({ commit }, value) {
			commit('updateSearchedTerm', value);
		},
		updateLoadingSearch({ commit }, value) {
			commit('updateLoadingSearch', value);
		},
		async searchTools({ commit }, q) {
			commit('updateLoadingSearch', true);

			const result = await this.$observatory.$get('/search?q=' + q);

			commit('updateTools', result.tools);
			commit('updateCounts', result.counts);

			commit('updateLoadingSearch', false);
		},
	},
	mutations: {
		updateToolsDisplayCards(state, value) {
			state.toolsDisplayCards = value;
		},
		updateSearchedTerm(state, value) {
			state.searchedTerm = value;
		},
		updateLoadingSearch(state, value) {
			state.loading.search = value;
		},
		updateTools(state, value) {
			state.tools = value;
		},
		updateCounts(state, value) {
			state.counts = value;
		},
	},
	getters: {
		searchedTerm: (state) => state.searchedTerm,
		toolsDisplayCards: (state) => state.toolsDisplayCards,
		loading: (state) => state.loading,
		tools: (state) => state.tools,
		counts: (state) => state.counts,
	},
};
