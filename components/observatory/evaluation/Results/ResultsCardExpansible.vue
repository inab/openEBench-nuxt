<template>
	<div>
		<!-- Summary card -->
		<v-card outlined elevation="2" class="px-4 py-4">
			<div class="d-flex flex-wrap align-start">
				<div class="col-9 pa-0">
					<h5 class="mb-2">{{ title }}</h5>
					<span class="text-body-2">{{ description }}</span>
				</div>

				<div class="col-3 pa-0 text-right mt-1">
					<div class="score">{{ formattedScore }}</div>
					<!-- <div class="control text--secondary">Avg. score: {{ control }}</div> -->
				</div>
			</div>

			<div class="d-flex mt-4 mb-4">
				<IndicatorsBars :indicators="indicators" class="flex-grow-1" />
			</div>

			<!-- Accordion: Strengths / Improvements -->
			<v-expansion-panels
				v-if="feedbackItems.length"
				multiple
				accordion
				flat
				class="mb-2"
			>
				<v-expansion-panel v-for="(section, i) in feedbackItems" :key="i">
					<v-expansion-panel-header class="py-2">
						<span class="text-subtitle-2">{{ section.label }}</span>
					</v-expansion-panel-header>

					<v-expansion-panel-content>
						<ul class="pl-4 pr-2">
							<li
								v-for="(point, index) in section.content"
								:key="index"
								class="mb-2 feedback-point"
							>
								{{ point }}
							</li>
						</ul>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>

			<v-card-actions class="pa-0 pt-2">
				<v-spacer />
				<v-btn text color="primary" class="expandBtn" @click="openDialog">
					More details
					<v-icon class="ml-2">mdi-table</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>

		<!-- Detailed dialog -->
		<v-dialog v-model="dialog" max-width="80%" class="center-text">
			<v-card :class="['pb-6', dialogAnimation]">
				<v-card-title class="pb-0">{{ title }}</v-card-title>
				<v-card-subtitle class="pt-1">Detailed indicators</v-card-subtitle>

				<v-card-text>
					<IndicatorsTable
						:indicators="items"
						:ids-main-indicators="indicatorsLabels"
					/>

					<v-row class="mt-4" justify="center">
						<v-col cols="11">
							<p class="mt-4 mb-0">
								<v-icon small class="mr-2"
									>mdi-information-slab-circle-outline</v-icon
								>
								<span class="text-caption">
									Not all indicators apply to all kinds of software. For
									instance, the conditions for a web application to be
									accessible differ from a command line tool. To keep our set of
									indicators as simple as possible, we only distinguish between
									what we consider the minimum number of software categories
									necessary for our purpose: “web” and “non-web" tools.
									<br />
									APIs, web applications, suites, workbenches and databases lie
									under the “web” category. Software of any other kind is
									considered “non-web”.
								</span>
							</p>
						</v-col>
					</v-row>
				</v-card-text>

				<v-card-actions>
					<v-spacer />
					<v-btn text color="primary" class="expandBtn" @click="closeDialog">
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import IndicatorsBars from './IndicatorsBars.vue';
import IndicatorsTable from './IndicatorsTable.vue';

export default {
	name: 'ResultsCardExpansible',
	components: {
		IndicatorsBars,
		IndicatorsTable,
	},
	props: {
		title: { type: String, required: true },
		description: { type: String, required: true },

		score: { type: Number, required: true },
		control: { type: Number, default: null }, // optional; kept for parity

		indicators: { type: Array, required: true },

		strengths: { type: Array, default: () => [] },
		improvements: { type: Array, default: () => [] },

		items: { type: Array, required: true },
		indicatorsLabels: { type: Array, required: true },
	},
	data() {
		return {
			dialog: false,
			dialogAnimation: 'an1',
		};
	},
	computed: {
		...mapGetters('observatory', {
			toolMetadata: 'evaluation/metadata/getToolMetadata',
		}),
		formattedScore() {
			// keep same behavior as v3: score?.toFixed(2)
			return typeof this.score === 'number' ? this.score.toFixed(2) : '';
		},
		feedbackItems() {
			const items = [];
			if (this.strengths && this.strengths.length) {
				items.push({ label: 'Strengths', content: this.strengths });
			}
			if (this.improvements && this.improvements.length) {
				items.push({ label: 'How to improve', content: this.improvements });
			}
			return items;
		},
	},
	watch: {
		dialog(newVal) {
			if (newVal) this.dialogAnimation = 'an1';
		},
	},
	methods: {
		openDialog() {
			this.dialog = true;
		},
		closeDialog() {
			this.dialogAnimation = 'an2';
			setTimeout(() => {
				this.dialog = false;
				this.dialogAnimation = 'an1';
			}, 10);
		},
	},
};
</script>

<style scoped>
.expandBtn {
	text-transform: none !important;
}

.score {
	color: #0b579f;
	font-size: 2.3em;
	margin-top: 0;
	line-height: 1.25rem;
	margin-bottom: 0.2em;
}

/* Similar feel to v3 list styling */
.feedback-point {
	font-size: 0.82rem;
	color: #000;
}

/* Dialog open/close animation (same idea as v3) */

.an1 {
	animation: animation-up 0.5s ease 0s 1 normal forwards;
}

@keyframes animation-up {
	0% {
		transform: scale(0.5);
	}

	100% {
		transform: scale(1);
	}
}

.an2 {
	animation: animation-down 0.5s ease 0s 1 normal forwards;
}

@keyframes animation-down {
	0% {
		transform: scale(1);
	}

	100% {
		transform: scale(0);
	}
}
</style>
