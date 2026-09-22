import {
	buildDocumentationChips,
	getDocumentationTypeLabel,
	isDocumentationUnavailable,
} from './documentationTypes';

const nested = (type, url) => ({ id: 0, term: { type, url, content: null } });

describe('getDocumentationTypeLabel', () => {
	it('folds API snake_case types onto their family', () => {
		expect(getDocumentationTypeLabel('installation_instructions')).toBe(
			'Installation'
		);
		expect(getDocumentationTypeLabel('release_notes')).toBe('Changelog');
		expect(getDocumentationTypeLabel('training_material')).toBe('Tutorial');
		expect(getDocumentationTypeLabel('citation_instructions')).toBe('Citation');
		expect(getDocumentationTypeLabel('code_of_conduct')).toBe(
			'Code of conduct'
		);
	});

	it('folds the free text written by the metadata editor', () => {
		expect(getDocumentationTypeLabel('installation guide')).toBe(
			'Installation'
		);
		expect(getDocumentationTypeLabel('API specification')).toBe('API');
		expect(getDocumentationTypeLabel('FAQs')).toBe('FAQ');
		expect(getDocumentationTypeLabel('examples of use cases')).toBe('Tutorial');
		expect(getDocumentationTypeLabel(' Code-of-Conduct ')).toBe(
			'Code of conduct'
		);
	});

	it('replaces the directory-name fallbacks with a generic label', () => {
		expect(getDocumentationTypeLabel('root')).toBe('Documentation');
		expect(getDocumentationTypeLabel('docs')).toBe('Documentation');
		expect(getDocumentationTypeLabel('example')).toBe('Documentation');
		expect(getDocumentationTypeLabel('general')).toBe('Documentation');
	});

	it('falls back to the generic label for empty or missing types', () => {
		expect(getDocumentationTypeLabel('')).toBe('Documentation');
		expect(getDocumentationTypeLabel('   ')).toBe('Documentation');
		expect(getDocumentationTypeLabel(null)).toBe('Documentation');
		expect(getDocumentationTypeLabel(undefined)).toBe('Documentation');
	});

	it('keeps unknown types readable instead of discarding them', () => {
		expect(getDocumentationTypeLabel('benchmark_report')).toBe(
			'Benchmark report'
		);
	});
});

describe('buildDocumentationChips', () => {
	it('handles a missing or empty documentation array', () => {
		expect(buildDocumentationChips(undefined)).toEqual([]);
		expect(buildDocumentationChips(null)).toEqual([]);
		expect(buildDocumentationChips([])).toEqual([]);
	});

	it('reads the nested shape returned by /tools', () => {
		expect(
			buildDocumentationChips([nested('manual', 'https://example.org/manual')])
		).toEqual([{ label: 'Manual', url: 'https://example.org/manual' }]);
	});

	it('reads the flat shape returned by /search', () => {
		expect(
			buildDocumentationChips([
				{ type: 'manual', url: 'https://example.org/manual', content: null },
			])
		).toEqual([{ label: 'Manual', url: 'https://example.org/manual' }]);
	});

	it('drops entries without a usable link', () => {
		expect(
			buildDocumentationChips([
				{ id: 0, term: { type: 'help', url: null, content: 'inline text' } },
				nested('manual', ''),
				nested('manual', '   '),
				nested('manual', 'not-a-url'),
				nested('manual', 'ftp://example.org/manual'),
			])
		).toEqual([]);
	});

	it('deduplicates a repeated URL, preferring the specific label', () => {
		const url = 'https://bioconda.github.io/recipes/bwa/README.html';

		expect(
			buildDocumentationChips([
				nested('installation_instructions', url),
				nested('general', url),
			])
		).toEqual([{ label: 'Installation', url }]);

		// …and independently of the order the API listed them in
		expect(
			buildDocumentationChips([
				nested('general', url),
				nested('installation_instructions', url),
			])
		).toEqual([{ label: 'Installation', url }]);
	});

	it('orders chips by family rather than by API order', () => {
		const chips = buildDocumentationChips([
			nested('license', 'https://example.org/license'),
			nested('docs', 'https://example.org/docs'),
			nested('readme', 'https://example.org/readme'),
			nested('installation', 'https://example.org/install'),
		]);

		expect(chips.map((chip) => chip.label)).toEqual([
			'README',
			'Documentation',
			'Installation',
			'License',
		]);
	});

	it('sorts unknown labels after the known families', () => {
		const chips = buildDocumentationChips([
			nested('benchmark_report', 'https://example.org/benchmark'),
			nested('license', 'https://example.org/license'),
		]);

		expect(chips.map((chip) => chip.label)).toEqual([
			'License',
			'Benchmark report',
		]);
	});

	it('keeps distinct URLs that share a label', () => {
		const chips = buildDocumentationChips([
			nested('docs', 'https://example.org/docs/a.md'),
			nested('docs', 'https://example.org/docs/b.md'),
		]);

		expect(chips).toHaveLength(2);
		expect(chips.every((chip) => chip.label === 'Documentation')).toBe(true);
	});

	describe('with URL availability', () => {
		const probed = (url, code) => ({
			id: 0,
			term: {
				type: 'manual',
				url,
				content: null,
				availability: {
					monitored: true,
					latest: { date: '2026-09-14T11:04:04Z', code, access_time: 0.47 },
				},
			},
		});

		it('hides URLs that are unreachable or return an HTTP error', () => {
			expect(
				buildDocumentationChips([
					probed('https://example.org/unreachable', null),
					probed('https://example.org/not-found', 404),
					probed('https://example.org/server-error', 500),
				])
			).toEqual([]);
		});

		it('keeps URLs that respond successfully or redirect', () => {
			const chips = buildDocumentationChips([
				probed('https://example.org/ok', 200),
				probed('https://example.org/moved', 301),
			]);

			expect(chips.map((chip) => chip.url)).toEqual([
				'https://example.org/moved',
				'https://example.org/ok',
			]);
		});

		it('keeps URLs whose status is unknown', () => {
			const withAvailability = (url, availability) => ({
				id: 0,
				term: { type: 'manual', url, content: null, availability },
			});

			const chips = buildDocumentationChips([
				withAvailability('https://example.org/not-probed', {
					monitored: false,
					latest: null,
				}),
				withAvailability('https://example.org/no-readings', {
					monitored: true,
					latest: null,
				}),
				nested('manual', 'https://example.org/no-key'),
				{ type: 'manual', url: 'https://example.org/flat', content: null },
			]);

			expect(chips).toHaveLength(4);
		});

		it('keeps a duplicated URL when it is available', () => {
			const url = 'https://example.org/readme';
			const entry = probed(url, 200);
			entry.term.type = 'general';

			expect(buildDocumentationChips([entry, probed(url, 200)])).toEqual([
				{ label: 'Manual', url },
			]);
		});
	});
});

describe('isDocumentationUnavailable', () => {
	it('ignores terms without availability data', () => {
		expect(isDocumentationUnavailable(undefined)).toBe(false);
		expect(isDocumentationUnavailable({ url: 'https://example.org' })).toBe(
			false
		);
	});
});
