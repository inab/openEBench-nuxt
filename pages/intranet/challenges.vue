<template>
	<v-card>
		<template>
			<v-tabs
				dark
				v-model="currentItem"
				background-color="#0b579f"
				show-arrows
				fixed-tabs
			>
				<v-tab v-for="item in items" :key="item" :href="'#tab-' + item">
					{{ item }}
				</v-tab>
			</v-tabs>
		</template>
		<v-tabs-items v-model="currentItem">
			<v-tab-item v-for="item in items" :key="item" :value="'tab-' + item">
				<v-card flat v-if="item == 'Community Administration'" height="100%">
					<v-tabs vertical>
						<v-tab> Challenges </v-tab>
						<v-tab> Tools </v-tab>

						<v-tab-item>
							<v-card flat>
								<v-card-text>
									<div>
										<v-row>
											<v-col>
												<h2>
													Listing Challenges -
													{{ $store.state.challenges.event.name }}
													<v-icon @click="newChallenge()"
														>mdi-plus-circle-outline</v-icon
													>
												</h2>
											</v-col>

											<v-col align="right"
												><v-btn color="primary" @click="Return()"
													><v-icon>mdi-keyboard-return</v-icon>Return</v-btn
												></v-col
											>
										</v-row>
										<table class="table" id="datatable">
											<thead>
												<tr>
													<th>Challenge Name</th>
													<th>Contributors</th>
													<th>Metrics</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(challenge, c) in $store.state.challenges
														.challenges"
													:key="c"
													dense
													:id="challenge._id"
												>
													<td>{{ challenge.acronym }}</td>
													<td>b</td>
													<td>
														<v-btn
															id="show-modal"
															rounded
															color="#E4E4E4"
															style="text-transform: none"
															@click="openModal()"
															>Show Metrics</v-btn
														>
														<MetricsForm
															:show="showModal"
															@closeModal="closeModal"
															>hola</MetricsForm
														>
													</td>
													<td>
														<v-icon small>mdi-pencil</v-icon
														><v-icon small>mdi-delete</v-icon
														><v-icon small>mdi-eye-off</v-icon
														><v-icon small>mdi-account-plus</v-icon>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat>
								<v-card-text height="100%">
									<ToolsComp height="1000px" />
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-card>
				<v-card flat v-else-if="item == 'User Administration'">
					<v-card-text> 2 </v-card-text>
				</v-card>
				<v-card flat v-else-if="item == 'Petition Management'">
					<v-card-text> 3 </v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { mapGetters } from 'vuex';
import ToolsComp from '../tool';
import MetricsForm from './metrics';

export default {
	name: 'IntranetChallengesPage',
	components: {
		ToolsComp,
		MetricsForm,
	},
	data: () => ({
		showModal: false,
		currentItem: 'tab-Community Administration',
		items: [
			'Community Administration',
			'User Administration',
			'Petition Management',
		],
	}),
	computed: {
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
		Return() {
			this.$router.push(
				'/intranet/communities/' + this.$route.params.community
			);
		},
		newChallenge() {
			this.$router.push('/intranet/newChallenge');
		},
		getMetrics(id, acronym) {
			console.log('ID: ' + id + '; ACRONYM: ' + acronym);
		},
		openModal() {
			this.showModal = true;
			console.log(this.showModal);
		},
		closeModal() {
			this.showModal = false;
			console.log(this.showModal);
		},
	},
};
</script>
