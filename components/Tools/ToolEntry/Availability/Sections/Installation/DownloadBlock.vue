<template>
	<div class="download-wrapper">
		<div
			v-for="(items, source) in groupedDownloads"
			:key="source"
			class="download-section"
		>
			<!-- Full-width subtle separator header -->
			<div class="section-header">
				{{ source }}
			</div>

			<div v-for="(url, i) in items" :key="i" class="download-row">
				<a
					class="download-link"
					:href="url"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ formatFileName(url) }}
				</a>
			</div>
		</div>

		<div v-if="!hasDownloads" class="empty">
			No downloadable sources available.
		</div>
	</div>
</template>

<script>
export default {
	name: 'DownloadBlock',
	props: {
		packages: {
			type: Array,
			default: () => [],
		},
	},

	computed: {
		hasDownloads() {
			return Array.isArray(this.packages) && this.packages.length > 0;
		},

		groupedDownloads() {
			if (!this.hasDownloads) return {};

			return this.packages.reduce((acc, url) => {
				let group = 'Other';

				try {
					const host = new URL(url).hostname;

					if (host.includes('bioconductor.org')) group = 'Bioconductor';
					else if (host.includes('github.com')) group = 'GitHub';
					else if (host.includes('galaxyproject')) group = 'Galaxy Project';
					else if (host.includes('drive5.com')) group = 'Drive5';
					else group = host.replace('www.', '');
				} catch (e) {
					group = 'Other';
				}

				if (!acc[group]) acc[group] = [];
				acc[group].push(url);

				return acc;
			}, {});
		},
	},

	methods: {
		formatFileName(url) {
			try {
				return url.split('/').pop().split('?')[0];
			} catch {
				return url;
			}
		},

		async copy(url) {
			try {
				await navigator.clipboard.writeText(url);
			} catch (e) {
				console.warn('Copy failed:', e);
			}
		},
	},
};
</script>

<style scoped>
.download-wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 12px;
	width: 100%;
}

.download-section {
	display: flex;
	flex-direction: column;
	gap: 2px;
	min-width: 0;
	width: 100%;
	break-inside: avoid;
}

.section-header {
	width: 100%;
	margin-top: 10px;
	margin-bottom: 4px;
	font-size: 0.85rem;
	font-weight: 600;
	color: rgba(0, 0, 0, 55%);
	border-bottom: 1px solid rgba(0, 0, 0, 8%);
	padding-bottom: 2px;
}

.download-row {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
	padding: 2px 0;
}

.download-row:hover {
	background: rgba(0, 0, 0, 2%);
}

.download-link {
	font-size: 0.85rem;
	color: #283593;
	text-decoration: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.download-link:hover {
	text-decoration: underline;
}

.empty {
	padding: 8px;
	color: rgba(0, 0, 0, 45%);
	font-size: 0.9rem;
}
</style>
