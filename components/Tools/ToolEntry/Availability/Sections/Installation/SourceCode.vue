<template>
	<div class="source-code-wrapper">
		Repositories where you can browse, clone, or contribute to this tool's
		source code.

		<div
			:class="[
				'repo-grid',
				'mt-2',
				`repo-grid--count-${mergedRepositories.length}`,
			]"
		>
			<div v-for="repo in mergedRepositories" :key="repo.url" class="repo-item">
				<span class="repo-badge" :style="badgeStyle(repo.url)">
					{{ repoMeta(repo.url).platform }}
				</span>

				<v-tooltip v-if="isLong(repo.url)" bottom max-width="320">
					<template #activator="{ on, attrs }">
						<a
							:href="repo.url"
							target="_blank"
							rel="noopener noreferrer"
							class="repo-link repo-link--truncated"
							v-bind="attrs"
							v-on="on"
						>
							{{ repo.url }}
							<v-icon size="12" class="ext-icon"> mdi-open-in-new </v-icon>
						</a>
					</template>
					<span>{{ repo.url }}</span>
				</v-tooltip>

				<a
					v-else
					:href="repo.url"
					target="_blank"
					rel="noopener noreferrer"
					class="repo-link"
				>
					{{ repo.url }}
					<v-icon size="12" class="ext-icon"> mdi-open-in-new </v-icon>
				</a>
			</div>
		</div>

		<div v-if="mergedRepositories.length === 0" class="no-repo">
			No source code repositories available.
		</div>
	</div>
</template>

<script>
const SOURCE_CODE_LABEL_KEYS = [
	'github',
	'gitlab',
	'bitbucket',
	'sourceforge',
	'bioconductor',
];

const REPO_META = [
	{
		match: 'github.com',
		platform: 'GitHub',
		badgeBg: '#f0f0f0',
		badgeColor: '#24292e',
	},
	{
		match: 'gitlab',
		platform: 'GitLab',
		badgeBg: '#fff1ea',
		badgeColor: '#e05a1a',
	},
	{
		match: 'bitbucket.org',
		platform: 'Bitbucket',
		badgeBg: '#e6eeff',
		badgeColor: '#0052cc',
	},
	{
		match: 'sourceforge.net',
		platform: 'SourceForge',
		badgeBg: '#fff0e6',
		badgeColor: '#cc5200',
	},
	{
		match: 'bioconductor.org',
		platform: 'Bioconductor',
		badgeBg: '#e6f2fb',
		badgeColor: '#1a81c2',
	},
];

const FALLBACK_META = {
	platform: 'Repository',
	badgeBg: '#f0f0f0',
	badgeColor: '#555555',
};

const URL_LONG_THRESHOLD = 45;

export default {
	name: 'SourceCode',
	props: {
		repositories: {
			type: Array,
			default: () => [],
		},
		sourcesLabels: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		mergedRepositories() {
			const seen = new Set();
			const result = [];

			const add = (url) => {
				if (!url) return;

				const normalized = url.trim().replace(/\/$/, '');

				if (seen.has(normalized)) return;

				seen.add(normalized);
				result.push({ url: normalized });
			};
			for (const repo of this.repositories) {
				add(repo.term);
			}

			for (const key of SOURCE_CODE_LABEL_KEYS) {
				if (this.sourcesLabels[key]) {
					add(this.sourcesLabels[key]);
				}
			}

			return result;
		},
	},
	methods: {
		repoMeta(url) {
			return REPO_META.find((m) => url.includes(m.match)) || FALLBACK_META;
		},
		badgeStyle(url) {
			const meta = this.repoMeta(url);
			return {
				backgroundColor: meta.badgeBg,
				color: meta.badgeColor,
			};
		},
		isLong(url) {
			return url.length > URL_LONG_THRESHOLD;
		},
	},
};
</script>

<style scoped>
.source-code-wrapper {
	width: 100%;
}

.repo-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 8px;
	width: 100%;
}

/* 1 item → full width */
.repo-grid--count-1 {
	grid-template-columns: 1fr;
}

/* 2 items → each takes half */
.repo-grid--count-2 {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.repo-item {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 10px 12px;
	background: #fafafa;
	border-radius: 8px;
	min-width: 0;
	transition: background-color 0.2s ease;
}

.repo-item:hover {
	background: #f5f5f5;
}

.repo-badge {
	width: fit-content;
	font-size: 0.7rem;
	font-weight: 600;
	letter-spacing: 0.02em;
	padding: 1px 7px;
	border-radius: 4px;
}

.repo-link {
	padding-top: 8px;
	border-top: 1px solid #ececec;
	font-size: 0.8rem;
	font-family: monospace;
	color: #0b579f;
	text-decoration: none;
	line-height: 1.4;
	word-break: break-all;
}

.repo-link--truncated {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: normal;
}

.repo-link:hover {
	text-decoration: underline;
}

.ext-icon {
	vertical-align: middle;
	color: #9e9e9e;
}

.no-repo {
	font-size: 0.875rem;
	color: #9e9e9e;
}
</style>
