function availabilityItems(payload) {
	const items =
		payload?.data ||
		payload?.results ||
		payload?.items ||
		payload?.availability ||
		payload;

	return Array.isArray(items) ? items : [];
}

const LEGACY_GALAXY_FREIBURG_HOST = 'galaxy.bi.uni-freiburg.de';

// The Freiburg Galaxy server moved to usegalaxy.eu. Rewrite legacy links such as
// https://galaxy.bi.uni-freiburg.de/tool_runner?tool_id=toolshed.g2.bx.psu.edu/repos/rnateam/intarna/intarna/2.2.0
// to https://usegalaxy.eu/root?tool_id=intarna
function fixGalaxyFreiburgUrl(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return url;
	}
	if (parsed.hostname.toLowerCase() !== LEGACY_GALAXY_FREIBURG_HOST) return url;

	const toolId = parsed.searchParams.get('tool_id');
	if (!toolId) return 'https://usegalaxy.eu/';

	// Toolshed ids look like <toolshed>/repos/<owner>/<repo>/<tool_id>/<version>
	const segments = toolId.split('/').filter(Boolean);
	const reposIndex = segments.indexOf('repos');
	const shortId =
		reposIndex !== -1 && segments.length > reposIndex + 3
			? segments[reposIndex + 3]
			: toolId;

	return `https://usegalaxy.eu/root?tool_id=${encodeURIComponent(shortId)}`;
}

function normalizeTool(tool) {
	if (!tool || !Array.isArray(tool.webpage)) return tool;
	return {
		...tool,
		webpage: tool.webpage.map((w) =>
			w?.term ? { ...w, term: fixGalaxyFreiburgUrl(w.term) } : w
		),
	};
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
				// Prefer fetching by id if available, fall back to name.
				// `documentation_status` adds URL availability to documentation
				// items so the entry page can hide broken links.
				const query = payload.id
					? `/tools?id=${payload.id}&documentation_status=true`
					: `/tools?name=${payload.name}&documentation_status=true`;
				const { data } = await this.$observatory.get(query);
				// Treat an empty array / missing payload / object lacking a label
				// (the field the entry page relies on) as "tool not found".
				const tool = Array.isArray(data) ? data[0] : data;
				if (!tool || !tool.label) {
					commit('updateTool', {});
					return false;
				}
				commit(
					'updateTool',
					Array.isArray(data) ? data.map(normalizeTool) : normalizeTool(data)
				);
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

		async resolveToolId(_ctx, { name, source = 'biotools' }) {
			try {
				const { data } = await this.$observatory.get(
					`/tool/id?name=${encodeURIComponent(name)}&source=${source}`
				);
				return data?.id || null;
			} catch (e) {
				// Not found / network error → caller falls back to 404.
				return null;
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

		// Resolve the latest uptime status of each webpage using the week range.
		// Returns a map { [url]: 'UP' | 'DOWN' | 'NODATA' | 'ERROR' }.
		async retrieveWebAvailabilityStatuses(_, webpages) {
			const entries = await Promise.all(
				(webpages || []).filter(Boolean).map(async (webpage) => {
					try {
						const { data } = await this.$observatory.post(
							'/web-availability/week',
							{ url: webpage }
						);
						const items = availabilityItems(data);
						if (!items.length) return [webpage, 'NODATA'];
						const latest = items.reduce((a, b) =>
							new Date(b.date) > new Date(a.date) ? b : a
						);
						if (latest?.code == null) return [webpage, 'NODATA'];
						const up = latest.code >= 200 && latest.code < 400;
						return [webpage, up ? 'UP' : 'DOWN'];
					} catch (error) {
						const is404 = error?.response?.status === 404;
						return [webpage, is404 ? 'NODATA' : 'ERROR'];
					}
				})
			);
			return Object.fromEntries(entries);
		},

		updateEdamDialog({ commit }, payload) {
			commit('updateEdamDialog', payload);
		},

		async fetchCitations({ commit, state }, { doi, pmid, title }) {
			const key = doi || pmid || title;
			if (!key) return;
			if (key in state.citations) return;

			commit('updateLoadingCitations', { doi: key, value: true });

			const attempts = [
				doi ? { doi } : null,
				pmid ? { pmid } : null,
				title ? { title } : null,
			].filter(Boolean);

			let data = null;
			for (const body of attempts) {
				try {
					const response = await this.$observatory.post(
						'/publication/citations',
						body
					);
					data = response.data;
					break; // éxito, no seguir intentando
				} catch (e) {
					// este identificador falló, probar el siguiente
				}
			}

			commit('updateCitations', { doi: key, data });
			commit('updateLoadingCitations', { doi: key, value: false });
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
