<template>
	<v-container>
		<v-container v-if="data != true">
			<v-row justify="space-around">
				<v-col cols="12" md="5">
					<v-skeleton-loader type="card"> </v-skeleton-loader>
				</v-col>
				<v-col cols="12" md="5">
					<v-skeleton-loader type="card"> </v-skeleton-loader>
				</v-col>
				<v-col cols="12" md="5">
					<v-skeleton-loader type="card"> </v-skeleton-loader>
				</v-col>
				<v-col cols="12" md="5">
					<v-skeleton-loader type="card"> </v-skeleton-loader>
				</v-col>
			</v-row>
		</v-container>
		<v-container v-else>
			<v-row justify="space-around">
				<v-col cols="12" md="5">
					<ResultsCardExpansible
						title="Findability"
						:indicators-labels="labelsFindability"
						color="#fabe69"
						:items="itemsFindability"
						class="mt-1 mb-4"
					/>
				</v-col>

				<v-col cols="12" md="5">
					<ResultsCardExpansible
						title="Accessibility"
						:indicators-labels="labelsAccessibility"
						color="#5C6BC0"
						:items="itemsAccessibility"
						class="mt-1 mb-4"
					/>
				</v-col>

				<v-col cols="12" md="5">
					<ResultsCardExpansible
						title="Interoperability"
						:indicators-labels="labelsInteroperability"
						color="#fabe69"
						:items="itemsInteroperability"
						class="mt-1 mb-4"
					/>
				</v-col>

				<v-col cols="12" md="5">
					<ResultsCardExpansible
						title="Reusability"
						:indicators-labels="labelsReusability"
						color="#5C6BC0"
						:items="itemsReusability"
						class="mt-1 mb-4"
					/>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import ResultsCardExpansible from './ResultsCardExpansible.vue';
import {
	findability,
	accessibility,
	interoperability,
	reusability,
} from './indicatorsTableItems.js';

export default {
	name: 'FAIRresults',
	components: {
		ResultsCardExpansible,
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
};
</script>
