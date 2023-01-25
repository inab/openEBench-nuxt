<template>
	<mdb-modal side position="top-right" v-if="showModal5" @close="closeModal">
		<mdb-modal-header class="divider-outside-bottom">
			<mdb-modal-title>
				<span class="modalTitle"
					>Unsere eCommerce Angebote</span
				></mdb-modal-title
			>
		</mdb-modal-header>
		<mdb-modal-body>
			<div class="container">Hier kommt der Text rein</div>
		</mdb-modal-body>
		<mdb-modal-footer>
			<mdb-btn flat size="lg" darkWaves @click.native="closeModal"
				><X> </X
			></mdb-btn>
		</mdb-modal-footer>
	</mdb-modal>
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
			showModal5: this.showModal,
		};
	},
	computed: {
		...mapGetters('challenges', {
			challenges: 'challenges',
		}),
	},
	watch: {
		showModal(newVal) {
			this.showModal5 = newVal;
		},
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
		closeModal() {
			this.showModal5 = false;
			this.$emit('closeModal');
		},
		getInfo() {
			console.log(this.$store.state.challenges);
		},
	},
};
</script>
