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

	_dependencies: [],
	_dependenciesCount: {},
	_documentation: [],
	_documentationCount: {},
	_inputFormats: {},
	_outputFormats: {},
	_formatsCount: {},

	_unLoaded: {
		licensesSunburst: true,
		licensesOpenSource: true,
		semanticVersioning: true,
		versionControlCount: true,
		versionControlRepositories: true,
		publications: true,

		dependencies: true,
		dependenciesCount: true,
		documentation: true,
		documentationCount: true,
		inputFormats: true,
		outputFormats: true,
		formatsCount: true,

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

	Dependencies(state) {
		return state._dependencies;
	},
	DependenciesCount(state) {
		return state._dependenciesCount;
	},
	Documentation(state) {
		return state._documentation;
	},
	DocumentationCount(state) {
		return state._documentationCount;
	},
	InputFormats(state) {
		return state._inputFormats;
	},
	OutputFormats(state) {
		return state._outputFormats;
	},
	FormatsCount(state) {
		return state._formatsCount;
	},

	Loaded(state) {
		return state._unLoaded;
	},
};

// Actions
const BASE_URL = '/stats/tools/';

export const actions = {
	async getLicensesSunburst({ commit, _state, rootState }) {
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

	async getDependencies({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'dependencies_count?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { dependencies: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setDependencies', result);
		commit('setLoaded', { dependencies: false });
	},

	async getDependenciesCount({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'dependencies_coverage?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { dependenciesCount: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setDependenciesCount', result);
		commit('setLoaded', { dependenciesCount: false });
	},

	async getDocumentation({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'documentation?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { documentation: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setDocumentation', result);
		commit('setLoaded', { documentation: false });
	},

	async getDocumentationCount({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'documentation_coverage?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { documentationCount: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setDocumentationCount', result);
		commit('setLoaded', { documentationCount: false });
	},

	async getInputFormats({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'input_formats?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { inputFormats: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setInputFormats', result);
		commit('setLoaded', { inputFormats: false });
	},

	async getOutputFormats({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'output_formats?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { outputFormats: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setOutputFormats', result);
		commit('setLoaded', { outputFormats: false });
	},

	async getFormatsCount({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'formats_coverage?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { formatsCount: true });

		const result = await this.cache.dispatch('observatory/trends/GET_URL', URL);

		commit('setFormatsCount', result);
		commit('setLoaded', { formatsCount: false });
	},
};

// Mutations
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

	setDependencies(state, dependencies) {
		state._dependencies = dependencies;
	},
	setDependenciesCount(state, dependenciesCount) {
		state._dependenciesCount = dependenciesCount;
	},
	setDocumentation(state, documentation) {
		state._documentation = documentation;
	},
	setDocumentationCount(state, documentationCount) {
		state._documentationCount = documentationCount;
	},
	setInputFormats(state, inputFormats) {
		state._inputFormats = inputFormats;
	},
	setOutputFormats(state, outputFormats) {
		state._outputFormats = outputFormats;
	},
	setFormatsCount(state, formatsCount) {
		state._formatsCount = formatsCount;
	},
};
