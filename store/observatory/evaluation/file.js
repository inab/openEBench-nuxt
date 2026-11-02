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

function escapeHtml(text) {
	// error texts are rendered with v-html and parse errors can quote the file content
	return String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

// EDAMDict and the Observatory API use http:// EDAM URIs
const EDAM_BASE_URI = 'http://edamontology.org/';

function parseTerm(value) {
	/*
	Exported terms are 'edam:<id>' (EDAM terms), a URI (other vocabularies)
	or a plain term. EDAM URIs are also accepted.
	*/
	if (typeof value !== 'string' || value === '') {
		return null;
	}
	let edamId = null;
	if (value.startsWith('edam:')) {
		edamId = value.slice('edam:'.length);
	} else {
		const match = value.match(/^https?:\/\/edamontology\.org\/(.+)$/);
		if (match) {
			edamId = match[1];
		}
	}
	if (edamId) {
		const uri = EDAM_BASE_URI + edamId;
		return removeEmptyValues({
			term: EDAMDict[uri],
			uri,
			vocabulary: 'EDAM',
		});
	}
	if (/^https?:\/\//.test(value)) {
		return { term: value, uri: value };
	}
	return { term: value };
}

function buildFeTopicsOperations(topics) {
	if (Array.isArray(topics)) {
		return topics.map(parseTerm).filter((topic) => topic !== null);
	} else {
		return [];
	}
}

function buildFeDescription(description) {
	// If description is a string, it will return the string in an array
	if (typeof description === 'string') {
		return [description];
	}
	// If description is an array, it will return the array
	else if (Array.isArray(description)) {
		return description;
	}
	// If description is not present or any other type, it will return an empty array
	return [];
}

function buildFeLicense(licenses) {
	const newLicenses = [];
	if (licenses) {
		for (let i = 0; i < licenses.length; i++) {
			const license = licenses[i];
			const newLicense = {
				name: license['schema:name'],
				url: license['schema:url'] || '',
			};
			newLicenses.push(newLicense);
		}
		return newLicenses;
	} else {
		return [];
	}
}

function buildFeAuthors(authors) {
	const newAuthors = [];
	if (authors) {
		for (let i = 0; i < authors.length; i++) {
			const author = authors[i];
			let type = null;
			try {
				// @type is 'schema:Person' or, in older files, 'https://schema.org/Person'
				type = author['@type'].split(/[/:]/).slice(-1)[0].toLowerCase();
				const newAuthor = {
					type,
					name: author['schema:name'],
					email: author['schema:email'],
					maintainer: false,
				};
				newAuthors.push(removeEmptyValues(newAuthor));
			} catch (error) {
				console.debug('Author type not found, skipping author');
			}
		}
	}
	return newAuthors;
}

function buildFeVersion(version) {
	console.debug('building version');
	// the UI expects a list of versions, as in Observatory metadata
	if (Array.isArray(version)) {
		return version;
	} else if (version) {
		return [version];
	} else {
		return [];
	}
}

function buildFeType(type) {
	// the types selector holds a list of types, as in Observatory metadata
	if (Array.isArray(type)) {
		return type;
	} else if (type) {
		return [type];
	} else {
		return [];
	}
}

function buildFeInputOutput(inputOutput) {
	console.debug('building input output');
	if (inputOutput) {
		const items = [];
		for (let i = 0; i < inputOutput.length; i++) {
			const io = inputOutput[i];
			// files exported before July 2024 use the misspelled key
			const format =
				io['bioschemas:encodingFormat'] || io['biochemas:encodingFormat'];
			const parsedFormat = parseTerm(format);
			if (!parsedFormat) {
				console.debug('Input/output format not found, skipping item');
				continue;
			}
			const newIO = {
				datatype: {
					term: '',
					uri: '',
					vocabulary: '',
				},
				...parsedFormat,
			};
			items.push(removeEmptyValues(newIO));
		}
		return items;
	} else {
		return [];
	}
}

function buildFeHelp(help) {
	console.debug('building help');
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
	console.debug('building publication');
	const newPublications = [];

	if (publication) {
		for (const pub of publication) {
			const newPub = {};

			if (typeof pub === 'object') {
				// @type is 'schema:CreativeWork' or, in older files, the full URI
				if (
					pub['@type'] === 'schema:CreativeWork' ||
					pub['@type'] === 'https://schema.org/CreativeWork'
				) {
					try {
						const url = pub['@id'] || pub['schema:url'];
						newPub.url = url;
						newPub.title = pub['schema:name'];

						if (url) {
							// url is https://doi.org/{DOI}
							newPub.doi = url.split('https://doi.org/')[1];
						}
					} catch {
						console.debug(
							`Publication ${pub} could not be parsed, skipping publication`
						);
					}
				}
			} else {
				console.debug(
					`Publication ${pub} could not be parsed. Unknown type. Skipping publication`
				);
			}

			if (Object.keys(newPub).length > 0) {
				newPublications.push(removeEmptyValues(newPub));
			}
		}
	}

	return newPublications;
}

function buildFeEdamTopicsOperations(topics) {
	console.debug('building edam topics operations');
	console.debug(topics);
	// URIs of the EDAM terms only
	return buildFeTopicsOperations(topics)
		.filter((topic) => topic.vocabulary === 'EDAM')
		.map((topic) => topic.uri);
}

function buildFeLinks(meta) {
	console.debug('building links');
	let newLinks = [];
	if (meta['schema:codeRepository']) {
		newLinks = newLinks.concat(meta['schema:codeRepository']);
	}
	const downloads = meta['schema:downloadUrl'] || meta['schema:downloadURL'];
	if (downloads) {
		newLinks = newLinks.concat(downloads);
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
		console.debug('Adding ids to field:', field);
		const items = metadata[field];
		// Check if the field is an array before using map
		if (Array.isArray(items)) {
			const newList = items.map((item, index) => ({
				term: item,
				id: index,
			}));
			metadata[field] = newList;
		} else if (typeof items === 'string') {
			// If it's a string, convert it into an array of one item
			metadata[field] = [{ term: items, id: 0 }];
		} else if (items) {
			// If it is something else and exists, wrap it in an array
			metadata[field] = [{ term: items, id: 0 }];
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

			dispatch('mapMetadata', fileContent);
		} else {
			commit('setErrorDialogParseMetadata', true);
			commit(
				'setErrorProgressText',
				'Something went wrong while downloading the file'
			);
		}
	},

	async parseFromURL({ commit, dispatch }, { url }) {
		commit('setParseProgressText', 'Downloading file from URL...');
		commit('setDialogParseMetadata', true);

		try {
			// Create a new Axios instance
			const axiosInstance = this.$axios.create();
			axiosInstance.setBaseURL(url);

			const response = await axiosInstance.get('');

			const fileContent = response.data;
			console.debug('Downloaded file content:', fileContent);
			parsedContent = JSON.parse(fileContent);
			dispatch('mapMetadata', parsedContent);
		} catch (error) {
			console.error('Error fetching or parsing file from URL:', error);
			commit('setErrorDialogParseMetadata', true);
			commit(
				'setErrorProgressText',
				`Error fetching file from URL: ${error.message}`
			);
		}
	},

	importTxt({ commit }, file) {
		return new Promise((resolve, reject) => {
			if (!file) {
				commit('setErrorDialogParseMetadata', true);
				commit('setErrorProgressText', 'No file chosen');
				reject(new Error('No file chosen'));
			} else {
				const reader = new FileReader();

				console.debug('file', file);

				reader.readAsText(file);

				reader.onload = () => {
					const data = reader.result;
					console.debug('data', data);
					resolve(data);
				};

				reader.onerror = () => {
					const errorMessage =
						'Could not read file, error code is ' + reader.error.code;
					console.error('File reading error:', reader.error);
					commit('setErrorDialogParseMetadata', true);
					commit('setErrorProgressText', errorMessage);
					reject(new Error(errorMessage));
				};

				reader.onabort = () => {
					const errorMessage = 'File read operation was aborted.';
					console.error('File read aborted');
					commit('setErrorDialogParseMetadata', true);
					commit('setErrorProgressText', errorMessage);
					reject(new Error(errorMessage));
				};
			}
		});
	},

	async downloadFile({ commit, dispatch }, payload) {
		commit('setParseProgressText', 'Downloading file from URL...');
		commit('setDialogParseMetadata', true);

		try {
			const URL = '/downloads/download-content/';

			const data = {
				url: payload.url,
			};

			console.log(data);

			const response = await this.$observatory.post(URL, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			let fileContent = response.data.content;
			fileContent = fileContent.trim();
			fileContent = JSON.parse(fileContent);

			console.log('name', fileContent['schema:name']);
			await dispatch('mapMetadata', fileContent);
			console.debug('Downloaded file content:', fileContent);
		} catch (error) {
			console.error('Error fetching or parsing file from URL:', error);
			commit('setDialogParseMetadata', false);
			commit('setErrorDialogParseMetadata', true);
			commit(
				'setErrorProgressText',
				`Error fetching file from URL: ${escapeHtml(error.message)}`
			);
		}
	},

	async parseMetadataFile({ commit, dispatch }, file) {
		commit('setParseProgressText', 'Parsing metadata file content...');
		commit('setDialogParseMetadata', true);

		let fileContent;
		try {
			fileContent = await dispatch('importTxt', file);
		} catch (error) {
			console.error('Error importing text:', error);
			const errorMessage =
				'Error importing text from file:' +
				'<br><br><pre>' +
				escapeHtml(error.message) +
				'</pre>';
			commit('setDialogParseMetadata', false);
			commit('setErrorDialogParseMetadata', true);
			commit('setErrorProgressText', errorMessage);
			return;
		}

		// Trim whitespace from fileContent
		fileContent = fileContent.trim();

		let parsedContent;

		try {
			parsedContent = JSON.parse(fileContent);
			dispatch('mapMetadata', parsedContent);
		} catch (error) {
			console.error('Error parsing JSON:', error);
			commit('setDialogParseMetadata', false);
			commit('setErrorDialogParseMetadata', true);
			const errorMessage =
				'Error parsing metadata file content:' +
				'<pre>' +
				escapeHtml(error.message) +
				'</pre>';
			commit('setErrorProgressText', errorMessage);
			dispatch('observatory/evaluation/changeStep', 2, { root: true });
		}
	},

	mapMetadata({ commit, dispatch }, parsedContent) {
		// Transform file fields into the UI metadata model fields
		let metadata = {
			topics: buildFeTopicsOperations(
				parsedContent?.['schema:applicationSubcategory'] || []
			),
			name: parsedContent?.['schema:name'] || '',
			webpage: parsedContent?.['schema:url'] || [],
			description: buildFeDescription(
				parsedContent?.['schema:description'] || []
			),
			os: parsedContent?.['schema:operatingSystem'] || [],
			license: buildFeLicense(parsedContent?.['schema:license'] || []),
			authors: buildFeAuthors(parsedContent?.['schema:author'] || []),
			version: buildFeVersion(parsedContent?.['schema:softwareVersion'] || ''),
			repository: parsedContent?.['schema:codeRepository'] || [],
			operations: buildFeTopicsOperations(
				parsedContent?.['schema:featureList'] || []
			),
			input: buildFeInputOutput(parsedContent?.['bioschemas:input'] || []),
			output: buildFeInputOutput(parsedContent?.['bioschemas:output'] || []),
			download:
				parsedContent?.['schema:downloadUrl'] ||
				parsedContent?.['schema:downloadURL'] ||
				[],
			documentation: buildFeHelp(parsedContent?.['schema:softwareHelp'] || []),
			dependencies: parsedContent?.['schema:requirements'] || [],
			// accept both a JSON boolean and the string 'true'
			registration_not_mandatory:
				parsedContent?.['schema:isAccessibleForFree'] === true ||
				parsedContent?.['schema:isAccessibleForFree'] === 'true',
			edam_topics: buildFeEdamTopicsOperations(
				parsedContent?.['schema:applicationSubcategory'] || []
			),
			edam_operations: buildFeEdamTopicsOperations(
				parsedContent?.['schema:featureList'] || []
			),
			label: [parsedContent?.['schema:name']] || [],
			src: parsedContent?.['schema:codeRepository'] || [],
			links: buildFeLinks(parsedContent || {}),
			publication: buildFePublication(
				parsedContent?.['codemeta:referencePublication'] || []
			),
			api_lib: false,
			type: buildFeType(parsedContent?.['schema:applicationCategory']),
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

		dispatch('observatory/evaluation/changeStep', 3, { root: true });
	},

	updateDialogParseMetadata({ commit, _state }, value) {
		commit('setDialogParseMetadata', value);
	},

	updateDialogInstallApp({ commit, _state }, value) {
		commit('setDialogInstallApp', value);
	},

	cancelParse({ commit, _state, dispatch }) {
		commit('setDialogParseMetadata', false);
		commit('setErrorDialogParseMetadata', false);
		commit('setParseProgressText', '');
		dispatch('observatory/evaluation/changeStep', 2, {
			root: true,
		});
	},
};

export const mutations = {
	setDialogParseMetadata(state, value) {
		state._dialogParseMetadata = value;
	},
	setParseProgressText(state, value) {
		state._parseProgressText = value;
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
