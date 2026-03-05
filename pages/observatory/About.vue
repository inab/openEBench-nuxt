<template>
	<div>
		<v-container class="about-wrap">
			<!-- Header -->
			<div class="text-h4 title-about mb-2">About the Software Observatory</div>

			<p class="text-body-1 mb-6">
				The Software Observatory aggregates and analyses research software
				metadata across the Life Sciences. It integrates records from multiple
				registries and repositories, resolves duplicates, enriches metadata
				where possible, and computes
				<span class="font-weight-bold">FAIRsoft</span> indicators to support
				trends analysis and software FAIRness assessment.
			</p>

			<!-- Quick navigation -->
			<v-card outlined elevation="0" rounded="lg" class="pa-4 mb-8">
				<div class="text-subtitle-1 font-weight-medium mb-2">On this page</div>
				<div class="toc">
					<a href="#methodology" class="toc-link">Methodology</a>
					<a href="#fairsoft" class="toc-link">FAIRsoft indicators</a>
					<a href="#developers" class="toc-link">For developers</a>
					<a href="#cite" class="toc-link">How to cite</a>
					<a href="#terms" class="toc-link">Terms of use</a>
				</div>
			</v-card>

			<!-- Methodology -->
			<section id="methodology" class="section">
				<div class="section-title">Methodology</div>

				<p class="text-body-2 mb-4">
					The Software Observatory builds an analysis-ready dataset by ingesting
					software metadata from multiple sources, harmonising and enriching it,
					resolving duplicates, and computing FAIRsoft indicators used across
					dashboards and evaluations.
				</p>

				<v-card outlined elevation="0" rounded="lg" class="pa-4">
					<v-img
						:src="pipelineIllustration"
						contain
						max-height="520"
						class="mb-3 mt-2"
						alt="Overview of the Software Observatory data pipeline: ingestion, normalisation, blocking, identity resolution, merging, and FAIRsoft/statistics computation."
					/>
					<div class="text-body-2 grey--text">
						Overview of the main and auxiliary pipelines that consolidate and
						enrich software metadata into the dataset used by the Software
						Observatory.
					</div>
				</v-card>

				<ul class="mt-4 mb-4 text-body-2">
					<li>
						<span class="font-weight-bold">Ingest</span> metadata from multiple
						registries and repositories.
					</li>
					<li>
						<span class="font-weight-bold">Normalise &amp; enrich</span> key
						fields to improve consistency across sources.
					</li>
					<li>
						<span class="font-weight-bold">Block candidates</span> using
						heuristics to reduce comparisons for identity resolution.
					</li>
					<li>
						<span class="font-weight-bold">Resolve duplicates</span> with
						automated decisions (LLMs) and human review for conflicts.
					</li>
					<li>
						<span class="font-weight-bold">Merge</span> into unique software
						entries and compute
						<span class="font-weight-bold">FAIRsoft</span> indicators and
						summary statistics.
					</li>
				</ul>

				<p class="text-body-2 mb-0 minor-link">
					Find more details on the methodology in the preprint
					<a
						href="https://arxiv.org/abs/2510.05705"
						target="_blank"
						rel="noopener noreferrer"
						class="minor-link"
						>arXiv:2510.05705</a
					>.
				</p>
			</section>

			<!-- FAIRsoft -->
			<section id="fairsoft" class="section">
				<div class="section-title">FAIRsoft indicators</div>

				<p class="text-body-2 mb-3">
					The Observatory uses <span class="font-weight-bold">FAIRsoft</span> as
					a practical implementation of the FAIR principles for research
					software. Indicators are computed from available metadata and
					presented both as aggregated views (dashboards) and tool-level
					assessments through the FAIRsoft Evaluator.
				</p>

				<p class="text-body-2 grey--text mb-0 minor-link">
					More information is available in the
					<a
						href="/observatory/fairsoft"
						target="_blank"
						rel="noopener noreferrer"
						class="minor-link"
						>FAIRsoft documentation</a
					>
					and in the publication
					<a
						href="https://doi.org/10.1093/bioinformatics/btae464"
						target="_blank"
						rel="noopener noreferrer"
						class="minor-link"
					>
						<i
							>“FAIRsoft – A practical implementation of FAIR principles for
							research software”</i
						> </a
					>.
				</p>
			</section>

			<!-- Developers -->
			<section id="developers" class="section">
				<div class="section-title">For developers</div>

				<p class="text-body-2 mb-4">
					If you want to integrate the Observatory in your own workflows, you
					can access metadata and evaluation results via the REST APIs and
					follow the programmatic tutorial for FAIRsoft indicator calculation.
				</p>

				<v-row dense class="mb-4">
					<v-col cols="12" md="6">
						<v-card outlined elevation="0" rounded="lg" class="pa-4 h-100">
							<div class="d-flex align-center mb-2">
								<v-icon class="mr-2 icon">mdi-api</v-icon>
								<div class="font-weight-bold">Software Observatory API</div>
							</div>
							<div class="text-body-2 mb-3">
								Access integrated software metadata, statistics, and FAIRsoft
								evaluation results.
							</div>
							<div class="text-body-2">
								<a
									href="https://observatory.openebench.bsc.es/docs/api/"
									target="_blank"
									rel="noopener noreferrer"
								>
									API documentation
								</a>
							</div>
						</v-card>
					</v-col>

					<v-col cols="12" md="6">
						<v-card outlined elevation="0" rounded="lg" class="pa-4 h-100">
							<div class="d-flex align-center mb-2">
								<v-icon class="mr-2 icon">mdi-source-repository</v-icon>
								<div class="font-weight-bold">GitHub Metadata API</div>
							</div>
							<div class="text-body-2 mb-3">
								Extract rich metadata from GitHub repositories.
							</div>
							<div class="text-body-2">
								<a
									href="https://observatory.openebench.bsc.es/github-metadata-api/api-docs/"
									target="_blank"
									rel="noopener noreferrer"
								>
									API documentation
								</a>
							</div>
						</v-card>
					</v-col>
				</v-row>

				<v-card outlined elevation="0" rounded="lg" class="pa-4">
					<div class="d-flex align-center mb-2">
						<v-icon class="mr-2 icon">mdi-code-tags</v-icon>
						<div class="font-weight-bold">Programmatic FAIRsoft evaluation</div>
					</div>
					<div class="text-body-2 mb-2">
						Learn how to compute FAIRsoft indicators for GitHub repositories
						using the Observatory APIs.
					</div>
					<div class="text-body-2">
						<a
							href="/observatory/fairsoft/tutorial"
							target="_blank"
							rel="noopener noreferrer"
						>
							View the notebook
						</a>
					</div>
				</v-card>
			</section>

			<!-- Citation -->
			<section id="cite" class="section">
				<div class="section-title">How to cite</div>

				<p class="text-body-2 mb-3">
					If you use the Software Observatory in your work, please cite the
					following publication:
				</p>

				<v-card outlined elevation="0" rounded="lg" class="pa-4">
					<div class="citation-article mb-1">
						The Software Observatory: aggregating and analysing software
						metadata for trend computation and FAIR assessment
					</div>

					<div class="text-body-2">
						Eva Martín del Pico, Josep Lluís Gelpí, Salvador
						Capella-Gutiérrez<br />
						<i>arXiv preprint</i>, 2025.<br />
						arXiv:
						<a
							href="https://arxiv.org/abs/2510.05705"
							target="_blank"
							rel="noopener noreferrer"
							>2510.05705</a
						>
					</div>
				</v-card>
			</section>

			<!-- Terms -->
			<section id="terms" class="section">
				<div class="section-title">Terms of use</div>

				<p class="text-body-2 mb-0">
					All data is distributed under a
					<a
						href="https://creativecommons.org/licenses/by-nd/2.0/"
						target="_blank"
						rel="noopener noreferrer"
						>CC-BY-ND</a
					>
					license.
				</p>
			</section>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'About',
	layout: 'observatory',
	data() {
		return {
			pipelineIllustration: require('~/static/images/observatory/pipeline.png'),
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: 'https://openebench.bsc.es/',
				},
				{
					text: 'Observatory',
					disabled: false,
					exact: true,
					to: '/observatory',
				},
				{
					text: 'About',
					disabled: true,
					exact: true,
					to: '/observatory/About',
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>

<style scoped>
.about-wrap {
	max-width: 980px; /* narrower = clearer reading column */
}

.title-about {
	color: #0b579f;
}

.section {
	padding-top: 18px;
	margin-top: 18px;
}

.section + .section {
	border-top: 1px solid rgba(0, 0, 0, 8%);
}

.section-title {
	font-size: 1.1rem;
	font-weight: 700;
	margin-bottom: 10px;
}

.toc {
	display: flex;
	flex-wrap: wrap;
	gap: 10px 14px;
}

.toc-link {
	text-decoration: none;
	font-weight: 600;
	color: #0b579f;
}

.icon {
	color: #0b579f;
}

.h-100 {
	height: 100%;
}

.citation-article {
	font-size: 1rem !important;
	font-weight: 600;
}

.minor-link {
	color: grey !important;
}
</style>
