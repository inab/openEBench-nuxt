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
		};
	},
	actions: {
		async retrieveTool({ commit }, payload) {
			commit('updateLoading', true);
			commit('resetWebAvailability');
			const { data } = await this.$observatory.get(
				`/tools?name=${payload.name}`
			);

			commit('updateTool', data);
			commit('updateLoading', false);
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
								try {
									const { data } = await this.$observatory.post(endpoint, {
										url: webpage,
									});

									return { key, data, error: null };
								} catch (error) {
									return { key, data: [], error };
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
	},
};
