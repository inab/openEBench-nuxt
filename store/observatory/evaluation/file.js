import { EDAMDict } from './EDAM_forFE_1.25.js';

export const state = () => ({
	_dialogParseMetadata: false,
	_parseProgressText: '',
	_errorDialogParseMetadata: false,
	_errorProgressText: '',
	_dialogInstallApp: false,
	_test: 'test',
});

export const getters = {
	getDialogParseMetadata(state) {
		return state._dialogParseMetadata;
	},
	getParseProgressText(state) {
		return state._parseProgressText;
	},
	getErrorDialogParseMetadata(state) {
		return state._errorDialogParseMetadata;
	},
	getErrorProgressText(state) {
		return state._errorProgressText;
	},
	getDialogInstallApp(state) {
		return state._dialogInstallApp;
	},
	getTest(state) {
		return state._test;
	},
};

function removeEmptyValues(d) {
	const result = {};
	for (const key in d) {
		if (Object.prototype.hasOwnProperty.call(d, key) && d[key]) {
			result[key] = d[key];
		}
	}
	return result;
}

function buildFeTopicsOperations(topics) {
	console.log('building topics');
	if (topics) {
		const items = [];
		for (let i = 0; i < topics.length; i++) {
			const topic = topics[i];
			const label = topic.split(':').slice(-1)[0];
			const uri = `https://edamontology.org/${label}`;
			const newTopic = {
				term: EDAMDict[uri],
				uri,
				vocabulary: 'EDAM',
			};
			items.push(removeEmptyValues(newTopic));
		}
		return items;
	} else {
		return [];
	}
}

function buildFeDescription(description) {
	console.log('building description');
	if (description) {
		return [description];
	} else {
		return [];
	}
}

function buildFeLicense(licenses) {
	console.log('building license');
	const newLicenses = [];
	if (licenses) {
		for (let i = 0; i < licenses.length; i++) {
			const license = licenses[i];
			const newLicense = {
				name: license['schema:name'],
				url: '',
			};
			newLicenses.push(newLicense);
		}
		return newLicenses;
	} else {
		return [];
	}
}

function buildFeAuthors(authors) {
	console.log('building authors');
	const newAuthors = [];
	if (authors) {
		for (let i = 0; i < authors.length; i++) {
			const author = authors[i];
			let type = null;
			try {
				type = author['@type'].split('/').slice(-1)[0].toLowerCase();
				const newAuthor = {
					type,
					name: author['schema:name'],
					email: author['schema:email'],
					maintainer: false,
				};
				newAuthors.push(removeEmptyValues(newAuthor));
			} catch (error) {
				console.log('Author type not found, skipping author');
			}
		}
	}
	return newAuthors;
}

function buildFeVersion(version) {
	console.log('building version');
	if (version) {
		return version;
	} else {
		return '';
	}
}

function buildFeInputOutput(inputOutput) {
	console.log('building input output');
	if (inputOutput) {
		const items = [];
		for (let i = 0; i < inputOutput.length; i++) {
			const io = inputOutput[i];
			const label = io['biochemas:encodingFormat'].split(':').slice(-1)[0];
			const uri = `https://edamontology.org/${label}`;
			const newIO = {
				datatype: {
					term: '',
					uri: '',
					vocabulary: '',
				},
				term: EDAMDict[uri],
				uri,
				vocabulary: 'EDAM',
			};
			items.push(removeEmptyValues(newIO));
		}
		return items;
	} else {
		return [];
	}
}

function buildFeHelp(help) {
	console.log('building help');
	const newItems = [];

	if (help) {
		for (let i = 0; i < help.length; i++) {
			const item = help[i];

			if (item['@id']) {
				const newItem = {
					url: item['@id'],
					type: '',
				};
				newItems.push(newItem);
			}
		}
		return newItems;
	} else {
		return [];
	}
}

function buildFePublication(publication) {
	console.log('building publication');
	const newPublications = [];

	if (publication) {
		for (const item of publication) {
			console.log(item);

			for (const pub of item) {
				const newPub = {};

				if (typeof pub === 'string') {
					if (pub.includes('pmcid:')) {
						newPub.pmcid = pub.split(':')[1];
					} else if (pub.includes('pmid:')) {
						newPub.pmid = pub.split(':')[1];
					}
				} else if (typeof pub === 'object') {
					if (pub['@type'] === 'https://schema.org/CreativeWork') {
						try {
							newPub.doi = pub['@id'].split(':')[1];
							newPub.title = pub['schema:name'];
							newPub.year = pub['schema:datePublished'];

							if (pub.pmid && pub.pmid.includes('pmid:')) {
								newPub.pmid = pub.pmid.split(':')[1];
							}
							if (pub.pmcid && pub.pmcid.includes('pmcid:')) {
								newPub.pmcid = pub.pmcid.split(':')[1];
							}
						} catch {
							console.log(
								`Publication ${pub} could not be parsed, skipping publication`
							);
						}
					} else if (pub['@id']) {
						newPub.doi = pub['@id'];
					}
				} else {
					console.log(
						`Publication ${pub} could not be parsed. Unknown type. Skipping publication`
					);
				}

				if (Object.keys(newPub).length > 0) {
					newPublications.push(removeEmptyValues(newPub));
				}
			}
		}
	}

	return newPublications;
}

function buildFeEdamTopicsOperations(topics) {
	console.log('building edam topics operations');
	console.log(topics);
	if (topics) {
		const items = [];
		for (let i = 0; i < topics.length; i++) {
			const topic = topics[i];
			const label = topic.split(':').slice(-1)[0];
			const uri = `https://edamontology.org/${label}`;
			items.push(uri);
		}
		return items;
	} else {
		return [];
	}
}

function buildFeLinks(meta) {
	console.log('building links');
	let newLinks = [];
	if (meta['schema:codeRepository']) {
		newLinks = newLinks.concat(meta['schema:codeRepository']);
	}
	if (meta['schema:downloadUrl']) {
		newLinks = newLinks.concat(meta['schema:downloadUrl']);
	}

	return newLinks;
}
function prepareListsIds(metadata) {
	const fields = [
		'edam_topics',
		'edam_operations',
		'documentation',
		'description',
		'webpage',
		'license',
		'src',
		'links',
		'topics',
		'operations',
		'input',
		'output',
		'repository',
		'dependencies',
		'os',
		'authors',
		'publication',
	];

	for (const field of fields) {
		console.log('Adding ids to field:', field);
		const items = metadata[field];
		if (items) {
			const newList = items.map((item, index) => ({
				term: item,
				id: index,
			}));
			metadata[field] = newList;
		}
	}

	return metadata;
}
export const actions = {
	// For testing purposes
	sleep({ _commit, _dispatch, _state }, ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	},

	async parseFromGitHubURL({ commit, dispatch, _state }, payload) {
		/*
        Download the file from the url and return the file content
        */

		commit('setDialogParseMetadata', true);
		commit('setParseProgressText', 'Retrieving file...');

		// make request to GitHub API
		const parameters = payload;

		const response = await this.$githubapp.$post(
			'/metadata/content',
			parameters
		);

		if (response) {
			const fileContent = response.content;

			dispatch('parseMetadataFile', fileContent);
		} else {
			commit('setErrorDialogParseMetadata', true);
			commit(
				'setErrorProgressText',
				'Something went wrong while downloading the file'
			);
		}
	},

	async parseFromURL({ _commit, _dispatch, _state }, _payload) {
		/*
		TODO: Download the file from the url and return the file content
		*/
	},

	parseFromUpload({ commit, dispatch, _state }, file) {
		/*
        Read the selected file and parse the content
        */

		commit('setDialogParseMetadata', true);
		commit('setParseProgressText', 'Reading metadata file');

		const fileContent = dispatch('readFile', file);

		dispatch('parseMetadataFile', fileContent);
	},

	readFile({ commit, _dispatch, _state }, file) {
		if (!file) {
			commit('setParseProgressText', 'No file selected');
		}
		const reader = new FileReader();

		// Use the javascript reader object to load the contents
		// of the file in the v-model prop
		reader.readAsText(file);
		reader.onload = () => {
			const data = reader.result;
			return data;
		};
		reader.onerror = () => {
			const message = 'Could not read file, error code is ' + reader.error.code;
			commit('setParseProgressText', message);
			const data = null;
			return data;
		};
	},

	parseMetadataFile({ commit, dispatch, _state }, fileContent) {
		commit('setParseProgressText', 'Parsing metadata file content...');

		console.log(fileContent);

		// transform file fields into the UI metadata model fields
		let metadata = {
			type: fileContent['@type'] || '',
			topics: buildFeTopicsOperations(
				fileContent['schema:applicationSubcategory']
			),
			name: fileContent['schema:name'] || '',
			webpage: fileContent['schema:url'] || '',
			description: buildFeDescription(fileContent['schema:description']),
			os: fileContent['schema:operatingSystem'] || [],
			license: buildFeLicense(fileContent['schema:license']),
			authors: buildFeAuthors(fileContent['schema:author']),
			version: buildFeVersion(fileContent['schema:softwareVersion']),
			repository: fileContent['schema:codeRepository'] || [],
			operations: buildFeTopicsOperations(fileContent['schema:featureList']),
			input: buildFeInputOutput(fileContent['bioschemas:input']),
			output: buildFeInputOutput(fileContent['bioschemas:output']),
			download: fileContent['schema:downloadURL'] || [],
			documentation: buildFeHelp(fileContent['schema:softwareHelp']),
			publication: buildFePublication(fileContent['schema:citation']),
			dependencies: fileContent['schema:requirements'] || [],
			registration_not_mandatory:
				fileContent['schema:isAccessibleForFree'] || false,
			edam_topics: buildFeEdamTopicsOperations(
				fileContent['schema:applicationSubcategory']
			),
			edam_operations: buildFeEdamTopicsOperations(
				fileContent['schema:featureList']
			),
			label: [fileContent['schema:name']] || [],
			src: fileContent['schema:codeRepository'] || [],
			links: buildFeLinks(fileContent),
			api_lib: false,
			test: [],
			source: [],
			registries: [],
			e_infrastructures: [],
			operational: null,
			inst_instr: false,
			contribPolicy: [],
			other_versions: [],
		};

		// Add ids to the lists so v-for loops work properly
		metadata = prepareListsIds(metadata);

		dispatch('observatory/evaluation/metadata/updateToolsMetadata', metadata, {
			root: true,
		});
		dispatch('observatory/evaluation/metadata/updateLoadedMetadata', true, {
			root: true,
		});

		commit('setParseProgressText', 'Done');
		commit('setParseProgressText', '');
		commit('setDialogParseMetadata', false);
	},

	updateDialogParseMetadata({ commit, _state }, value) {
		commit('setDialogParseMetadata', value);
	},

	updateDialogInstallApp({ commit, _state }, value) {
		commit('setDialogInstallApp', value);
	},

	cancelParse({ commit, _state }) {
		commit('setDialogParseMetadata', false);
		commit('setParseProgressText', '');
	},
};

export const mutations = {
	setDialogParseMetadata(state, value) {
		state._dialogParseMetadata = value;
	},
	setParseProgressText(state, text) {
		state._parseProgressText = text;
	},
	setErrorDialogParseMetadata(state, value) {
		state._errorDialogParseMetadata = value;
	},
	setErrorProgressText(state, text) {
		state._errorProgressText = text;
	},
	setDialogInstallApp(state, value) {
		state._dialogInstallApp = value;
	},
};
