<template>
	<v-card outlined elevation="2" class="pr-8 pb-6">
		<PlotWOptions class="copy-icon" :items="dialogItems" />
		<v-row class="mb-0 pb-0" justify="center">
			<v-col md="11" lg="11" sm="10" xs="12" class="ml-8 mt-5 mb-pd-0">
				<h6 class="text-center mt-6 mb-2">Publications</h6>
				<p style="line-height: 1.8" class="text-center mb-0">
					Publications of software in the form of research papers generally
					offer a careful description of the software, often including domain of
					application and usage, contributing to its
					<span class="highlight">Findability</span>.
					<br />
					A publication can serve as the reference to credit authors of a
					software and is the most common way to cite software in research
					publications.
				</p>
			</v-col>
		</v-row>
		<v-row class="mt-0 pt-0" justify="space-around" align="center">
			<v-col xl="11" lg="11" md="11" sm="11" cols="11">
				<v-skeleton-loader
					v-if="$store.state.observatory.trends._unLoaded.publications"
					class="mb-5 ml-10 mr-10"
					type="card"
				/>
				<PublicationsPlot
					v-else
					:x-values="xValues"
					:y-percentage-values="yPercentageValues"
					:y-i-f-values="yIFValues"
					:text-percentage-tools="textPercentageTools"
					:text-percentage-journals="textPercentageJournals"
				/>
			</v-col>
			<v-col xl="10" lg="10" md="10" sm="12" align-self="start">
				<p class="mt-0 mb-2 ml-8">
					<span class="highlight"
						>Percentage (top) and impact factor (bottom) of publications devoted
						to software in the top publishers of software in the Life
						Sciences.</span
					>
				</p>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import PublicationsPlot from './PublicationsPlot.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';
import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js'; // Import the embed codes

export default {
	name: 'PublicationsMain',
	components: {
		PublicationsPlot,
		PlotWOptions,
	},
	data() {
		return {
			dialogItems: [embedCodes.publications],
		};
	},
	computed: {
		...mapGetters('observatory/trends', {
			data_plot: 'Publications',
		}),

		// Journal can be taken either from data_plot.IF_tools.x or data_plot.percentages.x, they are the same
		xValues() {
			return this.data_plot.IF_tools.x;
		},

		yPercentageValues() {
			return this.data_plot.percentages.y;
		},

		yIFValues() {
			return this.data_plot.IF_tools.y;
		},

		textPercentageTools() {
			return this.data_plot.percentages.text_tools;
		},

		textPercentageJournals() {
			return this.data_plot.percentages.text_journals;
		},
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
