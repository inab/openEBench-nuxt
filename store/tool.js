export default {
	namespaced: true,
	state: () => {
		return {
			searchedTerm: '',
			query: '',
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
				source: [
					'biotools',
					'bioconda_recipes',
					'bioconductor',
					'galaxy',
					'toolshed',
					'github',
					'sourceforge',
					'bitbucket',
				],
				type: [
					'cmd',
					'app',
					'web',
					'lib',
					'api',
					'db',
					'workflow',
					'suite',
					'other',
				],
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

		async searchTools({ commit, state }) {
			commit('updateLoadingSearch', true);

			let query = '';

			// Add filters to query

			// 'Search In' Categories
			if (
				state.visibleCategories.length > 0 &&
				state.visibleCategories.length < 7
			) {
				query += '&searchIn=';
				for (const category of state.visibleCategories) {
					query += category + ',';
				}
				query = query.slice(0, -1);
			}

			// 'Source' Filters
			if (state.filters.source.length > 0 && state.filters.source.length < 8) {
				query += '&source=';
				for (const source of state.filters.source) {
					query += source + ',';
				}
				query = query.slice(0, -1);
			}

			// 'Type' Filters
			if (state.filters.type.length > 0 && state.filters.type.length < 9) {
				query += '&type=';
				for (const type of state.filters.type) {
					query += type + ',';
				}
				query = query.slice(0, -1);
			}

			commit('updateQuery', query);

			const result = await this.$observatory.$get(
				'/search?page=0&q=' + state.searchedTerm + query
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
				'/search?page=' + page + '&q=' + q + state.query
			);

			const newTools = state.tools.concat(result.tools);
			commit('updateTools', newTools);
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
		updateQuery(state, value) {
			state.query = value;
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
