// Maps the tool-search filter state keys (store/tool.js `filters`) to the URL
// query-param names. Param names mirror those used by buildQuery() in
// store/tool.js so the URL stays consistent with what the API expects.
export const FILTER_PARAM_MAP = {
	source: 'source',
	type: 'type',
	topics: 'topic',
	operations: 'operation',
	license: 'license',
	tags: 'tags',
	inputFormat: 'input_format',
	outputFormat: 'output_format',
};

// filters (store state) -> route query object (only non-empty categories).
export function filtersToQuery(filters) {
	const query = {};
	for (const [stateKey, param] of Object.entries(FILTER_PARAM_MAP)) {
		const values = filters[stateKey];
		if (values && values.length > 0) {
			query[param] = values.join(',');
		}
	}
	return query;
}

// route query object -> filters (store state). Categories absent from the URL
// come back empty, so this doubles as the reset when there are no filter params.
export function queryToFilters(query) {
	const filters = {
		source: [],
		type: [],
		topics: [],
		operations: [],
		license: [],
		tags: [],
		inputFormat: [],
		outputFormat: [],
	};
	for (const [stateKey, param] of Object.entries(FILTER_PARAM_MAP)) {
		const raw = query[param];
		if (raw) {
			filters[stateKey] = String(raw).split(',').filter(Boolean);
		}
	}
	return filters;
}
