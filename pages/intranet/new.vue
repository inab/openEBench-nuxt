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
					<v-card flat>
						<v-card-text>
							<div>
								<v-row>
									<v-col><h2>NEW</h2></v-col>

									<v-col align="right" @click="Return()"
										><v-btn color="primary"
											><v-icon>mdi-keyboard-return</v-icon>Return</v-btn
										></v-col
									>
								</v-row>
								THIS IS NEW
							</div>
						</v-card-text>
					</v-card>
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

export default {
	name: 'IntranetChallengesPage',
	components: {},
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
		Return() {
			this.$router.push('/intranet/communities');
		},
	},
};
</script>
