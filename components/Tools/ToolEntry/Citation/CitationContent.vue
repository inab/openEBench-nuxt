<template>
	<v-container class="mt-0 pt-0 pl-8">
		<div>
			<v-row class="mt-0 pt-0 mb-2">
				<v-col cols="12" class="pt-0 mt-0 mb-0 pb-1">
					<span class="text-subtitle d-flex align-center">
						<div class="pub-line mr-3 flex-shrink-0 dot-black"></div>
						Associated publications
					</span>
				</v-col>

				<v-col cols="12" class="mt-0 pt-0 pl-8 ml-4">
					<p
						v-if="uniquePublications.length === 0"
						class="text--secondary text-body-2"
					>
						No publications available.
					</p>

					<div
						v-for="(item, i) in uniquePublications"
						:key="item.term.doi || i"
						class="publication-card"
						:class="{ 'mb-4': i < uniquePublications.length - 1 }"
					>
						<div class="d-flex align-start">
							<!-- Círculo decorativo -->
							<div
								class="pub-dot mr-3 flex-shrink-0"
								:class="dotColor(i)"
							></div>

							<div class="flex-grow-1">
								<!-- Title -->
								<a
									v-if="item.term.doi"
									:href="'https://doi.org/' + item.term.doi"
									target="_blank"
									class="publication-title"
									>{{ item.term.title }}</a
								>
								<span v-else class="publication-title">{{
									item.term.title
								}}</span>

								<!-- Authors -->
								<div class="text-body-2 text--secondary mt-1">
									{{ item.term.authors }}
								</div>

								<!-- Chips row . citations-->
								<div
									class="d-flex align-center flex-wrap mt-2"
									style="gap: 8px"
								>
									<v-chip
										v-if="item.term.pmid"
										small
										outlined
										class="citation-chip px-3 py-3"
										@click="
											openLink(
												'https://europepmc.org/article/MED/' + item.term.pmid
											)
										"
										style="cursor: pointer"
									>
										<template v-if="isLoadingCitations(item)">...</template>
										<template v-else-if="getCitationCount(item) !== null">
											{{ getCitationCount(item).toLocaleString() }} citations
										</template>
										<template v-else>0 citations</template>

										<span class="mx-2 text--disabled"></span>

										<img
											src="https://europepmc.org/favicon.ico"
											alt="Europe PMC"
											style="
												width: 14px;
												height: 14px;
												margin-right: 5px;
												vertical-align: middle;
											"
										/>
										Europe PMC
									</v-chip>
									<!-- Year -->
									<v-chip v-if="item.term.year" small outlined color="">
										{{ item.term.year }}
									</v-chip>
								</div>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'CitationContent',

	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
			citations: 'citations',
			loadingCitations: 'loadingCitations',
		}),

		uniquePublications() {
			if (!this.tool || !this.tool.publication) return [];
			const seen = new Set();
			return this.tool.publication.filter((item) => {
				const doi = item.term && item.term.doi;
				if (!doi || seen.has(doi)) return false;
				seen.add(doi);
				return true;
			});
		},
	},

	watch: {
		uniquePublications: {
			immediate: true,
			handler(publications) {
				if (!publications || publications.length === 0) return;
				publications.forEach((item) => {
					const doi = item.term && item.term.doi;
					const pmid = item.term && item.term.pmid;
					const title = item.term && item.term.title;
					this.fetchCitations({ doi, pmid, title });
				});
			},
		},
	},

	methods: {
		...mapActions('tool_entry', ['fetchCitations']),

		openLink(url) {
			window.open(url, '_blank');
		},

		dotColor(index) {
			const colors = ['dot-green', 'dot-orange', 'dot-blue', 'dot-teal'];
			return colors[index % colors.length];
		},

		getKey(item) {
			return (
				(item.term && item.term.doi) ||
				(item.term && item.term.pmid) ||
				(item.term && item.term.title)
			);
		},

		getCitationCount(item) {
			const key = this.getKey(item);
			if (!this.citations || !this.citations[key]) return null;
			const entry = this.citations[key];
			if (!entry.item) return null;
			const europePmc = entry.item.find((s) => s.source === 'Europe PMC');
			return europePmc && europePmc.count ? europePmc.count.total : null;
		},

		isLoadingCitations(item) {
			const key = this.getKey(item);
			if (!this.loadingCitations) return false;
			return !!this.loadingCitations[key];
		},
	},
};
</script>

<style scoped>
.publication-card {
	padding: 12px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 7%);
}

.publication-card:last-child {
	border-bottom: none;
}

.publication-title {
	font-weight: 600;
	font-size: 0.92rem;
	color: rgba(0, 0, 0, 87%);
	line-height: 1.4;
	text-decoration: none;
}

.publication-title:hover {
	color: #1976d2;
	text-decoration: underline;
}

.citation-chip {
	font-size: 0.78rem;
}

.europe-pmc-chip {
	font-size: 0.78rem;
}

.pub-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-top: 4px;
	flex-shrink: 0;
}

.pub-line {
	width: 2px;
	height: 20px;
	flex-shrink: 0;
}

.dot-black {
	background-color: rgba(17, 16, 16, 95%);
}

.dot-green {
	background-color: #4caf50;
}

.dot-orange {
	background-color: #ff9800;
}

.dot-blue {
	background-color: #2196f3;
}

.dot-teal {
	background-color: #009688;
}
</style>
