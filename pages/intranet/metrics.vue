<template>
	<v-dialog v-model="showMetricsForm" max-width="500px">
		<v-card>
			<v-card-text>
				<h3>Hola! {{ passedObject }}</h3>
				<v-btn @click="getInfo()">BOTÓN</v-btn>
				<v-card-actions>
					<v-btn color="primary" @click.stop="showMetricsForm = false"
						>Close</v-btn
					>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { mapGetters } from 'vuex';
export default {
	name: 'IntranetMetricsPage',
	props: {
		value: Boolean,
		passedObject: String,
	},
	computed: {
		showMetricsForm: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			},
		},
		...mapGetters('challenges', {
			challenges: 'challenges',
		}),
	},
	mounted() {
		this.$store.dispatch('challenges/getChallenges', {
			id: this.$route.params.event,
		});
	},
	methods: {
		addItem(item) {
			const removed = this.items.splice(0, 1);
			this.items.push(...this.more.splice(this.more.indexOf(item), 1));
			this.more.push(...removed);
			this.$nextTick(() => {
				this.currentItem = 'tab-' + item;
			});
		},
		getInfo() {
			console.log(this.$store.state.challenges);
		},
	},
};
</script>
