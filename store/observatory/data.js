// state
export const state = () => ({
	_countsPerSource: {},
	_totalCount: null,
	_features: {},
	_featuresControl: {},
	_featuresLabels: [],
	_coverageSources: {
		counts: {},
		counts_cummulative: {},
	},
	_completeness: {
		cummulative_features: {},
		distribution_features: {},
	},
	_completenessControl: {
		cummulative_features: {},
		distribution_features: {},
	},
	_types: {},
	_typesControl: {},
	_unLoaded: {
		countsPerSource: true,
		totalCount: true,
		features: true,
		coverageSources: true,
		completeness: true,
		types: true,
	},
});

// Getters
export const getters = {
	CountsPerSource(state) {
		return state._countsPerSource;
	},
	TotalCount(state) {
		return state._totalCount;
	},
	Features(state) {
		return state._features;
	},
	FeaturesControl(state) {
		return state._featuresControl;
	},
	FeaturesLabels(state) {
		return state._featuresLabels;
	},
	CoverageSources(state) {
		return state._coverageSources;
	},
	Completeness(state) {
		return state._completeness;
	},
	CompletenessControl(state) {
		return state._completenessControl;
	},
	Types(state) {
		return state._types;
	},
	TypesControl(state) {
		return state._typesControl;
	},
};

const BASE_URL = '/stats/tools/';
// Actions
export const actions = {
	async getCountsPerSource({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'count_per_source?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { countsPerSource: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);
		const nonZeroSources = result.filter((element) => element.count > 0);

		commit('setCountsPerSource', nonZeroSources);
		commit('setLoaded', { countsPerSource: false });
	},

	async GET_URL({ _commit }, URL) {
		const result = await this.$observatory.get(URL);
		return result.data.data;
	},

	async getTotalCount({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'count_total?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { totalCount: true });

		const result = await this.$observatory.get(URL);
		console.log('result', result);

		commit('setTotalCount', result.data[0].data);
		commit('setLoaded', { totalCount: false });
	},

	async getFeatures({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'features?collection=' +
			rootState.observatory._currentCollection;

		const URLLabels = BASE_URL + 'features_dots';

		const URLControl = BASE_URL + 'features?collection=tools';

		commit('setLoaded', { features: true });

		const resultLabels = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLLabels
		);
		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		const resultControl = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLControl
		);

		commit('setFeatures', result);
		commit('setFeaturesLabels', resultLabels);
		commit('setFeaturesControl', resultControl);
		commit('setLoaded', { features: false });
	},

	async getCoverageSources({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'coverage_sources?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { coverageSources: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setCoverageSources', result);
		commit('setLoaded', { coverageSources: false });
	},

	async getCompleteness({ commit, _state, rootState }) {
		// This plot uses two serires of data, one for the histogram and one for the line (cummulative distribution)
		const URLCummulativeFeatures =
			BASE_URL +
			'features_cummulative?collection=' +
			rootState.observatory._currentCollection;
		const URLDistributionFeatures =
			BASE_URL +
			'distribution_features?collection=' +
			rootState.observatory._currentCollection;

		const URLCummulativeFeaturesControl =
			BASE_URL + 'features_cummulative?collection=tools';
		const URLDistributionFeaturesControl =
			BASE_URL + 'distribution_features?collection=tools';

		commit('setLoaded', { completeness: true });

		const resultCummulativeFeaturesControl = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLCummulativeFeaturesControl
		);
		const resultDistributionFeaturesControl = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLDistributionFeaturesControl
		);

		commit('setCompletenessControl', {
			cummulative_features: resultCummulativeFeaturesControl,
			distribution_features: resultDistributionFeaturesControl,
		});

		const resultCummulativeFeatures = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLCummulativeFeatures
		);
		const resultDistributionFeatures = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLDistributionFeatures
		);

		commit('setCompleteness', {
			cummulative_features: resultCummulativeFeatures,
			distribution_features: resultDistributionFeatures,
		});

		commit('setLoaded', { completeness: false });
	},

	async getTypes({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'types_count?collection=' +
			rootState.observatory._currentCollection;

		const URLControl = BASE_URL + 'types_count?collection=tools';

		commit('setLoaded', { types: true });

		const resultControl = await this.cache.dispatch(
			'observatory/trends/GET_URL',
			URLControl
		);

		commit('setTypesControl', resultControl);

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setTypes', result);
		commit('setLoaded', { types: false });
	},
};

// Mutaciones
export const mutations = {
	setLoaded(state, loading) {
		state._unLoaded[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
	},

	setCountsPerSource(state, counts) {
		state._countsPerSource = counts;
	},
	setTotalCount(state, count) {
		console.log('adding counts', count, 'to state');
		state._totalCount = count;
	},
	setFeatures(state, features) {
		state._features = features;
	},
	setFeaturesControl(state, features) {
		state._featuresControl = features;
	},
	setFeaturesLabels(state, features) {
		state._featuresLabels = features;
	},
	setCoverageSources(state, sources) {
		state._coverageSources = sources;
	},
	setCompleteness(state, completeness) {
		state._completeness = completeness;
	},
	setCompletenessControl(state, completeness) {
		state._completenessControl = completeness;
	},
	setTypes(state, types) {
		state._types = types;
	},
	setTypesControl(state, types) {
		state._typesControl = types;
	},
};
