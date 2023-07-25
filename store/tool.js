export default {
	namespaced: true,
	state: () => {
		return {
			searchedTerm: '',
			toolsDisplayCards: false,
			loading: {
				initialSearch: false,
				search: false,
				loadMore: false,
			},
			tools: [],
			counts: {},
			visibleCategories: [
				'name',
				'description',
				'topics',
				'operations',
				'publication_title',
				'publication_abstract',
			],
			EDAMTerms: [],
			filters: {
				// This object is used to filter the tools
				source: [],
				type: [],
				topics: [],
				operation: [],
				license: [],
			},
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
		updateInitialSearch({ commit }, value) {
			commit('updateInitialSearch', value);
		},
		updateLoadingLoadMore({ commit }, value) {
			commit('updateLoadingLoadMore', value);
		},

		async initialSearch({ commit }, q) {
			commit('updateLoadingInitialSearch', true);
			const result = await this.$observatory.$get('/search?page=0&q=' + q);

			commit('updateTools', result.tools);

			commit('updateCounts', result.counts);

			commit('updateLoadingInitialSearch', false);
		},

		async searchTools({ commit }, q) {
			commit('updateLoadingSearch', true);

			let query = '';
			if (state.visibleCategories) {
				query += '&categories=';
				for (const category of state.visibleCategories) {
					query += category + ',';
				}
				query = query.slice(0, -1);
			}

			const result = await this.$observatory.$get(
				'/search?page=0&q=' + q + query
			);

			commit('updateTools', result.tools);

			commit('updateLoadingSearch', false);
		},

		updateVisibleCategories({ commit }, value) {
			/* This function is called whenever the user clicks on a chip in SearchCategory
			/  component to hide/show tools found in that category.
			/  The value is the visible categories.
			*/

			commit('updateVisibleCategories', value);
		},

		async loadMoreTools({ commit, state }, page) {
			// This function loads more tools from the API
			const q = state.searchedTerm;
			const result = await this.$observatory.$get(
				'/search?page=' + page + '&q=' + q
			);

			const newTools = state.tools.concat(result.tools);
			commit('updateTools', newTools);
			commit('updateCounts', result.counts);
		},

		async getEDAMTerms({ commit }) {
			// This function gets the EDAM terms from the API
			const response = await this.$observatory.$get('/EDAMTerms');

			commit('updateEDAMTerms', response);
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
		updateLoadingInitialSearch(state, value) {
			state.loading.initialSearch = value;
		},
		updateLoadingLoadMore(state, value) {
			state.loading.loadMore = value;
		},
		updateTools(state, value) {
			state.tools = value;
		},
		updateCounts(state, value) {
			state.counts = value;
		},
		updateVisibleCategories(state, value) {
			state.visibleCategories = value;
		},
		updateEDAMTerms(state, value) {
			state.EDAMTerms = value;
		},
	},
	getters: {
		searchedTerm: (state) => state.searchedTerm,
		toolsDisplayCards: (state) => state.toolsDisplayCards,
		loading: (state) => state.loading,
		tools: (state) => state.tools,
		counts: (state) => state.counts,
		visibleCategories: (state) => state.visibleCategories,
		EDAMFormats: (state) => state.EDAMTerms.format,
		EDAMOperations: (state) => state.EDAMTerms.operation,
		EDAMTopics: (state) => state.EDAMTerms.topic,
		EDAMTypes: (state) => state.EDAMTerms.datatype,
	},
};
