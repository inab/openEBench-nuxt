<template>
	<v-dialog v-model="dialogImportMetadata" max-width="500">
		<v-card v-if="importError" class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6">
				Importing metadata
			</v-card-title>
			<v-card-text class="mt-3">
				<v-progress-linear :size="40" color="error"></v-progress-linear>

				<div class="error--text text-body-2 mt-2 d-flex align-center">
					<v-icon color="error" class="mr-2">mdi-alert</v-icon>
					Something went wrong: {{ importProgressText }}
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="cancelImport"> close </v-btn>
			</v-card-actions>
		</v-card>

		<v-card v-else class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6">
				Importing metadata
			</v-card-title>
			<v-card-text class="mt-3">
				<v-progress-linear :size="40" indeterminate></v-progress-linear>

				<div style="color: #1565c0" class="text-body-2">
					{{ importProgressText }}
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="cancelImport"> cancel </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DialogImportMetadata',
	computed: {
		...mapGetters('observatory/evaluation/github/', {
			dialogImportMetadata: 'getDialogImportMetadata',
			importError: 'getImportError',
			importProgressText: 'getImportProgressText',
		}),
	},
	methods: {
		cancelImport() {
			this.$store.dispatch('observatory/evaluation/github/cancelImport');
		},
	},
};
</script>
