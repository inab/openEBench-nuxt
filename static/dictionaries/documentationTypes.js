// Documentation entries reach the frontend with a free-form `type` coming from
// several producers that do not share a vocabulary:
//   - the observatory API, in snake_case (`installation_instructions`, …)
//   - the metadata editor, as human-written text (`'installation guide'`, `'FAQs'`)
//   - github-metadata-api, which falls back to the containing directory name
//     (`root`, `docs`, `example`) for any file it could not classify
// These maps fold all of that onto one small set of display labels.

export const DOCUMENTATION_TYPE_ORDER = [
	'README',
	'Documentation',
	'Manual',
	'Installation',
	'Tutorial',
	'API',
	'FAQ',
	'Help',
	'Changelog',
	'Contributing',
	'Code of conduct',
	'Governance',
	'Citation',
	'License',
	'Terms of use',
];

// Label used for entries whose type carries no real category — the directory
// fallbacks above, generic types, and missing/empty values.
export const GENERIC_DOCUMENTATION_LABEL = 'Documentation';

const labels = {
	readme: 'README',

	general: GENERIC_DOCUMENTATION_LABEL,
	docs: GENERIC_DOCUMENTATION_LABEL,
	documentation: GENERIC_DOCUMENTATION_LABEL,
	root: GENERIC_DOCUMENTATION_LABEL,
	example: GENERIC_DOCUMENTATION_LABEL,
	other: GENERIC_DOCUMENTATION_LABEL,

	manual: 'Manual',
	usage: 'Manual',
	user_guide: 'Manual',
	userguide: 'Manual',

	installation: 'Installation',
	installation_instructions: 'Installation',
	installation_guide: 'Installation',
	inst_instr: 'Installation',
	build_instructions: 'Installation',
	requirements: 'Installation',

	tutorial: 'Tutorial',
	training_material: 'Tutorial',
	training: 'Tutorial',
	examples_of_use_cases: 'Tutorial',

	api: 'API',
	api_documentation: 'API',
	api_specification: 'API',

	faq: 'FAQ',
	faqs: 'FAQ',

	help: 'Help',
	helpdesk: 'Help',

	changelog: 'Changelog',
	release_notes: 'Changelog',
	release_policy: 'Changelog',

	contributing: 'Contributing',
	contribution_policy: 'Contributing',
	contributions_policy: 'Contributing',

	code_of_conduct: 'Code of conduct',
	governance: 'Governance',

	citation: 'Citation',
	citation_instructions: 'Citation',

	license: 'License',

	terms_of_use: 'Terms of use',
	termsuse: 'Terms of use',
};

// 'API specification' -> 'api_specification', ' Code-of-Conduct ' -> 'code_of_conduct'
function canonicalKey(rawType) {
	return String(rawType || '')
		.trim()
		.toLowerCase()
		.replace(/[\s-]+/g, '_');
}

function sentenceCase(key) {
	const text = key.replace(/_/g, ' ');
	return text.charAt(0).toUpperCase() + text.slice(1);
}

// Unknown types keep their meaning rather than being swallowed by the generic
// label — only empty/missing ones fall back to it.
export function getDocumentationTypeLabel(rawType) {
	const key = canonicalKey(rawType);
	if (!key) {
		return GENERIC_DOCUMENTATION_LABEL;
	}
	return labels[key] || sentenceCase(key);
}

function isLinkableUrl(url) {
	return typeof url === 'string' && /^https?:\/\/\S/.test(url.trim());
}

function orderIndex(label) {
	const index = DOCUMENTATION_TYPE_ORDER.indexOf(label);
	return index === -1 ? DOCUMENTATION_TYPE_ORDER.length : index;
}

/**
 * Whether a documentation item's URL is known to be broken, based on the
 * `availability` object `/tools?documentation_status=true` attaches to it.
 * Only a probe that failed (no response, or HTTP >= 400) counts; unprobed
 * items, items with no readings yet, or with no `availability` stay visible.
 *
 * @param {Object} term
 * @returns {boolean}
 */
export function isDocumentationUnavailable(term) {
	const availability = term?.availability;
	if (!availability?.monitored || !availability.latest) {
		return false;
	}
	const { code } = availability.latest;
	return code === null || code === undefined || Number(code) >= 400;
}

/**
 * Turns a tool's `documentation` array into the chips the entry page renders.
 *
 * Accepts both wire shapes: `/tools?id=` nests the payload under `term`, while
 * `/search` returns it flat. Entries that only carry inline `content` render no
 * chip, and entries whose URL is known to be unavailable are hidden, so both
 * are dropped here.
 *
 * @param {Array} documentation
 * @returns {Array<{label: string, url: string}>}
 */
export function buildDocumentationChips(documentation) {
	const byUrl = new Map();

	for (const entry of documentation || []) {
		const term = entry?.term ?? entry;
		if (!isLinkableUrl(term?.url) || isDocumentationUnavailable(term)) {
			continue;
		}

		const url = term.url.trim();
		const label = getDocumentationTypeLabel(term.type);
		const existing = byUrl.get(url);

		// The same URL is often listed under several types (e.g. a bioconda
		// README as both `general` and `installation_instructions`). Keep the
		// one that actually says something.
		if (!existing || existing.label === GENERIC_DOCUMENTATION_LABEL) {
			byUrl.set(url, { label, url });
		}
	}

	return [...byUrl.values()].sort((a, b) => {
		const byOrder = orderIndex(a.label) - orderIndex(b.label);
		if (byOrder !== 0) {
			return byOrder;
		}
		return a.label.localeCompare(b.label) || a.url.localeCompare(b.url);
	});
}
