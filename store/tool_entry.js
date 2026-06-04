function availabilityItems(payload) {
	const items =
		payload?.data ||
		payload?.results ||
		payload?.items ||
		payload?.availability ||
		payload;

	return Array.isArray(items) ? items : [];
}

export default {
	namespaced: true,
	state: () => {
		return {
			tool: {},
			loading: true,
			edamDialog: false,
			webAvailabilityRequestKey: '',
			webAvailabilityUrl: '',
			webAvailability: {
				week: [],
				month: [],
				sixMonths: [],
			},
			webAvailabilityLoading: false,
			webAvailabilityError: null,
			webAvailabilityNoData: false,
			citations: {},
			loadingCitations: {},
			similarTools: [],
			loadingSimilar: false,
		};
	},
	actions: {
		async retrieveTool({ commit }, payload) {
			commit('updateLoading', true);
			commit('resetWebAvailability');
			commit('updateSimilarTools', []);
			try {
				// Prefer fetching by id if available, fall back to name
				const query = payload.id
					? `/tools?id=${payload.id}`
					: `/tools?name=${payload.name}`;
				const { data } = await this.$observatory.get(query);
				// Treat an empty array / missing payload / object lacking a label
				// (the field the entry page relies on) as "tool not found".
				const tool = Array.isArray(data) ? data[0] : data;
				if (!tool || !tool.label) {
					commit('updateTool', {});
					return false;
				}
				commit('updateTool', data);
				return true;
			} catch (error) {
				commit('updateTool', {});
				if (error?.response?.status === 404) {
					return false;
				}
				// Surface genuine (non-404) errors instead of swallowing them.
				throw error;
			} finally {
				commit('updateLoading', false);
			}
		},

		async retrieveSimilarTools({ commit }, toolId) {
			if (!toolId) {
				commit('updateSimilarTools', []);
				return;
			}
			commit('updateLoadingSimilar', true);
			try {
				const { data } = await this.$observatory.get(
					`/similarity?tool_id=${toolId}`
				);
				commit('updateSimilarTools', data.similar || []);
			} catch (e) {
				commit('updateSimilarTools', []);
			} finally {
				commit('updateLoadingSimilar', false);
			}
		},

		async retrieveWebAvailability({ state, commit }, webpages) {
			const webpageList = (
				Array.isArray(webpages) ? webpages : [webpages]
			).filter(Boolean);

			if (!webpageList.length) {
				commit('resetWebAvailability');
				return;
			}

			const requestKey = webpageList.join('|');
			const ranges = [
				{ key: 'week', endpoint: '/web-availability/week' },
				{ key: 'month', endpoint: '/web-availability/month' },
				{ key: 'sixMonths', endpoint: '/web-availability/6months' },
			];

			commit('resetWebAvailability');
			commit('updateWebAvailabilityRequestKey', requestKey);
			commit('updateWebAvailabilityLoading', true);

			try {
				const resultsByWebpage = await Promise.all(
					webpageList.map(async (webpage) => {
						const results = await Promise.all(
							ranges.map(async ({ key, endpoint }) => {
								// In the store — inside ranges.map
								try {
									const { data } = await this.$observatory.post(endpoint, {
										url: webpage,
									});
									console.log(
										`[availability] ✅ ${endpoint} | ${webpage}`,
										data
									);
									return { key, data, error: null };
								} catch (error) {
									const is404 = error?.response?.status === 404;
									if (!is404) {
										console.error(
											`[availability] ❌ ${endpoint} | ${webpage}`,
											error?.response?.status,
											error?.response?.data,
											error?.message
										);
									} else {
										console.log(
											`[availability] ⚪ ${endpoint} | ${webpage} — not monitored`
										);
									}
									// 404 = not in collection = no data, not an error
									return { key, data: [], error: is404 ? null : error };
								}
							})
						);

						return { webpage, results };
					})
				);

				if (state.webAvailabilityRequestKey !== requestKey) {
					return;
				}

				const selected = resultsByWebpage.find(({ results }) => {
					return results.some(({ data }) => {
						return availabilityItems(data).length > 0;
					});
				});

				if (selected) {
					commit('updateWebAvailabilityUrl', selected.webpage);
					selected.results.forEach(({ key, data }) => {
						commit('updateWebAvailabilityRange', { key, data });
					});
					return;
				}

				const allFailed = resultsByWebpage.every(({ results }) => {
					return results.every(({ error }) => error);
				});

				commit('updateWebAvailabilityNoData', true);
				if (allFailed) {
					commit(
						'updateWebAvailabilityError',
						new Error('Unable to retrieve uptime data')
					);
				}
			} catch (error) {
				commit('updateWebAvailabilityError', error);
			} finally {
				if (state.webAvailabilityRequestKey === requestKey) {
					commit('updateWebAvailabilityLoading', false);
				}
			}
		},

		updateEdamDialog({ commit }, payload) {
			commit('updateEdamDialog', payload);
		},

		async fetchCitations({ commit, state }, { doi, pmid, title }) {
			// Determinar qué identificador usar y cuál es la clave para el estado
			const key = doi || pmid || title;
			if (!key) return;
			if (key in state.citations) return; // ya lo tenemos

			// Construir el body con solo el identificador disponible
			const body = doi ? { doi } : pmid ? { pmid } : { title };

			commit('updateLoadingCitations', { doi: key, value: true });
			try {
				const { data } = await this.$observatory.post(
					'/publication/citations',
					body
				);
				commit('updateCitations', { doi: key, data });
			} catch (e) {
				commit('updateCitations', { doi: key, data: null });
			} finally {
				commit('updateLoadingCitations', { doi: key, value: false });
			}
		},
	},
	mutations: {
		updateTool(state, payload) {
			state.tool = payload;
		},
		updateLoading(state, payload) {
			state.loading = payload;
		},
		updateEdamDialog(state, payload) {
			state.edamDialog = payload;
		},
		updateWebAvailabilityRequestKey(state, payload) {
			state.webAvailabilityRequestKey = payload;
		},
		updateWebAvailabilityUrl(state, payload) {
			state.webAvailabilityUrl = payload;
		},
		updateWebAvailabilityRange(state, { key, data }) {
			state.webAvailability[key] = data;
		},
		updateWebAvailabilityLoading(state, payload) {
			state.webAvailabilityLoading = payload;
		},
		updateWebAvailabilityError(state, payload) {
			state.webAvailabilityError = payload;
		},
		updateWebAvailabilityNoData(state, payload) {
			state.webAvailabilityNoData = payload;
		},
		resetWebAvailability(state) {
			state.webAvailabilityRequestKey = '';
			state.webAvailabilityUrl = '';
			state.webAvailability = {
				week: [],
				month: [],
				sixMonths: [],
			};
			state.webAvailabilityLoading = false;
			state.webAvailabilityError = null;
			state.webAvailabilityNoData = false;
		},
		updateCitations(state, { doi, data }) {
			state.citations = { ...state.citations, [doi]: data };
		},
		updateLoadingCitations(state, { doi, value }) {
			state.loadingCitations = { ...state.loadingCitations, [doi]: value };
		},
		updateSimilarTools(state, payload) {
			state.similarTools = payload;
		},
		updateLoadingSimilar(state, payload) {
			state.loadingSimilar = payload;
		},
	},
	getters: {
		tool(state) {
			return state.tool;
		},
		loading(state) {
			return state.loading;
		},
		edamDialog(state) {
			return state.edamDialog;
		},
		webAvailability(state) {
			return state.webAvailability;
		},
		webAvailabilityUrl(state) {
			return state.webAvailabilityUrl;
		},
		webAvailabilityLoading(state) {
			return state.webAvailabilityLoading;
		},
		webAvailabilityError(state) {
			return state.webAvailabilityError;
		},
		webAvailabilityNoData(state) {
			return state.webAvailabilityNoData;
		},
		citations(state) {
			return state.citations;
		},
		loadingCitations(state) {
			return state.loadingCitations;
		},
		similarTools(state) {
			return state.similarTools;
		},
		loadingSimilar(state) {
			return state.loadingSimilar;
		},
	},
};
