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
		F3: 'F3. Discoverability',
		F2: 'F2. Existence <br> of metadata',
		F1: 'F1. Identity <br> uniqueness',
	},
	A: {
		A1: 'A1. Availability of<br>working version',
		A3: 'A3. Unrestricted Access',
	},
	I: {
		I1: 'I1. Data format <br> standards and<br>practices',
		I2: 'I2. Software <br> integration',
		I3: 'I3. Dependencies <br> availability',
	},
	R: {
		R1: 'R1. Usage <br> documentation',
		R2: 'R2. License',
		R3: 'R3. Recognition <br> and governance',
		R4: 'R4. Versioning and<br>  historical traceability',
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
