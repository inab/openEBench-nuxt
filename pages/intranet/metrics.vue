<template>
	<div class="modal">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2">
				Privacy Policy
			</v-card-title>

			<v-card-text>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="showData">SHOW DATA</v-btn>
				<v-btn color="primary" text @click="closeModal"> I accept </v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

export default {
	name: 'IntranetMetricsPage',
	methods: {
		closeModal() {
			this.$emit('close');
		},
		showData() {
			console.log(this.$store.state.challenge.challenge);
		},
	},
};
</script>

<style>
.modal {
	background: #fff;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	width: 500px;
	height: 500px;
}
</style>
