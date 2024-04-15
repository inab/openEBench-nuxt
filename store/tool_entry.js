export default {
	namespaced: true,
	state: () => {
		return {
			tool: {},
			loading: true,
			edamDialog: false,
			uptimeWeb: null,
			uptimeVersion: null,
			uptimeWeek: {},
			uptimeMonth: {},
			uptime6Month: {},
			loadingUptime: true,
		};
	},
	actions: {
		async retrieveTool({ commit }, payload) {
			commit('updateLoading', true);
			const { data } = await this.$observatory.get(
				`/tools?name=${payload.name}&type=${payload.type}`
			);

			commit('updateTool', data);
			commit('updateLoading', false);
		},

		updateEdamDialog({ commit }, payload) {
			commit('updateEdamDialog', payload);
		},
		async retrieveUptimes({ state, commit }) {
			let date2 = new Date();
			date2 = Math.ceil(date2.getTime() / 1000);
			// date1 is 7 days ago
			let date1 = new Date();
			date1.setDate(date1.getDate() - 7);
			date1 = Math.ceil(date1.getTime() / 1000);
			// we do not know which version and web have uptime data. We try all combinations until we get a response
			// for each webpage
			let found = false;
			for (let i = 0; i < state.tool.webpage.length; i++) {
				for (let j = 0; j < state.tool.version.length; j++) {
					let webpage = state.tool.webpage[i].term;
					// we need to remove the http or https from the url
					webpage = webpage.replace('https://', '');
					webpage = webpage.replace('http://', '');
					// we need to remove the www from the url
					webpage = webpage.replace('www.', '');
					// we need to remove the last slash from the url
					webpage = webpage.replace(/\/$/, '');

					const url = `https://openebench.bsc.es/monitor/rest/homepage/biotools:${state.tool.name}:${state.tool.version[j]}/cmd/${webpage}?date1=${date1}&date2=${date2}`;

					const dataWeek = await this.$axios
						.get(url)
						.then((response) => {
							for (let i = 0; i < response.data.length; i++) {
								// we take T00:00 so it is cenetered in the day
								let date = new Date(
									response.data[i].date.split('T')[0] + 'T00:00'
								);
								date = date.setDate(date.getDate());
								response.data[i].date = date;
							}
							return response.data;
						})
						.catch((error) => {
							console.log(error); // Logs a string: Error: Request failed with status code 404
						});

					if (dataWeek) {
						commit('updateUptimeWeb', webpage);
						commit('updateUptimeVersion', state.tool.version[j]);
						commit('updateUptimeWeek', dataWeek);
						// if we have found the data we stop the loop
						found = true;
						break;
					}
				}
				if (found) {
					break;
				}
			}
			// date1 is one moth ago
			date1 = new Date();
			date1.setMonth(date1.getMonth() - 1);
			date1 = Math.ceil(date1.getTime() / 1000);

			// we know which version and web have uptime data from the previous loop.
			let url = `https://openebench.bsc.es/monitor/rest/homepage/biotools:${state.tool.name}:${state.uptimeVersion}/cmd/${state.uptimeWeb}?date1=${date1}&date2=${date2}`;

			const dataMonth = await this.$axios.get(url).then((response) => {
				console.log(response.data);
				for (let i = 0; i < response.data.length; i++) {
					const date = new Date(response.data[i].date.split('T')[0]);
					// we take the previous day because the uptime is calculated at the end of the day
					date.setDate(date.getDate() - 1);
					response.data[i].date = date;
				}
				return response.data;
			});

			commit('updateUptimeMonth', dataMonth);

			// date1 is six months ago
			date1 = new Date();
			date1.setMonth(date1.getMonth() - 6);
			date1 = Math.ceil(date1.getTime() / 1000);

			url = `https://openebench.bsc.es/monitor/rest/homepage/biotools:${state.tool.name}:${state.uptimeVersion}/cmd/${state.uptimeWeb}?date1=${date1}&date2=${date2}`;
			const data6Month = await this.$axios.get(url).then((response) => {
				for (let i = 0; i < response.data.length; i++) {
					const date = new Date(response.data[i].date.split('T')[0]);
					response.data[i].date = date;
				}
				return response.data;
			});

			commit('updateUptime6Month', data6Month);
			commit('updateLoadingUptime', false);
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
		updateUptimeWeek(state, payload) {
			state.uptimeWeek = payload;
		},
		updateUptimeMonth(state, payload) {
			state.uptimeMonth = payload;
		},
		updateUptime6Month(state, payload) {
			state.uptime6Month = payload;
		},
		updateUptimeWeb(state, payload) {
			state.uptimeWeb = payload;
		},
		updateUptimeVersion(state, payload) {
			state.uptimeVersion = payload;
		},
		updateLoadingUptime(state, payload) {
			state.loadingUptime = payload;
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
		uptimeWeek(state) {
			return state.uptimeWeek;
		},
		uptimeMonth(state) {
			return state.uptimeMonth;
		},
		uptime6Month(state) {
			return state.uptime6Month;
		},
		uptimeWeb(state) {
			return state.uptimeWeb;
		},
		uptimeVersion(state) {
			return state.uptimeVersion;
		},
		loadingUptime(state) {
			return state.loadingUptime;
		},
	},
};
