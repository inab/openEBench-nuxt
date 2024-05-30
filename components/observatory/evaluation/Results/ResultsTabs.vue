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
			<v-btn class="mt-4 ml-4" color="primary" @click="nextStep">
				Continue
			</v-btn>
			<v-btn text class="mt-4 ml-4" @click="goBack"> Back </v-btn>
			<v-btn text class="mt-4 ml-auto" color="error" @click="cancel">
				Cancel
			</v-btn>
		</v-row>
		<DialogParseMetadata />
	</v-container>
</template>
<script>
import FAIRresults from './FAIRresults.vue';
import MetadataActions from './MetadataActions.vue';

export default {
	name: 'ResultsTabs',
	components: {
		FAIRresults,
		MetadataActions,
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
		],
	}),

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

<style scoped>
.v-tab {
	text-transform: none !important;
}
</style>
