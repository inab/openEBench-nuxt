<template>
	<div class="modal">
		<v-card>
			<v-card-title class="text-h5 grey lighten-2">
				{{ $store.state.challenge.challenge.acronym }}:
				{{ $store.state.challenge.challenge.name }}
			</v-card-title>

			<v-card-text
				v-for="item in $store.state.challenge.challenge.metrics_categories"
				:key="item.metrics[0].metrics_id"
			>
				<v-card-actions>
					<v-btn color="orange lighten-2" text> Explore {{ item }}</v-btn>

					<v-spacer></v-spacer>

					<v-btn icon @click="show = !show">
						<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-card-actions>

				<v-expand-transition>
					<div v-show="show">
						<v-card-text>
							I'm a thing. But, like most politicians, he promised more than he
							could deliver. You won't have time for sleeping, soldier, not with
							all the bed making you'll be doing. Then we'll go with that data
							file! Hey, you add a one and two zeros to that or we walk! You're
							going to do his laundry? I've got to find a way to escape.
						</v-card-text>
					</div>
				</v-expand-transition>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="showData">SHOW DATA</v-btn>
				<v-btn color="red" text @click="closeModal"> Close </v-btn>
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
	props: ['challengeID'],
	data: () => ({
		dChall: null,
		show: false,
	}),
	methods: {
		closeModal() {
			this.$emit('close');
		},
		showData() {
			console.log(this.$store.state);
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
