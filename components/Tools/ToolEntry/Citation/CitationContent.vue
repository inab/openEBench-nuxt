<template>
	<v-container class="mt-0 pt-0 pl-8">
		<div>
			<v-row class="mt-0 pt-0 mb-2">
				<v-col cols="12" class="pt-0 mt-0 mb-0 pb-1">
					<span class="section-label d-flex align-center">
						Associated publications
						<!-- Añadir journal a las publicaciones, y si no tiene citas en europe PMC poner no citas available. poner un banner para dar explicacion de que sino sale una publicacion es porque no hay en PMC -->
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
								:style="{ backgroundColor: dotColors[i % dotColors.length] }"
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
									<template v-if="isLoadingCitations(item)">
										<v-chip small outlined class="citation-chip px-3 py-3">
											...
										</v-chip>
									</template>

									<template
										v-else-if="
											getCitationCount(item) !== null && item.term.pmid
										"
									>
										<v-chip
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
											{{ getCitationCount(item).toLocaleString() }} citations

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
									</template>

									<template v-else>
										<v-chip
											small
											outlined
											class="citation-chip px-3 py-3"
											color="grey"
										>
											<i
												class="fas fa-exclamation-circle mr-2"
												style="font-size: 12px"
											></i>
											No citation data — not indexed by Europe PMC
										</v-chip>
									</template>
									<!-- Year -->
									<v-chip v-if="item.term.year" small outlined color="">
										{{ item.term.year }}
									</v-chip>
									<!-- Journal -->
									<v-chip
										v-if="item.term.journal"
										small
										outlined
										color=""
										:href="'https://doi.org/' + item.term.doi"
										target="_blank"
									>
										{{ item.term.journal }}
									</v-chip>
								</div>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</div>
		<!-- Plot -->
		<div>
			<v-row class="mt-0 pt-0 mb-2">
				<v-col cols="12" class="mt-0 pt-0 pl-8 ml-4">
					<v-skeleton-loader v-if="isLoadingAnyCitation" type="image" />
					<CitationPlot
						v-else-if="citationPlotData.length > 0"
						:key="citationPlotData.length"
						:dataTraces="citationPlotData"
						:colors="citationPlotColors"
					/>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CitationPlot from './CitationPlot.vue';

export default {
	name: 'CitationContent',
	components: {
		CitationPlot,
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
			citations: 'citations',
			loadingCitations: 'loadingCitations',
		}),

		// Paleta centralizada
		dotColors() {
			return [
				'#4caf50',
				'#ff9800',
				'#2196f3',
				'#9467bd',
				'#795548',
				'#009688',
				'#f44336',
				'#ffc107',
				'#8bc34a',
				'#607d8b',
				'#3f51b5',
				'#e91e63',
			];
		},

		uniquePublications() {
			if (!this.tool || !this.tool.publication) return [];
			const seen = new Set();
			return this.tool.publication.filter((item) => {
				const doi = item.term && item.term.doi;
				if (!doi || seen.has(doi)) return false;
				if (item.term.error) return false;
				if (!item.term.title || !item.term.journal || !item.term.authors)
					return false;
				seen.add(doi);
				return true;
			});
		},

		citationPlotData() {
			if (!this.citations || !this.uniquePublications.length) return [];

			const result = [];

			this.uniquePublications.forEach((item, index) => {
				const key = this.getKey(item);
				const entry = this.citations[key];
				if (!entry || !entry.item) return;

				const europePmc = entry.item.find((s) => s.source === 'Europe PMC');
				if (!europePmc || !europePmc.count) return;

				const dataByYear = Object.entries(europePmc.count)
					.filter(([year]) => !isNaN(year))
					.map(([year, citations]) => ({
						year: parseInt(year),
						citations,
					}))
					.sort((a, b) => a.year - b.year);

				if (dataByYear.length === 0) return;

				const id = item.term.doi || item.term.pmid || `pub-${index}`;

				result.push({
					id,
					label: item.term.title,
					title: item.term.title,
					year: item.term.year,
					url: item.term.doi ? `https://doi.org/${item.term.doi}` : null,
					data: dataByYear,
					// El color se asigna por el índice en uniquePublications, no en result
					color: this.dotColors[index % this.dotColors.length],
				});
			});

			return result;
		},

		// Colores solo de las publicaciones que SÍ están en el gráfico, en el mismo orden
		citationPlotColors() {
			return this.citationPlotData.map((item) => item.color);
		},

		isLoadingAnyCitation() {
			if (!this.loadingCitations) return false;
			return Object.values(this.loadingCitations).includes((v) => v === true);
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

.section-label {
	font-size: 1.2rem !important;
	color: rgba(0, 0, 0, 50%);
	font-weight: 500;
	margin-bottom: 8px;
}
</style>
