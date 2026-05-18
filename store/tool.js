// store/tool/index.js

const API_HEADERS = {
	headers: { 'ngrok-skip-browser-warning': '69420' },
};

function buildQuery(state) {
	let query = '';

	if (state.visibleCategories.length > 0) {
		query += '&searchIn=' + state.visibleCategories.join(',');
	}
	if (state.filters.source.length > 0 && state.filters.source.length < 8) {
		query += '&source=' + state.filters.source.join(',');
	}
	if (state.filters.type.length > 0 && state.filters.type.length < 9) {
		query += '&type=' + state.filters.type.join(',');
	}
	if (state.filters.license.length > 0) {
		query += '&license=' + state.filters.license.join(',');
	}
	if (state.filters.tags.length > 0) {
		query += '&tags=' + state.filters.tags.join(',');
	}
	if (state.filters.topics.length > 0) {
		query += '&topics=' + state.filters.topics.join(',');
	}
	if (state.filters.operations.length > 0) {
		query += '&operations=' + state.filters.operations.join(',');
	}
	if (state.filters.inputFormat.length > 0) {
		query += '&input_format=' + state.filters.inputFormat.join(',');
	}
	if (state.filters.outputFormat.length > 0) {
		query += '&output_format=' + state.filters.outputFormat.join(',');
	}

	return query;
}

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
				source: [],
				type: [],
				topics: [],
				operations: [],
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
			commit('updateFilters', payload);
		},
		restoreFilters({ commit }) {
			commit('restoreFilters');
		},

		async initialSearch({ commit }, q) {
			commit('updateLoadingInitialSearch', true);
			commit('updateTools', []);

			try {
				let result;
				if (!q) {
					result = await this.$observatory.$get('/initial-search', API_HEADERS);
				} else {
					result = await this.$observatory.$get(
						`/search?page=0&q=${q}&searchIn=name,label,description,topics,operations,publication_title,publication_abstract`,
						API_HEADERS
					);
				}

				commit('updateTools', result.tools);
				if (result.counts) commit('updateCounts', result.counts);
				if (result.stats) commit('updateStats', result.stats);
				if (result.total_tools) commit('updateTotalTools', result.total_tools);
			} catch (error) {
				console.error('❌ initialSearch error:', error);
			} finally {
				commit('updateLoadingInitialSearch', false);
			}
		},

		async searchTools({ commit, state }) {
			commit('updateLoadingSearch', true);
			commit('updateTools', []);

			try {
				const query = buildQuery(state);
				commit('updateQuery', query);

				const result = await this.$observatory.$get(
					`/search?page=0&q=${state.searchedTerm}${query}`,
					API_HEADERS
				);

				commit('updateTools', result.tools);
				commit('updateCounts', result.counts);
				commit('updateStatsAfterFilter', result.stats);
				commit('updateTotalTools', result.total_tools);
			} catch (error) {
				console.error('❌ searchTools error:', error);
			} finally {
				commit('updateLoadingSearch', false);
			}
		},

		updateVisibleCategories({ commit }, value) {
			commit('updateVisibleCategories', value);
		},

		async loadMoreTools({ commit, state }, page) {
			commit('updateLoadingLoadMore', true);

			try {
				const result = await this.$observatory.$get(
					`/search?page=${page}&q=${state.searchedTerm}${state.query}`,
					API_HEADERS
				);

				commit('updateTools', state.tools.concat(result.tools));
				commit('updateTotalTools', result.total_tools);
			} catch (error) {
				console.error('❌ loadMoreTools error:', error);
			} finally {
				commit('updateLoadingLoadMore', false);
			}
		},

		async getEDAMTerms({ commit }) {
			try {
				const response = await this.$observatory.$get('edam/EDAMTerms');
				commit('updateEDAMTerms', response);
			} catch (error) {
				console.error('❌ getEDAMTerms error:', error);
			}
		},
	},
	mutations: {
		restoreFilters(state) {
			state.filters = {
				source: [],
				type: [],
				topics: [],
				operations: [],
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
		updatePage(state, value) {
			state.page = value;
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
		updateStatsAfterFilter(state, value) {
			for (const key in state.stats) {
				for (const field in state.stats[key]) {
					if (value[key] && value[key][field]) {
						state.stats[key][field] = value[key][field];
					} else {
						state.stats[key][field] = 0;
					}
				}
			}
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
		page: (state) => state.page,
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
