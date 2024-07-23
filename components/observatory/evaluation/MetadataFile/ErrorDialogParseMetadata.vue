<template>
	<v-dialog v-model="errorDialogParseMetadata" max-width="500">
		<v-card class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6"> Error </v-card-title>
			<v-card-text>
				<span class="text-error text-body-2" v-html="errorProgressText"> </span>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text color="red" @click="cancelParse"> close </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ErrorDialogParseMetadata',
	computed: {
		...mapGetters('observatory/evaluation/file/', {
			errorDialogParseMetadata: 'getErrorDialogParseMetadata',
			errorProgressText: 'getErrorProgressText',
		}),
	},
	methods: {
		cancelParse() {
			this.$store.dispatch('observatory/evaluation/file/cancelParse');
		},
	},
};
</script>
