<template>
	<v-dialog v-model="dialogPRok" max-width="500">
		<v-card class="pt-2 pb-2">
			<v-container class="pa-8">
				<v-row justify="center">
					<v-col cols="2">
						<v-icon size="40" color="success">
							mdi-check-circle-outline
						</v-icon>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10">
						<h6 class="text-center text-h6">Pull Request Created</h6>
					</v-col>
					<v-col cols="5" justify="center" class="d-flex flex-column">
						<v-btn small elevation="0" class="mt-2" @click="openPRinGH()">
							See in repository
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
			<v-card-actions class="mb-0">
				<v-spacer></v-spacer>
				<v-btn text color="success" class="mb-0" @click="close"> close </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DialogPRok',
	computed: {
		...mapGetters('observatory/evaluation/export/', {
			dialogPRok: 'getDialogPRok',
			okURL: 'getOkURL',
		}),
	},
	methods: {
		close() {
			this.$store.dispatch(
				'observatory/evaluation/export/updateDialogPRok',
				false
			);
		},
		openPRinGH() {
			window.open(this.okURL, '_blank');
		},
	},
};
</script>
