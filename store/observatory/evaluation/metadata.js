/*
    _VocabulariesItems are of the form:
    { <vocabulary name> : {
        'format':[
            term1,
            term2,
            ...
        ],
        'datatype':[
            term1,
            term2,
            ...
            ...
        ],
        'topic':[
            term1,
            term2,
            ...
            ...
        ],
        'operaion':[
            term1,
            term2,
            ...
            ...
        ],
        }
    }
    */

// state
export const state = () => ({
	_toolMetadata: {},
	_toolMetadataJSONLD: {},
	_toolMetadataCFF: {},
	_LoadedMetadata: false,
	_SPDXLicenses: [],
	_VocabulariesItems: {
		EDAM: {
			format: [],
			datatype: [],
			topic: [],
			operaion: [],
		},
	},
});

// getters
export const getters = {
	getToolName(state) {
		return state._toolMetadata.name;
	},
	getVocabulariesItems(state) {
		return state._VocabulariesItems;
	},
	getLoadedMetadata(state) {
		return state._LoadedMetadata;
	},
	getToolMetadata(state) {
		return state._toolMetadata;
	},
	getSPDXLicenses(state) {
		return state._SPDXLicenses;
	},
	getToolMetadataJSONLD(state) {
		return state._toolMetadataJSONLD;
	},
	getToolMetadataCFF(state) {
		return state._toolMetadataCFF;
	},
};

// actions

export const actions = {
	async fetchSPDXLicenses({ commit, _state }) {
		const URL = 'spdx/SPDXLicenses';

		const SPDXLicenses = await this.cache.dispatch(
			'observatory/evaluation/metadata/GET_URL',
			URL
		);

		commit('setSPDXLicenses', SPDXLicenses);
	},

	// better generate once and read from json file or js file
	async getVocabulariesItems({ commit, _state }) {
		const URL = 'edam/EDAMTerms';

		const EDAMTerms = await this.cache.dispatch(
			'observatory/evaluation/metadata/GET_URL',
			URL
		);

		const payload = {
			key: 'EDAM', // type of term
			items: EDAMTerms, // list of terms
		};

		commit('setVocabulariesItems', payload);
	},

	async GET_URL({ _commit, _state }, URL) {
		const result = await this.$observatory.get(URL);
		return result.data;
	},

	prepareMetadata({ _commit, _state }, result) {
		/* ---Modifications to the metadata are needed to make it compatible with the UI ---- */
		result.source.push('observatory'); // add observatory as source

		// Contribution policy and test data as arrays of strings
		result.contribPolicy = [];
		result.test = []; // Here we are missing the tests that were equal to true

		// New field registration as boolean
		result.registration_not_mandatory = false; // Here we are missing the registrations that were equal to true

		// New field registries as array of strings (starting with sources)
		const sourcesLabels = {
			biotools: 'bio.tools',
			bioconda: 'Bioconda',
			bioconductor: 'Bioconductor',
			sourceforge: 'SourceForge',
			toolshed: 'ToolShed',
		};

		// Add result.source to registries as their value in sourcesLabels.
		// If source not in sourcesLabels, do not add it
		result.registries = result.source.map((source) => {
			if (source in sourcesLabels) {
				return sourcesLabels[source];
			} else {
				return null;
			}
		});
		/// / remove undefined values
		result.registries = result.registries.filter(function (el) {
			return el != null;
		});

		// version as one string
		result.other_versions = result.version.filter((val) => val != null);
		result.version = result.version[0];

		// New filed e_infrastructures as array of strings
		const eInfrastructures = {
			galaxy: 'usegalaxy',
		};
		result.e_infrastructures = result.source.map((source) => {
			if (source in eInfrastructures) {
				return eInfrastructures[source];
			} else {
				return null;
			}
		});
		/// / remove undefined values
		result.e_infrastructures = result.e_infrastructures.filter(function (el) {
			return el != null;
		});

		/* ---------------------------------------------------------------------------------- */

		return result;
	},

	async transformToJSONLD({ commit, state }) {
		// Transform the metadata to JSON-LD

		const payload = {
			data: state._toolMetadata,
			url: '/tools/jsonld',
		};

		const result = await this.dispatch(
			'observatory/evaluation/metadata/POST_URL',
			payload
		);

		commit('setMetadataJSONLD', result);
	},

	async transformToCFF({ commit, state }) {
		// Transform the metadata to CFF

		const payload = {
			data: state._toolMetadata,
			url: '/tools/cff',
		};

		const result = await this.dispatch(
			'observatory/evaluation/metadata/POST_URL',
			payload
		);

		console.debug(result);

		commit('setMetadataCFF', result);
	},

	async POST_URL({ _commit, _state }, payload) {
		const result = await this.$observatory.post(payload.url, {
			data: payload.data,
		});
		return result.data;
	},

	updateToolMetadataJSONLD({ commit }, payload) {
		commit('setMetadataJSONLD', payload);
	},

	updateToolMetadataCFF({ commit }, payload) {
		commit('setMetadataCFF', payload);
	},

	changeBooleanEntry({ commit }, payload) {
		commit('changeBooleanEntry', payload);
	},
	changeEntry({ commit }, payload) {
		commit('changeEntry', payload);
	},
	addEntry({ commit }, payload) {
		commit('addEntry', payload);
	},

	removeEntry({ commit }, payload) {
		commit('removeEntry', payload);
	},

	updateLoadedMetadata({ commit, _state }, payload) {
		commit('setLoadedMetadata', payload);
	},

	updateToolsMetadata({ commit, _state }, payload) {
		commit('setToolMetadata', payload);
	},

	updateSelectorEntry({ commit }, payload) {
		commit('changeSelectorEntry', payload);
	},

	submitVersionControl({ commit, _state }, payload) {
		commit('setVersionControl', payload);
	},
};

// mutations
export const mutations = {
	setMetadataJSONLD(state, payload) {
		state._toolMetadataJSONLD = payload;
	},

	setMetadataCFF(state, payload) {
		state._toolMetadataCFF = payload;
	},

	addField(state, payload) {
		state._toolMetadata[payload.field] = payload.value;
	},

	changeBooleanEntry(state, payload) {
		state._toolMetadata.rerender = [];
		state._toolMetadata[payload.field] = !state._toolMetadata[payload.field];
		delete state._toolMetadata.rerender;
	},

	changeEntry(state, payload) {
		// remove item to force update of reactive properties depending on it
		// state._toolMetadata[payload.field].splice(payload.index, 1);
		// add the new value
		state._toolMetadata[payload.field][payload.index] = payload.value;
	},
	changeSelectorEntry(state, payload) {
		// remove item to force update of reactive properties depending on it
		state._toolMetadata[payload.field] = [];
		// add the new value
		state._toolMetadata[payload.field] = payload.value;
	},

	removeEntry(state, payload) {
		// remove item to force update of reactive properties depending on it
		state._toolMetadata[payload.field].splice(payload.index, 1);
	},

	addEntry(state, payload) {
		const field = payload.field;
		const value = payload.value;
		let id = 0;
		// the id is needed for v-for loops to keep proper track of items
		if (state._toolMetadata[field].length > 0) {
			const lastIndex = state._toolMetadata[field].length - 1;
			id = state._toolMetadata[field][lastIndex].id + 1;
		}
		const newItem = {
			term: value,
			id,
		};
		state._toolMetadata[field].push(newItem);
	},

	setVocabulariesItems(state, payload) {
		state._VocabulariesItems[payload.key] = payload.items;
	},

	setLoadedMetadata(state, payload) {
		state._LoadedMetadata = payload;
	},

	setToolMetadata(state, result) {
		state._toolMetadata = {};
		state._toolMetadata = result;
	},

	setVersionControl(state, versionControl) {
		state._toolMetadata.version_control = versionControl;
	},

	setSPDXLicenses(state, SPDXLicenses) {
		state._SPDXLicenses = SPDXLicenses;
	},
};
