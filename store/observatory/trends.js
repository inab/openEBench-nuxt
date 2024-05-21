// state
export const state = () => ({
	_licensesSunburst: [],
	_licensesOpenSource: {
		licenses_copyleft: [],
		counts_copyleft: [],
		licenses_permissive: [],
		counts_permissive: [],
		licenses_data: [],
		counts_data: [],
	},
	_semanticVersioning: [],
	_versionControlCount: [],
	_versionControlRepositories: [],
	_publications: [],
	_unLoaded: {
		licensesSunburst: true,
		licensesOpenSource: true,
		semanticVersioning: true,
		versionControlCount: true,
		versionControlRepositories: true,
		publications: true,
		FAIRscores: true,
	},
});

// Getters
export const getters = {
	LicensesSunburst(state) {
		return state._licensesSunburst;
	},
	LicensesOpenSource(state) {
		return state._licensesOpenSource;
	},
	SemanticVersioning(state) {
		return state._semanticVersioning;
	},
	VersionControlCount(state) {
		return state._versionControlCount;
	},
	VersionControlRepositories(state) {
		return state._versionControlRepositories;
	},
	Publications(state) {
		return state._publications;
	},
	Loaded(state) {
		return state._unLoaded;
	},
};

// Actions
const BASE_URL = '/stats/tools/';

export const actions = {
	async getLicensesSunburst({ commit, _state }) {
		const URL =
			BASE_URL +
			'licenses_summary_sunburst?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { licensesSunburst: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setLicensesSunburst', result);
		commit('setLoaded', { licensesSunburst: false });
	},

	async GET_URL({ _commit, _state }, URL) {
		const result = await this.$observatory.get(URL);
		return result.data.data;
	},

	async getLicensesOpenSource({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'licenses_open_source?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { licensesOpenSource: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setLicensesOpenSource', result);
		commit('setLoaded', { licensesOpenSource: false });
	},

	async getSemanticVersioning({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'semantic_versioning?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { semanticVersioning: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setSemanticVersioning', result);
		commit('setLoaded', { semanticVersioning: false });
	},

	async getVersionControlCount({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'version_control_count?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { versionControlCount: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setVersionControlCount', result);
		commit('setLoaded', { versionControlCount: false });
	},

	async getVersionControlRepositories({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'version_control_repositories?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { versionControlRepositories: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setVersionControlRepositories', result);
		commit('setLoaded', { versionControlRepositories: false });
	},

	async getPublications({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'publications_journals_IF?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { publications: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setPublications', result);
		commit('setLoaded', { publications: false });
	},
};

// Mutaciones
export const mutations = {
	setLoaded(state, loading) {
		state._unLoaded[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
	},
	setLicensesSunburst(state, sunburst) {
		state._licensesSunburst = sunburst;
	},
	setLicensesOpenSource(state, openSource) {
		state._licensesOpenSource = openSource;
	},
	setSemanticVersioning(state, semanticVersioning) {
		state._semanticVersioning = semanticVersioning;
	},
	setVersionControlCount(state, versionControlCount) {
		state._versionControlCount = versionControlCount;
	},
	setVersionControlRepositories(state, versionControlRepositories) {
		state._versionControlRepositories = versionControlRepositories;
	},
	setPublications(state, publications) {
		state._publications = publications;
	},
};
