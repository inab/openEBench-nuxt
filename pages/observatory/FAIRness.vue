<template>
	<div>
		<v-row justify="center">
			<v-col md="8" sm="8" cols="8" lg="8" xl="8">
				<div class="mb-3 text-h5">FAIRsoft Indicator Scoreboard</div>
				<p style="line-height: 2.1" class="mb-1 mt-0">
					This page brings to light the
					<strong>collective insights</strong> from our FAIRsoft indicators,
					providing a clear snapshot of trends and scores across various
					software. <br />
					Dive into the details:
				</p>
				<ul style="line-height: 2.1; font-size: 0.9rem">
					<li>
						<strong>Aggregated Scores:</strong> Get a quick overview of how
						different tools stack up in terms of their FAIRness.
					</li>
					<li>
						<strong>Deep Dive:</strong> Interested in the nitty-gritty? Each
						indicator used here is detailed
						<a
							href="https://inab.github.io/FAIRsoft_indicators/"
							target="_blank"
							>here.</a
						>
					</li>
				</ul>
				<p></p>
				<p></p>
			</v-col>
			<v-col cols="3">
				<v-alert
					v-model="alertVisible"
					dismissible
					class="mt-3 text-body-2 ml-auto mr-auto"
					elevation="1"
					color="light-blue lighten-5"
				>
					<p style="line-height: 1.5" class="mb-0 mt-0 ml-0">
						<strong>Looking for a personalized analysis?</strong> 🤔 <br />
						Head over to the
						<NuxtLink to="./Evaluation"
							><strong>FAIRsoft Evaluator</strong></NuxtLink
						>, where you can assess individual tools and really drill down into
						the specifics.
					</p>
					<template slot="close">
						<v-icon class="mb-auto" size="20" @click="alertVisible = false"
							>mdi-close-circle</v-icon
						>
					</template>
				</v-alert>
			</v-col>
		</v-row>
		<v-row>
			<CollectionSelector />
		</v-row>
		<v-row justify="center">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<PlotWOptions class="copy-icon" :items="dialogItemsFindability" />
					<h6 class="text-center mt-2">Findability</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<BubbleChart
						v-else
						div-id="findability"
						:collection="current_collection"
						:collection-scores="fair_scores.F.fair_scores"
						:indicators-labels="fair_scores.F.labels"
						:control-scores="control_fair_scores.F.fair_scores"
						:collection-colors="colors"
						:collection-colors-lines="colors_lines"
					/>
				</v-card>
			</v-col>

			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<PlotWOptions class="copy-icon" :items="dialogItemsAccessibility" />
					<h6 class="text-center mt-2">Accessibility</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<BubbleChart
						v-else
						div-id="accessibility"
						:collection="current_collection"
						:collection-scores="fair_scores.A.fair_scores"
						:indicators-labels="fair_scores.A.labels"
						:control-scores="control_fair_scores.A.fair_scores"
						:collection-colors="colors"
						:collection-colors-lines="colors_lines"
					/>
				</v-card>
			</v-col>

			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<PlotWOptions class="copy-icon" :items="dialogItemsInterperability" />
					<h6 class="text-center mt-2">Interoperability</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<BubbleChart
						v-else
						div-id="interoperability"
						:collection="current_collection"
						:collection-scores="fair_scores.I.fair_scores"
						:indicators-labels="fair_scores.I.labels"
						:control-scores="control_fair_scores.I.fair_scores"
						:collection-colors="colors"
						:collection-colors-lines="colors_lines"
					/>
				</v-card>
			</v-col>

			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<PlotWOptions class="copy-icon" :items="dialogItemsReusability" />
					<h6 class="text-center mt-2">Reusability</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<BubbleChart
						v-else
						div-id="reusability"
						:collection="current_collection"
						:collection-scores="fair_scores.R.fair_scores"
						:indicators-labels="fair_scores.R.labels"
						:control-scores="control_fair_scores.R.fair_scores"
						:collection-colors="colors"
						:collection-colors-lines="colors_lines"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import CollectionSelector from '~/components/observatory/CollectionSelector.vue';
import BubbleChart from '~/components/observatory/fairness/BubbleChart.vue';
import FTable from '~/components/observatory/fairness/FTable.vue';
import ATable from '~/components/observatory/fairness/ATable.vue';
import ITable from '~/components/observatory/fairness/ITable.vue';
import RTable from '~/components/observatory/fairness/RTable.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';

import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js'; // Import the embed codes

export default {
	name: 'FAIRness',
	components: {
		CollectionSelector,
		BubbleChart,
		PlotWOptions,
	},
	layout: 'observatory',
	computed: {
		...mapGetters('observatory', {
			fair_scores: 'fairness/FAIRscores',
			control_fair_scores: 'fairness/ControlFAIRscores',
			current_collection: 'getCurrentCollection',
		}),
	},

	data() {
		return {
			colors: ['#5da4d6', '#ff900e', '#2ca065', '#bd86f0'],
			colors_lines: ['#0075c7', '#995302', '#046b37', '#5e3d7d'],
			FTable,
			ATable,
			ITable,
			RTable,
			alertVisible: true,
			dialogItemsFindability: [embedCodes.findabilityBubble],
			dialogItemsAccessibility: [embedCodes.accessibilityBubble],
			dialogItemsInteroperability: [embedCodes.interoperabilityBubble],
			dialogItemsReusability: [embedCodes.reusabilityBubble],
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: 'https://openebench.bsc.es/',
				},
				{
					text: 'Observatory',
					disabled: true,
					exact: true,
					to: '/observatory',
				},
			],
		};
	},

	created() {
		this.$store.dispatch('observatory/fairness/getControlFAIRscores');
		this.$store.dispatch('observatory/fairness/getFAIRscores');
	},

	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
<style scoped>
.copy-icon {
	position: absolute;
	top: 5px;
	right: 10px;
}
</style>
