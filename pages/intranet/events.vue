<template>
	<v-card>
		<template>
			<v-tabs
				v-model="currentItem"
				dark
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
				<v-card v-if="item == 'Community Administration'" flat height="100%">
					<v-tabs vertical>
						<v-tab> Events </v-tab>
						<v-tab> Tools </v-tab>

						<v-tab-item>
							<v-card flat>
								<v-card-text>
									<div>
										<v-row>
											<v-col>
												<h2>Listing Events - {{ community.acronym }}</h2>
											</v-col>

											<v-col align="right">
												<v-btn color="success" outlined @click="newEvent()">
													<v-icon>mdi-plus </v-icon> Add event
												</v-btn>
												<v-btn color="primary" @click="Return()">
													<v-icon>mdi-keyboard-return</v-icon>Return
												</v-btn>
											</v-col>
										</v-row>
										<table id="datatable" class="table">
											<thead>
												<tr>
													<th>Event Name</th>
													<th>Managers</th>
													<th>Challenges</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(event, e) in orderBy(events, 'name', -1)"
													:key="e"
													dense
													:id="event._id"
												>
													<td @click="detectClick(event._id)" class="goto">
														{{ event.name }}
													</td>
													<td>To Do</td>
													<td>
														<v-icon right @click="goToChallenges(event._id)"
															>mdi-open-in-new</v-icon
														>
													</td>
													<td>
														<v-icon @click="editEvent(event._id)"
															>mdi-pencil</v-icon
														>
														<v-icon>mdi-delete</v-icon>
														<v-icon>mdi-eye-off</v-icon>
														<v-icon>mdi-account-plus</v-icon>
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
				<v-card v-else-if="item == 'User Administration'" flat>
					<v-card-text>
						2
						{{ text }}
					</v-card-text>
				</v-card>
				<v-card v-else-if="item == 'Petition Management'" flat>
					<v-card-text>
						3
						{{ text }}
					</v-card-text>
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
import Vue2Filters from 'vue2-filters';
import ToolsComp from '../tool';

export default {
	name: 'IntranetEventsPage',
	components: {
		ToolsComp,
	},
	mixins: [Vue2Filters.mixin],
	data: () => ({
		currentItem: 'tab-Community Administration',
		items: [
			'Community Administration',
			'User Administration',
			'Petition Management',
		],
		text: 'Lorem ipsum dolor sit amet, con.',
		clicks: 0,
		delay: 300,
		timer: null,
	}),
	computed: {
		...mapGetters('community', {
			events: 'events',
			community: 'community',
			communityReferences: 'communityReferences',
		}),
	},
	mounted() {
		this.$store.dispatch('community/getCommunity', {
			id: this.$route.params.community,
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
		goToChallenges(id) {
			this.$router.push({
				path:
					'/intranet/communities/' + this.$route.params.community + '/' + id,
			});
		},
		editEvent(id) {
			console.log('edit: ' + id);
			this.$router.push({
				name: 'intranet-newEvent',
				params: {
					idBenchmarkingEvent: id,
				},
			});
		},
		detectClick(id) {
			this.clicks++;
			if (this.clicks === 1) {
				// simple click
				this.timer = setTimeout(() => {
					this.goToChallenges(id);
					this.clicks = 0;
				}, this.delay);
			} else {
				// doble click
				clearTimeout(this.timer);
				this.editEvent(id);
				this.clicks = 0;
			}
		},
		Return() {
			this.$router.push('/intranet/communities');
		},
		newEvent() {
			this.$router.push('/intranet/newEvent');
		},
	},
};
</script>
<style>
.goto:hover {
	text-decoration: underline;
	background-color: #f3f3f3;
}
</style>
