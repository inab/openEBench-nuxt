// state
export const state = () => ({
	_FAIRIndicatorsTool: null, // to results.js
	_FAIRIndicatorsControl: null, // to results.js
	_LoadingEvaluation: false, // remains in index.js
});

// getters
export const getters = {
	getFAIRIndicatorsTool(state) {
		// to results.js
		return state._FAIRIndicatorsTool;
	},
	getFAIRIndicatorsControl(state) {
		// to results.js
		return state._FAIRIndicatorsControl;
	},
	getLoadingEvaluation(state) {
		return state._LoadingEvaluation;
	},
};

// actions
export const actions = {
	async evaluateToolById({ commit, _state }, tooId) {
		const URL = '/fair/evaluateId';

		commit('setLoading', { evaluation: true });

		const data = { id: tooId };

		const result = await this.dispatch(
			'observatory/evaluation/results/POST_EV_ID',
			{ url: URL, data }
		);

		commit('setFAIRIndicatorsTool', result);
		console.log(result);
		commit('setLoading', { evaluation: false });
	},

	async evaluateToolByMetadata({ commit, _state }, toolMetadata) {
		const URL = '/fair/evaluate';

		commit('setLoading', { evaluation: true });

		const payload = {
			request_url: URL,
			data: {
				tool_metadata: toolMetadata,
			},
		};

		const result = await this.dispatch(
			'observatory/evaluation/results/POST_DATA',
			payload
		);

		commit('setFAIRIndicatorsTool', result);
		commit('setLoading', { evaluation: false });
	},

	async getFAIRIndicatorsControl({ commit, _state }) {
		const URL = '/stats/tools/fair_scores_means';

		const result = await this.cache.dispatch(
			'observatory/evaluation/results/GET_URL',
			URL
		);

		commit('setFAIRIndicatorsControl', result);
	},

	async GET_URL({ _commit, _state }, URL) {
		const result = await this.$observatory.get(URL);
		return result.data;
	},

	async POST_DATA({ _commit, _state }, payload) {
		const result = await this.$observatory.post(
			payload.request_url,
			payload.data
		);
		return result.data;
	},

	async POST_EV_ID({ _commit, _state }, payload) {
		const result = await this.$observatory.post(payload.url, payload.data);
		return result.data;
	},
};

// mutations
export const mutations = {
	setFAIRIndicatorsTool(state, result) {
		state._FAIRIndicatorsTool = result;
	},
	setFAIRIndicatorsControl(state, result) {
		state._FAIRIndicatorsControl = result;
	},

	setLoading(state, payload) {
		state._LoadingEvaluation = payload.evaluation;
	},
};
