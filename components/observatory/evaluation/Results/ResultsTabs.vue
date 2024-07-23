<template>
	<v-container>
		<v-tabs v-model="tab" fixed-tabs>
			<v-tabs-slider></v-tabs-slider>
			<v-tab v-for="(item, index) in items" :key="index">
				<!--v-icon left>{{ item.icon }}</v-icon-->
				{{ item.text }}
			</v-tab>

			<v-tabs-items v-model="tab">
				<v-tab-item v-for="(item, index) in items" :key="index">
					<v-card flat class="pt-6">
						<component :is="item.component"></component>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
		<v-row class="d-flex mb-3">
			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-btn
						text
						class="mt-4 ml-4"
						v-bind="attrs"
						@click="goBack"
						v-on="on"
					>
						Back
					</v-btn>
				</template>
				Go to the previous step.
			</v-tooltip>

			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-btn
						text
						color="error"
						class="mt-4 ml-auto mr-4"
						v-bind="attrs"
						@click="cancel"
						v-on="on"
					>
						Cancel
					</v-btn>
				</template>
				Go to the start of the process without saving any changes.
			</v-tooltip>
		</v-row>
		<DialogParseMetadata />
	</v-container>
</template>
<script>
import FAIRresults from './FAIRresults.vue';
import MetadataActions from './MetadataActions.vue';
import CitationActions from './CitationActions.vue';

export default {
	name: 'ResultsTabs',
	components: {
		FAIRresults,
		MetadataActions,
		CitationActions,
	},
	data: () => ({
		tab: 'Upload File',
		items: [
			{
				text: 'FAIRsoft Indicators',
				component: 'FAIRresults',
			},
			{
				text: 'Metadata',
				component: 'MetadataActions',
			},
			{
				text: 'Citation',
				component: 'CitationActions',
			},
		],
	}),

	methods: {
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

<style scoped>
.v-tab {
	text-transform: none !important;
}
</style>
