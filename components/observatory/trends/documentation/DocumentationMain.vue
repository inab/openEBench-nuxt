<template>
	<v-card outlined elevation="2" class="pr-8 pb-6">
		<!-- Options Button -->
		<PlotWOptions class="copy-icon" :items="dialogItems" />

		<!-- Header + content -->
		<v-row class="mb-0 pb-0" justify="center">
			<v-col md="11" lg="11" sm="10" xs="12" class="ml-8 mt-5 mb-pd-0">
				<h6 class="text-center mt-6 mb-2">Documentation</h6>

				<v-row class="mt-4" align="stretch">
					<!-- Description (left / large) -->
					<v-col cols="12" lg="9">
						<p
							style="line-height: 1.8"
							class="card-content-vs text-sm text-gray-700"
						>
							Documentation plays a crucial role in making software
							understandable, installable, and usable by others. Evaluating the
							presence and type of documentation—such as READMEs, user guides,
							or API references—helps assess a tool’s
							<span class="highlight">Findability</span>,
							<span class="highlight">Accessibility</span>, and
							<span class="highlight">Reusability</span>.
						</p>
						<p
							style="line-height: 1.8"
							class="card-content-vs text-sm text-gray-700 mt-2"
						>
							Good documentation enables transparent use, adaptation, and
							integration of software across research contexts.
						</p>
					</v-col>

					<!-- Percentage card (right / small) -->
					<v-col cols="10" lg="3" class="d-flex">
						<v-skeleton-loader
							v-if="isDocumentationCountLoading"
							class="flex-grow-1"
							type="card"
						/>
						<div
							v-else
							class="doc-percentage-card d-flex flex-column justify-center align-center text-center"
						>
							<span class="doc-percentage mb-1"
								>{{ percentage.toFixed(1) }}%</span
							>
							<p class="font-weight-light mb-0">
								of software have
								<span class="font-weight-bold">documentation</span>
							</p>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<!-- Plot -->
		<v-row class="mt-0 pt-0" justify="space-around" align="center">
			<v-col xl="11" lg="11" md="11" sm="11" cols="11">
				<v-skeleton-loader
					v-if="isDocumentationLoading"
					class="mb-5 ml-10 mr-10"
					type="card"
				/>

				<div v-else>
					<DocumentationPlot v-if="checkData" :data="documentationPlotData" />
					<noDataAvailable v-else info="documentation" />
				</div>
			</v-col>

			<v-col xl="10" lg="10" md="10" sm="12" align-self="start">
				<p class="mt-0 mb-2 ml-8">
					<span class="highlight">
						Overview of documentation types and their availability in different
						formats across the collection.
					</span>
				</p>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import DocumentationPlot from './DocumentationPlot.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';
import noDataAvailable from '~/layouts/noDataAvailable.vue';
import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js';

export default {
	name: 'DocumentationMain',
	components: {
		DocumentationPlot,
		PlotWOptions,
		noDataAvailable,
	},
	data() {
		return {
			dialogItems: [embedCodes.documentation],
		};
	},
	computed: {
		...mapGetters('observatory/trends', {
			documentation: 'Documentation',
			documentationCount: 'DocumentationCount',
			loaded: 'Loaded',
		}),

		isDocumentationLoading() {
			return this.loaded?.documentation === true;
		},
		isDocumentationCountLoading() {
			return this.loaded?.documentationCount === true;
		},

		// v3: trends.DocumentationCount.data.percentage * 100
		percentage() {
			const pct = this.documentationCount?.percentage;
			if (typeof pct !== 'number') return 0;
			return pct * 100;
		},

		// v3 passes :data="trends.Documentation.data"
		// Keep it resilient depending on what the store returns.
		documentationPlotData() {
			if (!this.documentation) return {};
			return this.documentation.data
				? this.documentation.data
				: this.documentation;
		},

		// Correct "checkData" logic (v3 used a broken array ref comparison)
		checkData() {
			const d = this.documentationPlotData;
			if (Array.isArray(d)) return d.length > 0;
			if (d && typeof d === 'object') return Object.keys(d).length > 0;
			return false;
		},
	},

	mounted() {
		// Trigger data loading on mount (like v3)
		this.$store.dispatch('observatory/trends/getDocumentation');
		this.$store.dispatch('observatory/trends/getDocumentationCount');
	},
};
</script>

<style scoped>
.highlight {
	color: #001752f8;
	font-weight: 500;
}

.copy-icon {
	position: absolute;
	top: 5px;
	right: 10px;
}

.card-content-vs {
	font-size: 0.9em !important;
	width: 95%;
	margin: auto;
}

/* Percentage card styling (Vuetify-friendly) */
.doc-percentage-card {
	width: 100%;
	border-radius: 6px;
	padding: 14px;
	font-size: 1.2em !important;
	background: #e4e9f2;
}

.doc-percentage {
	font-size: 2.4em;
	line-height: 1;
}
</style>
