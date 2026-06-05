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
		query += '&topic=' + state.filters.topics.join(',');
	}
	if (state.filters.operations.length > 0) {
		query += '&operation=' + state.filters.operations.join(',');
	}
	if (state.filters.inputFormat.length > 0) {
		query += '&input_format=' + state.filters.inputFormat.join(',');
	}
	if (state.filters.outputFormat.length > 0) {
		query += '&output_format=' + state.filters.outputFormat.join(',');
	}

	return query;
}

function normalizeTool(tool) {
	// handles arrays, null, undefined — but preserves 0
	const pick = (val) => {
		const v = Array.isArray(val) ? val[0] : val;
		return v != null ? v : '';
	};

	const fairsoft = tool.fairsoft || {};

	// safely parse a score — handles undefined, null, NaN, strings
	const score = (val) => {
		const n = parseFloat(val);
		return isNaN(n) ? 0 : n;
	};

	return {
		id: tool.id || '',
		name: pick(tool.name) || '',
		subname: pick(tool.name) || '',
		label: pick(tool.label) || pick(tool.name) || '',
		type: tool.type || [],
		description: pick(tool.description) || '',
		topics: tool.topics || [],
		operations: tool.operations || [],
		sourcesLabels: tool.sources_labels || {},
		publications: tool.publication || [],
		license: tool.license || [],
		webpage: pick(tool.webpage) || pick(tool.homepage) || '',
		documentation: tool.documentation || [],
		findability: score(fairsoft.F),
		accessibility: score(fairsoft.A),
		interoperability: score(fairsoft.I),
		reusability: score(fairsoft.R),
	};
}

export default {
	namespaced: true,
	state: () => {
		return {
			searchedTerm: '',
			query: '',
			page: 0,
			toolsDisplayCards: false,
			loading: {
				initialSearch: false,
				search: false,
				loadMore: false,
			},
			tools: [],
			counts: {},
			visibleCategories: ['name', 'description', 'topics', 'operations'],
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
			totalToolsGlobal: 0,
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

		// Generic cached GET — vuex-cache keys on the URL, so repeating the same
		// request (same q + filters + page) returns the cached response instead
		// of re-fetching. Mirrors the pattern in store/observatory/*.
		async GET_URL(_ctx, url) {
			return await this.$observatory.$get(url, API_HEADERS);
		},

		async initialSearch({ commit, state }, q) {
			commit('updateLoadingInitialSearch', true);
			commit('updateTools', []);
			commit('updatePage', 0);

			try {
				let result;
				if (!q) {
					result = await this.cache.dispatch('tool/GET_URL', '/initial-search');
				} else {
					// Honor the selected search scope (and any active filters)
					// on the first search, same as subsequent searches.
					const query = buildQuery(state);
					result = await this.cache.dispatch(
						'tool/GET_URL',
						`/search?page=0&q=${q}${query}`
					);
				}

				// ✅ normalize regardless of which branch was taken
				const tools = result.tools || result.data || [];
				commit('updateTools', tools.map(normalizeTool));

				if (result.counts) commit('updateCounts', result.counts);
				if (result.stats) commit('updateStats', result.stats);

				const total = result.totalTools || result.total_tools;
				if (total) commit('updateTotalTools', total);
			} catch (error) {
				console.error('❌ initialSearch error:', error);
			} finally {
				commit('updateLoadingInitialSearch', false);
			}
		},

		async fetchTotalTools({ commit }) {
			try {
				const result = await this.$observatory.$get(
					'/stats/tools/count_total',
					API_HEADERS
				);
				if (result?.[0]?.data) commit('updateTotalToolsGlobal', result[0].data);
			} catch (error) {
				console.error('❌ fetchTotalTools error:', error);
			}
		},

		async searchTools({ commit, state }) {
			commit('updateLoadingSearch', true);
			commit('updateTools', []);
			commit('updatePage', 0);

			try {
				const query = buildQuery(state);
				commit('updateQuery', query);

				const result = await this.cache.dispatch(
					'tool/GET_URL',
					`/search?page=0&q=${state.searchedTerm}${query}`
				);

				const normalized = (result.tools || []).map(normalizeTool);
				commit('updateTools', normalized);
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
			if (state.loading.loadMore) return;
			commit('updateLoadingLoadMore', true);
			const nextPage = page || state.page + 1;

			try {
				// ✅ use the same endpoint initialSearch used when there's no search term
				const url = state.searchedTerm
					? `/search?page=${nextPage}&q=${state.searchedTerm}${state.query}`
					: `/initial-search?page=${nextPage}`;

				const result = await this.cache.dispatch('tool/GET_URL', url);

				const tools = result.tools || result.data || [];
				const normalized = tools.map(normalizeTool);

				commit('updateTools', state.tools.concat(normalized));
				commit('updateTotalTools', result.total_tools || result.totalTools);
				commit('updatePage', nextPage);
			} catch (error) {
				console.error('❌ loadMoreTools error:', error);
			} finally {
				commit('updateLoadingLoadMore', false);
			}
		},

		async getEDAMTerms({ commit }) {
			try {
				const response = await this.cache.dispatch(
					'tool/GET_URL',
					'edam/EDAMTerms'
				);
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
			state.tools = value || [];
		},
		updateStats(state, value) {
			// Clone so the in-place mutations in updateStatsAfterFilter never touch
			// the (now cached) response object that this value may reference.
			state.stats = value ? JSON.parse(JSON.stringify(value)) : value;
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
		updateTotalToolsGlobal(state, value) {
			state.totalToolsGlobal = value;
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
		totalToolsGlobal: (state) => state.totalToolsGlobal,
		filters: (state) => state.filters,
		visibleCategories: (state) => state.visibleCategories,
		EDAMFormats: (state) => state.EDAMTerms.format,
		EDAMOperations: (state) => state.EDAMTerms.operation,
		EDAMTopics: (state) => state.EDAMTerms.topic,
		EDAMTypes: (state) => state.EDAMTerms.datatype,
	},
};
