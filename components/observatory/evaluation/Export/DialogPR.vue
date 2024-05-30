<template>
	<v-dialog v-model="dialogPR" max-width="500">
		<v-card class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6">
				Making Pull Request
			</v-card-title>
			<v-card-text>
				<v-progress-linear :size="40" indeterminate></v-progress-linear>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="cancelRequest"> cancel </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DialogPR',
	computed: {
		...mapGetters('observatory/evaluation/export/', {
			dialogPR: 'getDialogPR',
		}),
	},
	methods: {
		cancelRequest() {
			this.$store.dispatch('observatory/evaluation/export/cancelRequest');
		},
	},
};
</script>
