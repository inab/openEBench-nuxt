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
			visibleTools: [],
			counts: {},
			visibleCategories: [
				'name',
				'description',
				'topics',
				'operations',
				'publication_title',
				'publication_abstract',
			],
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

			const allTools = [];
			allTools.push(...result.tools.name);
			allTools.push(...result.tools.description);
			allTools.push(...result.tools.topics);
			allTools.push(...result.tools.operations);
			allTools.push(...result.tools.publication_title);
			allTools.push(...result.tools.publication_abstract);

			commit('updateVisibleTools', allTools);
			commit('updateCounts', result.counts);

			commit('updateLoadingSearch', false);
		},

		updateVisibleCategories({ commit }, value) {
			/* This function is called whenever the user clicks on a chip in SearchCategory
			/  component to hide/show tools found in that category.
			/  The value is the visible categories.
			*/
			commit('updateVisibleCategories', value);
		},

		updateVisibleTools({ state, commit }) {
			const newVisibleTools = [];
			for (const category of state.visibleCategories) {
				newVisibleTools.push(...this.state.tool.tools[category]);
			}
			commit('updateVisibleTools', newVisibleTools);
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
		updateVisibleTools(state, value) {
			state.visibleTools = value;
		},
		updateVisibleCategories(state, value) {
			state.visibleCategories = value;
		},
	},
	getters: {
		searchedTerm: (state) => state.searchedTerm,
		toolsDisplayCards: (state) => state.toolsDisplayCards,
		loading: (state) => state.loading,
		tools: (state) => state.tools,
		counts: (state) => state.counts,
		visibleTools: (state) => state.visibleTools,
		visibleCategories: (state) => state.visibleCategories,
	},
};
