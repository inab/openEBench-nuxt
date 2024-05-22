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
						<a href="./Evaluation"><strong>FAIR Evaluator</strong></a
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
					<!--card-title text="Findability"></card-title-->
					<h6 class="text-center mt-2">Findability</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<tabs-plot-info
						v-else
						class="pr-3"
						:info-component="FTable"
						:plot-component="BubbleChartFindability"
						properties=""
						caption=""
					>
					</tabs-plot-info>
				</v-card>
			</v-col>

			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<!--card-title text="Accessibility"></card-title-->
					<h6 class="text-center mt-2">Accessibility</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<tabs-plot-info
						v-else
						class="pr-3"
						:info-component="ATable"
						:plot-component="BubbleChartAccessibility"
						properties=""
						caption=""
					>
					</tabs-plot-info>
				</v-card>
			</v-col>

			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<!--card-title text="Interoperability"></card-title-->
					<h6 class="text-center mt-2">Interoperability</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<tabs-plot-info
						v-else
						class="pr-3"
						:info-component="ITable"
						:plot-component="BubbleChartInteroperability"
						properties=""
						caption=""
					>
					</tabs-plot-info>
				</v-card>
			</v-col>
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<v-card outlined elevation="1" class="mt-3 pt-4 pl-6 pb-4">
					<!--card-title text="(Re)Usability"></card-title-->
					<h6 class="text-center mt-2">(Re)Usability</h6>

					<v-skeleton-loader
						v-if="$store.state.observatory.fairness._unLoaded.FAIRscores"
						class="mb-5 ml-10 mr-10"
						type="card"
					/>

					<tabs-plot-info
						v-else
						class="pr-3"
						:info-component="RTable"
						:plot-component="BubbleChartReusability"
						properties=""
						caption=""
					>
					</tabs-plot-info>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import CollectionSelector from '~/components/observatory/CollectionSelector.vue';
import TabsPlotInfo from '~/components/observatory/TabsPlotInfo.vue';
import BubbleChartFindability from '~/components/observatory/fairness/BubbleChartFindability.vue';
import BubbleChartAccessibility from '~/components/observatory/fairness/BubbleChartAccessibility.vue';
import BubbleChartInteroperability from '~/components/observatory/fairness/BubbleChartInteroperability.vue';
import BubbleChartReusability from '~/components/observatory/fairness/BubbleChartReusability.vue';
import FTable from '~/components/observatory/fairness/FTable.vue';
import ATable from '~/components/observatory/fairness/ATable.vue';
import ITable from '~/components/observatory/fairness/ITable.vue';
import RTable from '~/components/observatory/fairness/RTable.vue';

export default {
	name: 'FAIRness',
	components: {
		CollectionSelector,
		TabsPlotInfo,
	},
	layout: 'observatory',

	data() {
		return {
			BubbleChartAccessibility,
			BubbleChartFindability,
			BubbleChartInteroperability,
			BubbleChartReusability,
			FTable,
			ATable,
			ITable,
			RTable,
			alertVisible: true,
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
					text: 'FAIRness',
					disabled: false,
					exact: true,
					to: '/observatory/FAIRness',
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
