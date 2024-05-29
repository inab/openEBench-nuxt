<template>
	<v-dialog v-model="dialogParseMetadata" max-width="500">
		<v-card class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6">
				Uploading metadata
			</v-card-title>
			<v-card-text>
				<v-progress-linear :size="40" indeterminate></v-progress-linear>

				<span style="color: #1565c0" class="text-body-2">
					{{ parseProgressText }}
				</span>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="cancelParse"> cancel </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DialogParseMetadata',
	computed: {
		...mapGetters('observatory/evaluation/file/', {
			dialogParseMetadata: 'getDialogParseMetadata',
			parseProgressText: 'getParseProgressText',
		}),
	},
	methods: {
		cancelParse() {
			this.$store.dispatch('observatory/evaluation/file/cancelParse');
		},
	},
};
</script>
