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
						<v-tab> Communities </v-tab>
						<v-tab> All tools </v-tab>

						<v-tab-item>
							<v-card flat>
								<v-card-text>
									<div>
										<v-row>
											<v-col><h2>Listing Communities</h2></v-col>

											<v-col></v-col>
										</v-row>
										<table class="table" id="datatable">
											<thead>
												<tr>
													<th>Community Name</th>
													<th>Owners</th>
													<th>Type</th>
													<th>Follow</th>
													<th>Events</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>a</td>
													<td>b</td>
													<td>c</td>
													<td>d</td>
													<td>
														<v-icon right @click="goToEvents()"
															>mdi-open-in-new</v-icon
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
					<v-card-text>
						2
						{{ text }}
					</v-card-text>
				</v-card>
				<v-card flat v-else-if="item == 'Petition Management'">
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
import ToolsComp from '../tool';

export default {
	name: 'IntranetCommunitiesPage',
	components: {
		ToolsComp,
	},
	data: () => ({
		currentItem: 'tab-Community Administration',
		items: [
			'Community Administration',
			'User Administration',
			'Petition Management',
		],
		text: 'Lorem ipsum dolor sit amet, con.',
	}),
	methods: {
		addItem(item) {
			const removed = this.items.splice(0, 1);
			this.items.push(...this.more.splice(this.more.indexOf(item), 1));
			this.more.push(...removed);
			this.$nextTick(() => {
				this.currentItem = 'tab-' + item;
			});
		},
		goToEvents() {
			this.$router.push('./events');
		},
	},
};
</script>
