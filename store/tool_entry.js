export default {
	namespaced: true,
	state: () => {
		return {
			tool: {},
			loading: true,
			edamDialog: false,
			citations: {},
			loadingCitations: {},
		};
	},
	actions: {
		async retrieveTool({ commit }, payload) {
			console.log(payload.name);
			commit('updateLoading', true);
			const { data } = await this.$observatory.get(
				`/tools?name=${payload.name}`
			);
			commit('updateTool', data);
			commit('updateLoading', false);
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
		updateCitations(state, { doi, data }) {
			state.citations = { ...state.citations, [doi]: data };
		},
		updateLoadingCitations(state, { doi, value }) {
			state.loadingCitations = { ...state.loadingCitations, [doi]: value };
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
		citations(state) {
			return state.citations;
		},
		loadingCitations(state) {
			return state.loadingCitations;
		},
	},
};
