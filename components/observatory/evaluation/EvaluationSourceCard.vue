<template>
	<v-card
		class="pt-6 pb-4 d-flex flex-column justify-space-between"
		min-height="320"
		max-height="320"
		min-width="230"
		max-width="320"
		rounded
		outlined
		elevation="1"
	>
		<v-row justify="center" class="mt-5">
			<v-avatar color="grey" size="42">
				<v-icon color="white">{{ icon }}</v-icon>
			</v-avatar>
		</v-row>
		<v-row justify="center">
			<v-col cols="10" class="text-center">
				<div class="font-weight-medium text-subtitle-1">
					{{ title }}
				</div>
				<p class="mt-3" v-html="description"></p>
			</v-col>
		</v-row>
		<v-row justify="center" class="mb-4">
			<v-btn color="primary" @click="selectSource"> select </v-btn>
		</v-row>
		<!--v-row justify="center">
			<v-col cols="10" class="text-center">
				<p class="mt-2 text-caption grey--text">
					<slot name="note"></slot>
				</p>
			</v-col>
		</v-row-->
	</v-card>
</template>
<script>
export default {
	name: 'EvaluationSourceCard',
	props: {
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
	},
	methods: {
		selectSource() {
			this.$store.dispatch('observatory/evaluation/changeSource', this.source);
			this.$store.dispatch('observatory/evaluation/changeStep', 2);
		},
	},
};
</script>
