<template>
	<div>
		<v-card outlined>
			<v-card-title>{{ title }}</v-card-title>
			<v-card-text justify="center">
				<FAIRplot
					:tool-name="toolMetadata.label[0]"
					:height="220"
					:label="title"
					:color-fill="color"
					:indicators-labels="indicatorsLabels"
					class="mt-3 pb-1 mb-2"
				/>
				<!--v-col cols="5">
				<CardCaptions :tool-label="toolMetadata.label[0]" />
			</v-col-->
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text color="primary" class="expandBtn" @click="openDialog()"
					>Detailed results
					<v-icon class="ml-2">mdi-arrow-expand-all</v-icon></v-btn
				>
			</v-card-actions>
		</v-card>
		<v-dialog v-model="dialog" max-width="80%" class="center-text">
			<v-card class="pb-6">
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle>Detailed indicators</v-card-subtitle>
				<IndicatorsTable
					:indicators="items"
					:ids-main-indicators="indicatorsLabels"
				/>
				<v-row class="mt-4" justify="center">
					<v-col cols="11">
						<!--v-divider></v-divider-->
						<p class="mt-4">
							<v-icon id="types" small
								>mdi-information-slab-circle-outline</v-icon
							>
							<span class="text-caption">
								Not all indicators apply to all kinds of software. For instance,
								the conditions for a web application to be accessible differ
								from a command line tool. To keep our set of indicators as
								simple as possible, we only distinguish between what we consider
								the minimum number of software categories necessary for our
								purpose: “web” and “non-web" tools.
								<br />
								APIs, web applications, suites, workbenches and databases lie
								under the “web” category. Software of any other kind is
								considered “non-web”.
							</span>
						</p>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import FAIRplot from './FAIRplot.vue';
import IndicatorsTable from './IndicatorsTable.vue';

export default {
	name: 'ResultsCardExpansible',
	components: {
		IndicatorsTable,
		FAIRplot,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
		indicatorsLabels: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			dialog: false,
		};
	},
	computed: {
		...mapGetters('observatory', {
			toolMetadata: 'evaluation/metadata/getToolMetadata',
		}),
	},
	methods: {
		openDialog() {
			this.dialog = true;
		},
		closeDialog() {
			this.dialog = false;
		},
	},
};
</script>
<style scoped>
.expandBtn {
	text-transform: none !important;
}
</style>
