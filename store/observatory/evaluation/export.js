// state
export const state = () => ({
	_dialogPR: false,
	_dialogAppInstall: false,
	_dialogPRok: false,
	_dialogPRfail: false,
	_failMessage: '',
	_okURL: '',
});

// getters
export const getters = {
	getDialogPR: (state) => state._dialogPR,
	getDialogAppInstall: (state) => state._dialogAppInstall,
	getDialogPRok: (state) => state._dialogPRok,
	getDialogPRfail: (state) => state._dialogPRfail,
	getFailMessage: (state) => state._failMessage,
	getOkURL: (state) => state._okURL,
};

// actions
export const actions = {
	updateDialogPR({ commit, _state }, value) {
		commit('setDialogPR', value);
	},
	updateDialogAppInstall({ commit, _state }, value) {
		commit('setDialogAppInstall', value);
	},
	updateDialogPRok({ commit, _state }, value) {
		commit('setDialogPRok', value);
	},
	updateDialogPRfail({ commit, _state }, value) {
		commit('setDialogPRfail', value);
	},
	cancelRequest({ commit, _state }) {
		commit('setDialogPR', false);
		commit('setDialogAppInstall', false);
	},
	async requestPull({ commit, _state }, payload) {
		const URL = '/metadata/pull';
		const parameters = {
			repo: payload.repo,
			owner: payload.owner,
			filename: payload.filename,
			installationID: payload.installationID,
			metadata: payload.metadata,
			title: payload.title,
			message: payload.message,
		};
		const response = await this.$githubapp.$post(URL, parameters);
		console.debug(response);
		if (response.code === 200) {
			commit('setOkURL', response.url);
			commit('setDialogPRok', true);
			commit('setDialogPR', false);
			commit('setDialogAppInstall', false);
		} else {
			commit('setFailMessage', response.message);
			commit('setDialogPRfail', true);
			commit('setDialogPR', false);
			commit('setDialogAppInstall', false);
		}
	},
};

// mutations
export const mutations = {
	setDialogPR(state, value) {
		state._dialogPR = value;
	},
	setDialogAppInstall(state, value) {
		state._dialogAppInstall = value;
	},
	setDialogPRok(state, value) {
		state._dialogPRok = value;
	},
	setDialogPRfail(state, value) {
		state._dialogPRfail = value;
	},
	setFailMessage(state, value) {
		state._failMessage = value;
	},
	setOkURL(state, value) {
		state._okURL = value;
	},
};
