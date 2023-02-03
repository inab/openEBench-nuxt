<template>
	<v-card>
		<template>
			<v-tabs
				v-model="currentItem"
				background-color="#0b579f"
				show-arrows
				fixed-tabs
				dark
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
						<v-tab> Communities </v-tab>
						<v-tab> All tools </v-tab>

						<v-tab-item>
							<v-card flat>
								<v-card-text>
									<div>
										<v-row>
											<v-col>
												<h2>Listing Communities</h2>
											</v-col>
											<v-col align="right">
												<v-btn color="success" outlined @click="newCommunity()">
													<v-icon>mdi-plus </v-icon> Add community
												</v-btn>
											</v-col>
										</v-row>
										<table id="datatable" class="table">
											<thead>
												<tr>
													<th>Community Name</th>
													<th>Owners</th>
													<th>Events</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(community, c) in orderBy(
														communities,
														'acronym'
													)"
													:key="c"
													dense
													:id="community._id"
												>
													<td @click="detectClick(community._id)" class="goto">
														{{ community.acronym }}
													</td>
													<td>To Do</td>
													<td>
														<v-icon right @click="goToEvents(community._id)">
															mdi-open-in-new
														</v-icon>
													</td>
													<td>
														<v-icon @click="editCommunity(community._id)"
															>mdi-pencil</v-icon
														>
														<v-icon>mdi-delete</v-icon>
														<v-icon @click="showHide(community._id)"
															>mdi-eye-off</v-icon
														>
														<v-icon>mdi-account-plus</v-icon>
														<v-icon @click="follow(community._id)"
															>mdi-heart-outline</v-icon
														>
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
import ToolsComp from './tools.vue';

export default {
	name: 'IntranetCommunitiesPage',
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
		...mapGetters('communities', {
			communities: 'communitiesList',
		}),
	},
	mounted() {
		this.$store.dispatch('communities/getCommunities');
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
		goToEvents(id) {
			this.$router.push({
				path: '/intranet/communities/' + id,
			});
		},
		detectClick(id) {
			this.clicks++;
			if (this.clicks === 1) {
				// simple click
				this.timer = setTimeout(() => {
					this.goToEvents(id);
					this.clicks = 0;
				}, this.delay);
			} else {
				// doble click
				clearTimeout(this.timer);
				this.editCommunity(id);
				this.clicks = 0;
			}
		},
		newCommunity() {
			this.$router.push('/intranet/newCommunity');
		},
		follow(id) {
			console.log('follow ' + id);
		},
		showHide(id) {
			console.log('show ' + id);
		},
		editCommunity(id) {
			console.log('edit: ' + id);
			this.$router.push({
				name: 'intranet-newCommunity',
				params: {
					idCommunity: id,
				},
			});
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
