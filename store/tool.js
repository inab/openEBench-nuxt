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
			console.log(
				`This is a request to shearch tools with the term: "${q}" 🚀`
			);

			// TODO: actually make the request to the API
			const result = await this.$axios.$get(
				'https://jsonplaceholder.typicode.com/todos/1'
			);
			commit('updateTools', result);

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
	},
	getters: {
		searchedTerm: (state) => state.searchedTerm,
		toolsDisplayCards: (state) => state.toolsDisplayCards,
		loading: (state) => state.loading,
		tools: (state) => state.tools,
	},
};
