<template>
	<v-container class="my-0 pa-1 pt-3">
		<!-- Loading -->
		<v-container v-if="!hasData">
			<v-row class="d-flex flex-wrap" justify="space-around">
				<v-col cols="12" md="6" class="py-3 px-4">
					<v-skeleton-loader type="card" height="260" />
				</v-col>
				<v-col cols="12" md="6" class="py-3 px-4">
					<v-skeleton-loader type="card" height="260" />
				</v-col>
				<v-col cols="12" md="6" class="py-3 px-4">
					<v-skeleton-loader type="card" height="260" />
				</v-col>
				<v-col cols="12" md="6" class="py-3 px-4">
					<v-skeleton-loader type="card" height="260" />
				</v-col>
			</v-row>
		</v-container>

		<!-- Results -->
		<v-container v-else class="ma-0 pa-0 mb-4 pb-2">
			<v-row class="d-flex flex-wrap" justify="space-around">
				<v-col cols="12" md="6" class="py-3 px-4">
					<ResultsCardExpansible
						:title="findabilitySummary.title"
						:description="findabilitySummary.description"
						:score="findabilitySummary.score"
						:control="findabilitySummary.control"
						:indicators="findabilitySummary.indicators"
						:strengths="findabilitySummary.strengths"
						:improvements="findabilitySummary.improvements"
						:items="itemsFindability"
						:indicators-labels="labelsFindability"
					/>
				</v-col>

				<v-col cols="12" md="6" class="py-3 px-4">
					<ResultsCardExpansible
						:title="accessibilitySummary.title"
						:description="accessibilitySummary.description"
						:score="accessibilitySummary.score"
						:control="accessibilitySummary.control"
						:indicators="accessibilitySummary.indicators"
						:strengths="accessibilitySummary.strengths"
						:improvements="accessibilitySummary.improvements"
						:items="itemsAccessibility"
						:indicators-labels="labelsAccessibility"
					/>
				</v-col>

				<v-col cols="12" md="6" class="py-3 px-4">
					<ResultsCardExpansible
						:title="interoperabilitySummary.title"
						:description="interoperabilitySummary.description"
						:score="interoperabilitySummary.score"
						:control="interoperabilitySummary.control"
						:indicators="interoperabilitySummary.indicators"
						:strengths="interoperabilitySummary.strengths"
						:improvements="interoperabilitySummary.improvements"
						:items="itemsInteroperability"
						:indicators-labels="labelsInteroperability"
					/>
				</v-col>

				<v-col cols="12" md="6" class="py-3 px-4">
					<ResultsCardExpansible
						:title="reusabilitySummary.title"
						:description="reusabilitySummary.description"
						:score="reusabilitySummary.score"
						:control="reusabilitySummary.control"
						:indicators="reusabilitySummary.indicators"
						:strengths="reusabilitySummary.strengths"
						:improvements="reusabilitySummary.improvements"
						:items="itemsReusability"
						:indicators-labels="labelsReusability"
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
	components: { ResultsCardExpansible },

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
			// ✅ You likely need to add this getter in Vuex if it doesn't exist yet:
			FAIRIndicatorsFeedback:
				'observatory/evaluation/results/getFAIRIndicatorsFeedback',
		}),

		t() {
			return this.FAIRIndicatorsTool || {};
		},
		feedback() {
			return this.FAIRIndicatorsFeedback || {};
		},

		hasData() {
			return this.t && Object.keys(this.t).length > 0;
		},

		// ---------- Summaries (mirrors v3) ----------
		findabilitySummary() {
			const fb = this.feedback.F || {};
			return {
				title: 'Findability',
				description:
					'How easily software and its metadata can be discovered by humans and machines.',
				score: this.t.F != null ? this.t.F : null,
				control: 0.89,
				indicators: [
					{
						label: 'F1',
						score: this.t.F1 != null ? this.t.F1 : 0,
						title: 'F1. Identity uniqueness',
						explanation:
							'Does the software have a persistent and unique identifier?',
					},
					{
						label: 'F2',
						score: this.t.F2 != null ? this.t.F2 : 0,
						title: 'F2. Existence of metadata',
						explanation:
							'Is the software described with rich, structured metadata?',
					},
					{
						label: 'F3',
						score: this.t.F3 != null ? this.t.F3 : 0,
						title: 'F3. Discoverability',
						explanation: 'Can the software be found using external resources?',
					},
				],
				strengths: this.takeTop3Clean(fb.strengths),
				improvements: this.takeTop3Clean(fb.improvements),
			};
		},

		accessibilitySummary() {
			const fb = this.feedback.A || {};
			return {
				title: 'Accessibility',
				description:
					'Whether users can obtain, install, and run the software without barriers.',
				score: this.t.A != null ? this.t.A : null,
				control: 0.89,
				indicators: [
					{
						label: 'A1',
						score: this.t.A1 != null ? this.t.A1 : 0,
						title: 'A1. Availability of working version',
						explanation:
							'Can users access or install a working version of the software?',
					},
					// NOTE: v3 shows A3 here (not A2). Keeping it identical.
					{
						label: 'A3',
						score: this.t.A3 != null ? this.t.A3 : 0,
						title: 'A3. Unrestricted Access',
						explanation: 'Can the software be used without barriers?',
					},
				],
				strengths: this.takeTop3Clean(fb.strengths),
				improvements: this.takeTop3Clean(fb.improvements),
			};
		},

		interoperabilitySummary() {
			const fb = this.feedback.I || {};
			return {
				title: 'Interoperability',
				description:
					'Whether the software can work smoothly with other tools, data formats, and platforms.',
				score: this.t.I != null ? this.t.I : null,
				control: 0.89,
				indicators: [
					{
						label: 'I1',
						score: this.t.I1 != null ? this.t.I1 : 0,
						title: 'I1. Data format standards and practices',
						explanation:
							'Does the software use and support standard data formats and good data handling practices?',
					},
					{
						label: 'I2',
						score: this.t.I2 != null ? this.t.I2 : 0,
						title: 'I2. Software integration',
						explanation:
							'Can the software be used easily with other tools or in workflows?',
					},
					{
						label: 'I3',
						score: this.t.I3 != null ? this.t.I3 : 0,
						title: 'I3. Dependencies availability',
						explanation:
							'Are the software’s dependencies documented and accessible?',
					},
				],
				// v3 kept all strengths (not sliced) but sliced improvements—keeping v3 behavior:
				strengths: this.cleanList(fb.strengths),
				improvements: this.takeTop3Clean(fb.improvements),
			};
		},

		reusabilitySummary() {
			const fb = this.feedback.R || {};
			return {
				title: 'Reusability',
				description:
					'Whether the software can be easily reused, adapted, and cited by others.',
				score: this.t.R != null ? this.t.R : null,
				control: 0.89,
				indicators: [
					{
						label: 'R1',
						score: this.t.R1 != null ? this.t.R1 : 0,
						title: 'R1. Usage Documentation',
						explanation:
							'Does the software provide documentation to help users understand and apply it effectively?',
					},
					{
						label: 'R2',
						score: this.t.R2 != null ? this.t.R2 : 0,
						title: 'R2. License',
						explanation:
							'Are there clear legal conditions for using the software?',
					},
					{
						label: 'R3',
						score: this.t.R3 != null ? this.t.R3 : 0,
						title: 'R3. Recognition and governance',
						explanation: 'Recognition and governance',
					},
					{
						label: 'R4',
						score: this.t.R4 != null ? this.t.R4 : 0,
						title: 'R4. Versioning and historical traceability',
						explanation: 'Versioning and historical traceability',
					},
				],
				strengths: this.takeTop3Clean(fb.strengths),
				improvements: this.takeTop3Clean(fb.improvements),
			};
		},
	},

	mounted() {
		// keep your existing call
		this.$store.dispatch(
			'observatory/evaluation/results/getFAIRIndicatorsControl'
		);

		// If feedback is fetched separately in v2, also dispatch it here:
		// this.$store.dispatch('observatory/evaluation/results/getFAIRIndicatorsFeedback')
	},

	methods: {
		cleanList(list) {
			return (list || [])
				.map((s) => String(s || ''))
				.filter((s) => s.trim() !== '');
		},
		takeTop3Clean(list) {
			return this.cleanList(list).slice(0, 3);
		},
	},
};
</script>
