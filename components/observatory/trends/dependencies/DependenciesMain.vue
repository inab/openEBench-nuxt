<template>
	<v-card outlined elevation="2" class="pr-8 pb-6">
		<!-- Options Button -->
		<PlotWOptions class="copy-icon" :items="dialogItems" />

		<!-- Header + description -->
		<v-row class="mb-0 pb-0" justify="center">
			<v-col md="11" lg="11" sm="10" xs="12" class="ml-8 mt-5 mb-pd-0">
				<h6 class="text-center mt-6 mb-2">Dependencies</h6>

				<v-row class="mt-4" align="stretch">
					<!-- Left column: percentage card -->
					<v-col cols="12" lg="3" class="d-flex">
						<v-skeleton-loader
							v-if="isDependenciesCountLoading"
							class="flex-grow-1"
							type="card"
						/>
						<div
							v-else
							class="deps-percentage-card d-flex flex-column justify-center align-center text-center"
						>
							<span class="deps-percentage mb-1"
								>{{ percentage.toFixed(1) }}%</span
							>
							<p class="font-weight-light mb-0">
								of software state their
								<span class="font-weight-bold">dependencies</span>
							</p>
						</div>
					</v-col>

					<!-- Right column: text -->
					<v-col cols="12" lg="9">
						<p
							style="line-height: 1.8"
							class="card-content-vs text-sm text-gray-700"
						>
							Software packages often depend on other tools or libraries to
							function properly. Analyzing these dependencies helps us
							understand tool interoperability and reusability, supporting the
							<span class="highlight">Reusability</span> and
							<span class="highlight">Interoperability</span> principles of
							FAIR.
						</p>
						<p
							style="line-height: 1.8"
							class="card-content-vs text-sm text-gray-700 mt-2"
						>
							Dependencies also give insight into popular ecosystems and shared
							technical stacks in Life Sciences software.
						</p>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<!-- Plot -->
		<v-row class="mt-0 pt-0" justify="space-around" align="center">
			<v-col xl="11" lg="11" md="11" sm="11" cols="11">
				<v-skeleton-loader
					v-if="isDependenciesLoading"
					class="mb-5 ml-10 mr-10"
					type="card"
				/>

				<div v-else>
					<DependenciesPlot v-if="checkData" :data="dependenciesPlotData" />
					<minimalNoDataAvailable v-else />
				</div>
			</v-col>

			<v-col xl="10" lg="10" md="10" sm="12" align-self="start">
				<p class="mt-0 mb-2 ml-8">
					<span class="highlight">
						Top dependencies used in research software tools in the Life
						Sciences
					</span>
				</p>
			</v-col>
			<v-col xl="10" lg="10" md="10" sm="12" align-self="start">
				<v-alert dense text class="text-caption" type="warning">
					Most upstream sources we aggregate do not provide dependency fields.
					Missing values reflect source limitations, not developer practices or
					lack of dependencies.
				</v-alert>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import DependenciesPlot from './DependenciesPlot.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';
import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js';
import minimalNoDataAvailable from '~/layouts/minimalNoDataAvailable.vue';

export default {
	name: 'DependenciesMain',
	components: {
		DependenciesPlot,
		PlotWOptions,
		minimalNoDataAvailable,
	},
	data() {
		return {
			dialogItems: [embedCodes.dependencies],
		};
	},
	computed: {
		...mapGetters('observatory/trends', {
			dependenciesData: 'Dependencies',
			dependenciesCount: 'DependenciesCount',
			loaded: 'Loaded',
		}),

		isDependenciesLoading() {
			return this.loaded?.dependencies === true;
		},
		isDependenciesCountLoading() {
			return this.loaded?.dependenciesCount === true;
		},

		percentage() {
			const pct = this.dependenciesCount?.percentage;
			if (typeof pct !== 'number') return 0;
			return pct * 100;
		},

		// v3 passes: :data="dependenciesData.data"
		// Keep it resilient depending on what your API returns.
		dependenciesPlotData() {
			if (!this.dependenciesData) return {};
			return this.dependenciesData.data
				? this.dependenciesData.data
				: this.dependenciesData;
		},

		// Equivalent of "checkData" in v3, but correctly implemented:
		// show plot only if we have keys/elements.
		checkData() {
			const d = this.dependenciesPlotData;

			if (Array.isArray(d)) return d.length > 0;
			if (d && typeof d === 'object') return Object.keys(d).length > 0;

			return false;
		},
	},

	mounted() {
		// Trigger data load like v3 onMounted
		this.$store.dispatch('observatory/trends/getDependencies');
		this.$store.dispatch('observatory/trends/getDependenciesCount');
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

/* Keep similar intent to v3 "card-content-vs" */
.card-content-vs {
	font-size: 0.9em !important;
	width: 95%;
	margin: auto;
}

/* Percentage card styling (Vuetify-friendly) */
.deps-percentage-card {
	width: 100%;
	background: #e4e9f2; /* similar to orange-100 */
	border-radius: 6px;
	padding: 14px;
	font-size: 1.2em !important;
}

.deps-percentage {
	font-size: 2.4em;
	line-height: 1;
}
</style>
