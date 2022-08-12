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
							<div class="mt-2 mx-10">
								<v-row>
									<v-col><h2>Add new Component</h2></v-col>

									<v-col align="right"
										><v-btn color="primary" @click="Return()"
											><v-icon>mdi-keyboard-return</v-icon>Return</v-btn
										></v-col
									>
								</v-row>
								<v-row>
									<JsonSchema :schema="schema" v-model="value" />
									<pre>{{ value }}</pre>
								</v-row>
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
import JsonSchema from '@roma219/vue-jsonschema-form';
import myschema from './myschema.json';

export default {
	name: 'IntranetChallengesPage',
	components: { JsonSchema },
	data: () => ({
		value: {},
		model: {
			name: 'Yourtion',
		},
		currentItem: 'tab-Community Administration',
		items: [
			'Community Administration',
			'User Administration',
			'Petition Management',
		],
		text: 'Lorem ipsum dolor sit amet, con.',
	}),
	computed: {
		schema() {
			return myschema;
		},
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
			this.$router.push('/intranet/communities');
		},
	},
};
</script>
