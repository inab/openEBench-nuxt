/*
This store is used for the github integration.
In Step 2: import of metadata from a github repository.
*/

// state
export const state = () => ({
	// requested repository to import metadata from (as <owner>/<repo>)
	_repository: {
		owner: '',
		repo: '',
	},
	// opens/closes the main dialog for importing metadata from github
	_dialogImportMetadata: false,
	// text that appears in the ImportMetadata dialog
	_importError: false,
	_importProgressText: '',
	// opens/closes the dialog for installing the app in the requester's github account
	_dialogAppInstall: false,
	// the installation ID of the app in the requester's github account
	_extractorInstallationID: null,
	_updaterInstallationID: null,
	// socket
	_socket: null,
});

// getters
export const getters = {
	getRepository(state) {
		return state._repository;
	},
	getDialogImportMetadata(state) {
		return state._dialogImportMetadata;
	},
	getImportError(state) {
		return state._importError;
	},
	getImportProgressText(state) {
		return state._importProgressText;
	},
	getDialogAppInstall(state) {
		return state._dialogAppInstall;
	},
	getExtractorInstallationID(state) {
		return state._extractorInstallationID;
	},
	getUpdaterInstallationID(state) {
		return state._updaterInstallationID;
	},
	getSocket(state) {
		return state._socket;
	},
};

// actions
export const actions = {
	async getExtractorInstallationID({ commit, _state }, repository) {
		/*
        This function makes a request to the API to check the installation of Metadata Extractor for FAIRsoft in the repository.
        ID of the repository that the user requested to import metadata from.
        This function is called from the component GitHubInput.vue
        */

		commit(
			'setImportProgressText',
			'Checking the permissions to read the repository ...'
		);

		try {
			const URL = '/metadata-extractor-for-fairsoft/installation/id';

			const response = await this.$githubapp.$get(URL, {
				params: { owner: repository.owner, repo: repository.repo },
			});

			let installationID = null;
			if (response.status === 200) {
				installationID = response.data.data.id;
			}

			console.debug('obtained installation ID: ' + installationID);
			commit('setExtractorInstallationID', installationID);
		} catch (error) {
			console.debug('Error while getting installation ID: ' + error);
			commit(
				'setImportProgressText',
				"error while fetching the repositorie's installation ID for app metadata extractor for FAIRsoft"
			);
			commit('setImportError', true);
		}
	},

	async getUpdaterInstallationID({ commit, _state }, repository) {
		/*
        This function makes a request to the API to check the installation of Metadata Updater for FAIRsoft in the repository.
        ID of the repository that the user requested to pull file to
        This function is called from the component GitHubInput.vue
        */

		commit(
			'setImportProgressText',
			'Checking the permissions to read the repository ...'
		);

		try {
			const URL = '/metadata-updater-for-fairsoft/installation/id';

			const response = await this.$githubapp.$get(URL, {
				params: { owner: repository.owner, repo: repository.repo },
			});

			let installationID = null;
			if (response.status === 200) {
				installationID = response.data.data.id;
			}

			console.debug('obtained installation ID: ' + installationID);
			commit('setUpdaterInstallationID', installationID);
		} catch (error) {
			console.debug('Error while getting installation ID: ' + error);
			commit(
				'setImportProgressText',
				"error while fetching the repositorie's installation ID for app Metadata Updater for FAIRsoft"
			);
			commit('setImportError', true);
		}
	},

	updateExtractorInstallationID({ commit }, installationID) {
		// This function updates the value of _installationID
		commit('setExtractorInstallationID', installationID);
	},

	updateUpdaterInstallationID({ commit }, installationID) {
		// This function updates the value of _installationID
		commit('setUpdaterInstallationID', installationID);
	},

	updateImportError({ commit }, value) {
		// This function updates the value of _importError
		commit('setImportError', value);
	},

	updateImportProgressText({ commit }, text) {
		// This function updates the value of _importProgressText
		commit('setImportProgressText', text);
	},

	updateDialogImportMetadata({ commit }, value) {
		// This function updates the value of _dialogImportMetadata
		commit('setDialogImportMetadata', value);
	},

	updateDialogAppInstall({ commit }, value) {
		// This function updates the value of _dialogAppInstall
		commit('setDialogAppInstall', value);
	},

	async fetchGitHubMeta({ commit, state, dispatch }, _repositoryURL) {
		// This function fetches the metadata from the github repository

		commit('setDialogImportMetadata', true);
		commit('setImportProgressText', 'Fetching repository metadata ...');

		console.debug('Installation ID: ' + state._installationID);
		const URL = 'metadata';
		const payload = {
			repo: state._repository.repo,
			owner: state._repository.owner,
			installationID: state._extractorInstallationID,
		};

		try {
			const response = await this.$githubapp.$post(URL, payload);

			let result = response.data;
			result = await dispatch(
				'observatory/evaluation/metadata/prepareMetadata',
				result,
				{ root: true }
			);

			dispatch('observatory/evaluation/metadata/updateToolsMetadata', result, {
				root: true,
			});
			dispatch('observatory/evaluation/metadata/updateLoadedMetadata', true, {
				root: true,
			});

			commit('setImportProgressText', 'Importation finished');
			commit('setDialogImportMetadata', false);

			// change step to 3 after importing metadata
			dispatch('observatory/evaluation/changeStep', 3, { root: true });
		} catch (error) {
			console.debug('Error while fetching metadata: ' + error);
			commit('setImportProgressText', 'Error while fetching metadata');
			commit('setImportError', true);
		}
	},

	cancelImport({ commit, _state }) {
		commit('setDialogImportMetadata', false);
		commit('setImportError', false);
		commit('setDialogAppInstall', false);
		commit('setImportProgressText', '');
	},

	updateRepository({ commit, _state }, repository) {
		// This function updates the value of _repository
		commit('setRepository', repository);
	},
};

// mutations
export const mutations = {
	setRepository(state, repository) {
		state._repository = repository;
	},
	setImportError(state, value) {
		state._importError = value;
	},
	setImportProgressText(state, text) {
		state._importProgressText = text;
	},

	setDialogImportMetadata(state, value) {
		state._dialogImportMetadata = value;
	},
	setDialogAppInstall(state, value) {
		state._dialogAppInstall = value;
	},
	setExtractorInstallationID(state, installationID) {
		state._extractorInstallationID = installationID;
	},
	setUpdaterInstallationID(state, installationID) {
		state._updaterInstallationID = installationID;
	},
	setSocket(state, socket) {
		state._socket = socket;
	},
	setMetadata(state, metadata) {
		state._metadata = metadata;
	},
};
