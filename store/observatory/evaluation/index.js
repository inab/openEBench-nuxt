// state
export const state = () => ({
	_step: 1, // remains in index.js
	_source: null, // remains in index.js
});

// Getters
export const getters = {
	getStep(state) {
		// remains in index.js
		return state._step;
	},
	getSource(state) {
		// remains in index.js
		return state._source;
	},
};

// Actions

export const actions = {
	changeStep({ commit }, step) {
		// remains in index.js
		commit('setStep', step);
	},

	changeSource({ commit }, source) {
		// remains in index.js
		commit('setSource', source);
	},
};

// Mutations
export const mutations = {
	setStep(state, step) {
		state._step = step;
	},
	setSource(state, source) {
		state._source = source;
	},
};
