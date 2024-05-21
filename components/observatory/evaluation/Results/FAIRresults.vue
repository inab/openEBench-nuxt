<template>
	<v-container v-if="data === true">
		<h5 class="text-subtitle ml-2 mb-4 subtitle">Export Metadata</h5>
		<ExportMetadataCardDownload />
		<ExportMetadataCardPull />
		<h5 class="text-subtitle mt-3 ml-2 mb-3 subtitle">FAIRsoft results</h5>

		<ResultsCard
			title="Findability"
			:indicators-labels="labelsFindability"
			color="#fabe69"
			:items="itemsFindability"
			class="mt-1 mb-4"
		/>

		<ResultsCard
			title="Accessibility"
			:indicators-labels="labelsAccessibility"
			color="#5C6BC0"
			:items="itemsAccessibility"
			class="mt-1 mb-4"
		/>

		<ResultsCard
			title="Interoperability"
			:indicators-labels="labelsInteroperability"
			color="#fabe69"
			:items="itemsInteroperability"
			class="mt-1 mb-4"
		/>

		<ResultsCard
			title="Reusability"
			:indicators-labels="labelsReusability"
			color="#5C6BC0"
			:items="itemsReusability"
			class="mt-1 mb-4"
		/>

		<v-row class="mt-4" justify="center">
			<v-col cols="12">
				<v-divider></v-divider>
				<p class="mt-4">
					<v-icon id="types" small>mdi-information-slab-circle-outline</v-icon>
					<span class="text-caption">
						Not all indicators apply to all kinds of software. For instance, the
						conditions for a web application to be accessible differ from a
						command line tool. To keep our set of indicators as simple as
						possible, we only distinguish between what we consider the minimum
						number of software categories necessary for our purpose: “web” and
						“non-web" tools.
						<br />
						APIs, web applications, suites, workbenches and databases lie under
						the “web” category. Software of any other kind is considered
						“non-web”.
					</span>
				</p>
			</v-col>
		</v-row>

		<v-row class="d-flex mb-3">
			<v-btn class="mt-4 ml-4" color="primary" @click="nextStep">
				Continue
			</v-btn>
			<v-btn text class="mt-4 ml-4" @click="goBack"> Back </v-btn>
			<v-btn text class="mt-4 ml-auto" color="error" @click="cancel">
				Cancel
			</v-btn>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import ExportMetadataCardDownload from '../Export/ExportMetadataCardDownload.vue';
import ExportMetadataCardPull from '../Export/ExportMetadataCardPull.vue';
import ResultsCard from './ResultsCard.vue';
import {
	findability,
	accessibility,
	interoperability,
	reusability,
} from './indicatorsTableItems.js';

export default {
	name: 'FAIRresults',
	components: {
		ResultsCard,
		ExportMetadataCardDownload,
		ExportMetadataCardPull,
	},
	data() {
		return {
			itemsFindability: findability,
			labelsFindability: ['F1', 'F2', 'F3'],
			itemsAccessibility: accessibility,
			labelsAccessibility: ['A1', 'A2', 'A3'],
			itemsInteroperability: interoperability,
			labelsInteroperability: ['I1', 'I2', 'I3'],
			itemsReusability: reusability,
			labelsReusability: ['R1', 'R2', 'R3', 'R4'],
		};
	},
	computed: {
		...mapGetters({
			FAIRIndicatorsTool:
				'observatory/evaluation/results/getFAIRIndicatorsTool',
		}),
		data() {
			if (this.FAIRIndicatorsTool === null) {
				return false;
			} else {
				return true;
			}
		},
	},
	mounted() {
		this.$store.dispatch(
			'observatory/evaluation/results/getFAIRIndicatorsControl'
		);
	},
	methods: {
		nextStep() {
			this.$store.dispatch('observatory/evaluation/changeStep', 5);
		},
		goBack() {
			this.$store.dispatch('observatory/evaluation/changeStep', 3);
			this.$store.commit(
				'observatory/evaluation/results/setFAIRIndicatorsTool',
				null
			);
		},
		cancel() {
			this.$store.dispatch('observatory/evaluation/changeStep', 1);
			this.$store.commit(
				'observatory/evaluation/results/setFAIRIndicatorsTool',
				null
			);
		},
	},
};
</script>
