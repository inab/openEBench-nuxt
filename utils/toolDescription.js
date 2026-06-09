// Helpers for choosing which entry of a tool's `description` array to display.
//
// The API returns `description` as an array of entries whose text lives in
// `term` (e.g. `[{ term: "Multiple aligner.", id: 1 }]`). Some terms are plain
// prose, others are markdown / reStructuredText pulled from a tool's README or
// Galaxy help. The catalogue renders descriptions through `marked()`, so a
// markdown/RST term shows up as raw or awkward markup. `pickDescription`
// prefers the first plain-text entry so the card/detail view reads cleanly.

// Conservative heuristic: true when the string carries markdown/RST markers.
// Ordinary prose (including sentences with hyphens or single asterisks inside
// words) should return false.
export function isMarkdownText(text) {
	if (!text || typeof text !== 'string') {
		return false;
	}

	// Inline markers, anywhere in the string.
	const inlinePatterns = [
		/\*\*[^*]+\*\*/, // **bold**
		/__[^_]+__/, // __bold__
		/\*[^*\s][^*]*\*/, // *italic*
		/`[^`]+`/, // `code`
		/!?\[[^\]]+\]\([^)]+\)/, // [text](url) and ![alt](url)
		/`[^`]+`_/, // `ref`_  (RST hyperlink reference)
	];
	if (inlinePatterns.some((re) => re.test(text))) {
		return true;
	}

	// Line-level markers.
	const lines = text.split('\n');
	const linePatterns = [
		/^\s*\.\.\s/, // RST directive / comment
		/^\s*__\s/, // RST anonymous hyperlink target
		/^\s*#{1,6}\s/, // # heading
		/^\s*[-*]\s/, // - or * bullet list
		/^\s*>\s/, // > blockquote
		/^\s*(-{3,}|={3,})\s*$/, // --- / === heading underline or hr
		/::\s*$/, // RST literal block marker
	];
	return lines.some((line) => linePatterns.some((re) => re.test(line)));
}

// Normalise a single description entry to its text. Entries may be
// `{ term: "..." }` objects or plain strings.
function entryText(entry) {
	if (entry == null) {
		return '';
	}
	const value = typeof entry === 'object' ? entry.term : entry;
	return typeof value === 'string' ? value : '';
}

// Returns the text of the first non-markdown description entry. Falls back to
// the first entry's text when every entry looks like markdown, and to '' when
// the input is missing/empty/not an array.
export function pickDescription(description) {
	if (!Array.isArray(description) || description.length === 0) {
		return '';
	}

	const texts = description.map(entryText);
	const plain = texts.find((text) => text && !isMarkdownText(text));

	return plain || texts[0] || '';
}
