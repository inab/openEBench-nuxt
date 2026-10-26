/*
This is the store for the FAIR4S Evaluator's **step 2** when metadata is
imported from the Software Observatory.
These functions are mainly called from the component `observatoryInput.vue`
(in `components/evaluation/Observatory`)
*/

// state
export const state = () => ({
	_ObservatoryToolsNameTypeSources: [],
	_loadingAutocomplete: false,
	_loading: false,
	_importationResult: null, //
	_error: '', // message shown in ObservatoryInput when a request fails
});

// getters
export const getters = {
	getObservatoryToolsNameTypeSources(state) {
		return state._ObservatoryToolsNameTypeSources;
	},

	getLoadingAutocomplete(state) {
		return state._loadingAutocomplete;
	},

	getLoading(state) {
		return state._loading;
	},

	getError(state) {
		return state._error;
	},
};

// actions
export const actions = {
	async getObservatoryToolsNameTypeSources({ commit, _state }) {
		const URL = '/tools/names_type_labels';

		commit('setLoadingAutocomplete', true);
		commit('setError', '');

		try {
			const result = await this.cache.dispatch(
				'observatory/evaluation/observatory/GET_URL',
				URL
			);

			commit('setObservatoryToolsNameTypeSources', result);
		} catch (error) {
			console.error('Error fetching Observatory tools:', error);
			commit('setError', `Could not load the list of tools: ${error.message}`);
		}
		commit('setLoadingAutocomplete', false);
	},

	async fetchToolMetadata({ commit, dispatch }, payload) {
		const URL =
			'/tools?name=' +
			encodeURIComponent(payload.name) +
			'&type=' +
			encodeURIComponent(payload.type);

		commit('setLoading', true); // set loading to true to show the loading bar
		commit('setError', '');

		try {
			// do not cache this request. Otherwise, the processed metadata will be cached as well.
			let result = await this.dispatch(
				'observatory/evaluation/observatory/GET_URL',
				URL
			);

			result = await dispatch(
				'observatory/evaluation/metadata/prepareMetadata',
				result,
				{ root: true }
			);

			dispatch('observatory/evaluation/metadata/updateToolsMetadata', result, {
				root: true,
			}); // modify to use mutation in index;

			dispatch('observatory/evaluation/metadata/updateLoadedMetadata', true, {
				root: true,
			});

			dispatch('observatory/evaluation/changeStep', 3, { root: true });
		} catch (error) {
			console.error('Error fetching tool metadata:', error);
			commit(
				'setError',
				`Could not import the tool's metadata: ${error.message}`
			);
		}

		commit('setLoading', false); // set loading to false to hide the loading bar
	},

	async GET_URL({ _commit, _state }, URL) {
		const result = await this.$observatory.get(URL);
		return result.data;
	},

	updateLoading({ commit }, loading) {
		commit('setLoading', loading);
	},
};

// mutations
export const mutations = {
	setObservatoryToolsNameTypeSources(state, data) {
		state._ObservatoryToolsNameTypeSources = data;
	},

	setLoadingAutocomplete(state, data) {
		state._loadingAutocomplete = data;
	},

	setLoading(state, data) {
		state._loading = data;
	},

	setError(state, message) {
		state._error = message;
	},
};
