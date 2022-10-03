<template>
	<v-dialog v-if="show" class="openDialog" max-width="500px">
		<v-card>
			<v-card-text>
				<h3>Hola! {{ passedObject }}</h3>
				<v-btn @click="getInfo()">BOTÓN</v-btn>
				<v-card-actions>
					<button class="btn btn-success" @click="handleSave">Save</button>
					<button class="btn btn-secondary" @click="handleClose">Close</button>
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
		passedObject: String,
		show: Boolean,
	},
	data() {
		return {
			showModal5: this.show,
		};
	},
	computed: {
		...mapGetters('challenges', {
			challenges: 'challenges',
		}),
	},
	watch: {
		show(newVal) {
			this.showModal5 = newVal;
		},
	},
	mounted() {
		this.$store.dispatch('challenges/getChallenges', {
			id: this.$route.params.event,
		});
	},
	methods: {
		handleSave() {
			this.handleClose();
		},
		handleClose() {
			this.$emit('close');
		},
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
