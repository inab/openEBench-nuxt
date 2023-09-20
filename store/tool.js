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
				source: [],
				type: [],
				topics: [],
				operation: [],
				license: [],
				tags: [],
				inputFormat: [],
				outputFormat: [],
			},
			stats: {},
			totalTools: 0,
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

		updateFilters({ commit }, payload) {
			// This function is called whenever the user clicks on a checkbox in Filters
			// component to add/remove a filter.
			// The payload is an object with the filter property and values.
			commit('updateFilters', payload);
		},

		restoreFilters({ commit }) {
			commit('restoreFilters');
		},

		async initialSearch({ commit }, q) {
			commit('updateLoadingInitialSearch', true);
			const result = await this.$observatory.$get('/search?page=0&q=' + q, {
				headers: {
					'ngrok-skip-browser-warning': '69420',
				},
			});

			commit('updateTools', result.tools);
			commit('updateCounts', result.counts);
			commit('updateStats', result.stats);
			commit('updateTotalTools', result.total_tools);

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

			// 'License' Filters
			if (state.filters.license.length > 0) {
				query += '&license=';
				for (const license of state.filters.license) {
					query += license + ',';
				}
				query = query.slice(0, -1);
			}
			// 'Tags' Filters
			if (state.filters.tags.length > 0) {
				query += '&tags=';
				for (const tag of state.filters.tags) {
					query += tag + ',';
				}
				query = query.slice(0, -1);
			}

			// 'Topics' Filters
			if (state.filters.topics.length > 0) {
				query += '&topics=';
				for (const topic of state.filters.topics) {
					query += topic + ',';
				}
				query = query.slice(0, -1);
			}

			// 'Operation' Filters
			if (state.filters.operation.length > 0) {
				query += '&operation=';
				for (const operation of state.filters.operation) {
					query += operation + ',';
				}
				query = query.slice(0, -1);
			}

			// 'Input Format' Filters
			if (state.filters.inputFormat.length > 0) {
				query += '&input_format=';
				for (const inputFormat of state.filters.inputFormat) {
					query += inputFormat + ',';
				}
				query = query.slice(0, -1);
			}

			// 'Output Format' Filters
			if (state.filters.outputFormat.length > 0) {
				query += '&output_format=';
				for (const outputFormat of state.filters.outputFormat) {
					query += outputFormat + ',';
				}
				query = query.slice(0, -1);
			}

			commit('updateQuery', query);

			const result = await this.$observatory.$get(
				'/search?page=0&q=' + state.searchedTerm + query
			);

			commit('updateTools', result.tools);
			// commit('updateTotalTools', result.total_tools);

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
				'/search?page=' + page + '&q=' + q + state.query,
				{
					headers: {
						'ngrok-skip-browser-warning': '69420',
					},
				}
			);

			const newTools = state.tools.concat(result.tools);

			commit('updateTools', newTools);

			commit('updateTotalTools', result.total_tools);
		},

		async getEDAMTerms({ commit }) {
			// This function gets the EDAM terms from the API
			const response = await this.$observatory.$get('/EDAMTerms');

			commit('updateEDAMTerms', response);
		},
	},
	mutations: {
		restoreFilters(state) {
			state.filters = {
				// This object is used to filter the tools
				source: [],
				type: [],
				topics: [],
				operation: [],
				license: [],
				tags: [],
				inputFormat: [],
				outputFormat: [],
			};
		},
		updateFilters(state, payload) {
			state.filters[payload.property] = payload.values;
		},
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
		updateStats(state, value) {
			state.stats = value;
		},
		updateCounts(state, value) {
			state.counts = value;
		},
		updateTotalTools(state, value) {
			state.totalTools = value;
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
		stats: (state) => state.stats,
		counts: (state) => state.counts,
		totalTools: (state) => state.totalTools,
		filters: (state) => state.filters,
		visibleCategories: (state) => state.visibleCategories,
		EDAMFormats: (state) => state.EDAMTerms.format,
		EDAMOperations: (state) => state.EDAMTerms.operation,
		EDAMTopics: (state) => state.EDAMTerms.topic,
		EDAMTypes: (state) => state.EDAMTerms.datatype,
	},
};
