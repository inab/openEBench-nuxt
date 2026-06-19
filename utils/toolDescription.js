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

// Reduce markdown / reStructuredText to plain prose, for tools whose only
// description entries carry markup. The goal is readable text with nothing that
// "stands out" once rendered — no emphasis markers, headings, link syntax, or
// RST directives, just the words.
export function stripMarkdown(text) {
	if (!text || typeof text !== 'string') {
		return '';
	}

	return (
		text
			// RST: directive / comment / hyperlink-target lines (`.. _ref: url`).
			.replace(/^[ \t]*\.\..*$/gm, '')
			// RST: substitution definitions (`.. |name| replace:: ...`) already
			// removed above; drop leftover `|name|` substitution references.
			.replace(/\|([^|]+)\|/g, '$1')
			// RST: external links `` `text <url>`_ `` -> text (drop the URL).
			.replace(/`([^`<]+?)\s*<[^>]+>`__?/g, '$1')
			// RST: `` `text`_ `` hyperlink references -> text.
			.replace(/`([^`]+)`__?/g, '$1')
			// RST: trailing reference underscore on a word (`name_`) -> name,
			// without touching in-word underscores like `file_name`.
			.replace(/([A-Za-z0-9])_{1,2}(?=[\s.,;:)\]]|$)/g, '$1')
			// Fenced code blocks -> keep inner text, drop the fences.
			.replace(/```[^\n]*\n?/g, '')
			// Images `![alt](url)` -> alt.
			.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
			// Links `[text](url)` -> text.
			.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
			// Inline code -> its contents.
			.replace(/`([^`]+)`/g, '$1')
			// Bold / italic markers (** __ * _) -> contents.
			.replace(/(\*\*|__)(.*?)\1/g, '$2')
			.replace(/(\*|_)(\S(?:.*?\S)?)\1/g, '$2')
			// Heading hashes and blockquote / bullet markers at line start.
			.replace(/^[ \t]*#{1,6}[ \t]+/gm, '')
			.replace(/^[ \t]*>[ \t]?/gm, '')
			.replace(/^[ \t]*[-*+][ \t]+/gm, '')
			// Setext underline / horizontal-rule lines (---, ===).
			.replace(/^[ \t]*(-{3,}|={3,})[ \t]*$/gm, '')
			// Collapse the whitespace left behind into single spaces.
			.replace(/\s+/g, ' ')
			.trim()
	);
}

// A line made up of a single repeated punctuation character (length >= 3),
// i.e. a markdown setext / RST heading underline or a horizontal rule.
function isUnderline(line) {
	const t = line.trim();
	return /^[=\-~^"'#*+.:_]{3,}$/.test(t) && /^(.)\1*$/.test(t);
}

const ATX_HEADING = /^[ \t]*#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/;

// Looks through markdown / RST `text` for a section whose heading matches
// `titleRe` (e.g. "Introduction" / "Overview"), supporting both ATX (`#`) and
// setext / RST underline headings, and returns its first paragraph as stripped
// plain text. Returns '' when no such section is found. This keeps README-style
// descriptions readable by showing the intro paragraph rather than the whole
// flattened document.
export function extractSectionParagraph(text, titleRe) {
	if (!text || typeof text !== 'string') {
		return '';
	}

	const lines = text.split('\n');
	for (let i = 0; i < lines.length; i++) {
		let title = null;
		let contentStart = -1;

		const atx = lines[i].match(ATX_HEADING);
		if (atx) {
			title = atx[1].trim();
			contentStart = i + 1;
		} else if (
			i + 1 < lines.length &&
			lines[i].trim() &&
			!isUnderline(lines[i]) &&
			isUnderline(lines[i + 1])
		) {
			title = lines[i].trim();
			contentStart = i + 2;
		}

		if (!title || !titleRe.test(title)) {
			continue;
		}

		// Skip blank lines, then collect the first paragraph (until a blank line
		// or the start of the next heading).
		let j = contentStart;
		while (j < lines.length && !lines[j].trim()) {
			j++;
		}
		const paragraph = [];
		for (; j < lines.length; j++) {
			const line = lines[j];
			if (!line.trim()) {
				break;
			}
			if (ATX_HEADING.test(line)) {
				break;
			}
			const next = lines[j + 1];
			if (next && isUnderline(next) && !isUnderline(line)) {
				break; // `line` is the next section's heading
			}
			paragraph.push(line);
		}

		const joined = stripMarkdown(paragraph.join(' '));
		if (joined) {
			return joined;
		}
	}

	return '';
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

// Section titles whose first paragraph makes the best short description.
const INTRO_HEADING = /^(introduction|overview)\s*:?$/i;

// Returns the text of the first non-markdown description entry. Falls back to
// the first entry's text when every entry looks like markdown, and to '' when
// the input is missing/empty/not an array.
export function pickDescription(description) {
	if (!Array.isArray(description) || description.length === 0) {
		return '';
	}

	const texts = description.map(entryText);
	const plain = texts.find((text) => text && !isMarkdownText(text));
	if (plain) {
		return plain;
	}

	// No plain-text entry. These are usually README-style documents, so prefer
	// the paragraph under an "Introduction"/"Overview" heading when present.
	const intro = texts
		.map((text) => extractSectionParagraph(text, INTRO_HEADING))
		.find(Boolean);
	if (intro) {
		return intro;
	}

	// Otherwise fall back to the first entry with its markup stripped so nothing
	// renders as markdown.
	const firstNonEmpty = texts.find((text) => text) || '';
	return stripMarkdown(firstNonEmpty);
}

// Reduce a single description string to readable plain text: returned untouched
// when it has no markup, otherwise the "Introduction"/"Overview" paragraph if
// present, else the whole thing with its markup stripped. Use this for
// descriptions that arrive as a plain string rather than the `description`
// array (e.g. similar-software cards).
export function plainDescription(text) {
	if (!text || typeof text !== 'string') {
		return '';
	}
	if (!isMarkdownText(text)) {
		return text.trim();
	}
	return extractSectionParagraph(text, INTRO_HEADING) || stripMarkdown(text);
}
