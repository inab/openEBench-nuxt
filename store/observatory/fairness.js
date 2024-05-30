export const state = () => ({
	_FAIRscores: {
		F: {
			fair_scores: [],
			id: 'F',
			labels: [],
		},
		A: {
			fair_scores: [],
			id: 'A',
			labels: [],
		},
		I: {
			fair_scores: [],
			id: 'I',
			labels: [],
		},
		R: {
			fair_scores: [],
			id: 'R',
			labels: [],
		},
	},
	_controlFAIRscores: {
		F: {
			fair_scores: [],
			id: 'F',
			labels: [],
		},
		A: {
			fair_scores: [],
			id: 'A',
			labels: [],
		},
		I: {
			fair_scores: [],
			id: 'I',
			labels: [],
		},
		R: {
			fair_scores: [],
			id: 'R',
			labels: [],
		},
	},
	_currentCollection: 'tools',
	_unLoaded: {
		FAIRscores: true,
		controlFAIRscores: true,
	},
});

// Getters
export const getters = {
	FAIRscores(state) {
		return state._FAIRscores;
	},
	ControlFAIRscores(state) {
		return state._controlFAIRscores;
	},
	CurrentCollection(state) {
		return state._currentCollection;
	},
};

const BASE_URL = '/stats/tools/';

// Actions
const labels = {
	F: {
		F3: 'F3.<br> Searchability',
		F2: 'F2.<br> Existence <br> of Metadata',
		F1: 'F1.<br> Identity <br> uniqueness',
	},
	A: {
		A1: 'A1.<br> Existence of <br>downloadable, buildable <br>or accessible <br>working version',
		A3: 'A3.<br> Un-restricted Access <br> of Software',
	},
	I: {
		I1: 'I1.<br> Documentation on <br>Input/Output datatypes <br>and formats',
		I2: 'I2.<br> Workflow <br> compatibility',
		I3: 'I3.<br> Dependencies <br> availability',
	},
	R: {
		R1: 'R1.<br> Existence of <br> documentation',
		R2: 'R2.<br> Existence of <br> License',
		R3: 'R3.<br> Contributors <br> recognition',
		R4: 'R4.<br> Provenance <br> availability',
	},
};

export const actions = {
	async getFAIRscores({ commit, _state, rootState }) {
		const URL =
			BASE_URL +
			'fair_scores_summary?collection=' +
			rootState.observatory._currentCollection;

		commit('setLoaded', { FAIRscores: true });

		const FAIRscores = await this.cache.dispatch(
			'observatory/fairness/GET_URL',
			URL
		);

		const results = {
			F: {
				fair_scores: FAIRscores.F,
				labels: labels.F,
				id: 'F',
			},
			A: {
				fair_scores: FAIRscores.A,
				labels: labels.A,
				id: 'A',
			},
			I: {
				fair_scores: FAIRscores.I,
				labels: labels.I,
				id: 'I',
			},
			R: {
				fair_scores: FAIRscores.R,
				labels: labels.R,
				id: 'R',
			},
		};

		commit('setFAIRscores', results);
		commit('setLoaded', { FAIRscores: false });
	},

	async getControlFAIRscores({ commit, _state }) {
		const URL = BASE_URL + 'fair_scores_summary?collection=' + 'tools';

		commit('setLoaded', { controlFAIRscores: true });

		const FAIRscores = await this.cache.dispatch(
			'observatory/fairness/GET_URL',
			URL
		);

		const results = {
			F: {
				fair_scores: FAIRscores.F,
				labels: labels.F,
				id: 'F',
			},
			A: {
				fair_scores: FAIRscores.A,
				labels: labels.A,
				id: 'A',
			},
			I: {
				fair_scores: FAIRscores.I,
				labels: labels.I,
				id: 'I',
			},
			R: {
				fair_scores: FAIRscores.R,
				labels: labels.R,
				id: 'R',
			},
		};

		commit('setControlFAIRscores', results);
		commit('setLoaded', { controlFAIRscores: false });
	},

	async GET_URL({ _commit, _state }, URL) {
		const FAIRscores = await this.$observatory.get(URL);
		return FAIRscores.data.data;
	},
};

// Mutations
export const mutations = {
	setFAIRscores(state, FAIRscores) {
		state._FAIRscores = FAIRscores;
	},
	setControlFAIRscores(state, FAIRscores) {
		state._controlFAIRscores = FAIRscores;
	},
	setCurrentCollection(state, collection) {
		state._currentCollection = collection;
	},
	setLoaded(state, loading) {
		state._unLoaded[Object.keys(loading)[0]] = loading[Object.keys(loading)[0]];
	},
};
