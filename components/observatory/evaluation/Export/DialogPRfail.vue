<template>
	<v-dialog v-model="dialogPRfail" max-width="600">
		<v-card class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6">
				Making Pull Request
			</v-card-title>
			<v-row class="pb-5 pl-5 pr-5">
				<v-alert class="text-caption pa-4 ml-3 mr-3" type="warning" outlined>
					<span class="text-overlay"><b>ERROR</b></span>
					<br />
					Something went wrong while making the pull request.
				</v-alert>
			</v-row>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text @click="close"> close </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DialogPRfail',
	computed: {
		...mapGetters('observatory/evaluation/export/', {
			dialogPRfail: 'getDialogPRfail',
			failMessage: 'getFailMessage',
		}),
	},
	methods: {
		close() {
			this.$store.dispatch(
				'observatory/evaluation/export/updateDialogPRfail',
				false
			);
		},
	},
};
</script>
