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
									<v-col><h2>Add new Community</h2></v-col>

									<v-col align="right"
										><v-btn color="primary" @click="Return()"
											><v-icon>mdi-keyboard-return</v-icon>Return</v-btn
										></v-col
									>
								</v-row>
								<p v-if="!jsonData">Loading...</p>
								<v-row v-else>
									<JsonSchema :schema="schema" v-model="value" />
									<br />
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
import $ from 'jquery';

export default {
	name: 'IntranetChallengesPage',
	components: { JsonSchema },
	data: () => ({
		value: {},
		model: {},
		currentItem: 'tab-Community Administration',
		items: [
			'Community Administration',
			'User Administration',
			'Petition Management',
		],
		text: 'Lorem ipsum dolor sit amet, con.',
		jsonData: null,
	}),
	computed: {
		schema: function () {
			return JSON.parse(JSON.stringify(this.jsonData));
		},
	},
	created: function () {
		this.getJSONMethod();
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
		async getJSONMethod() {
			const jsonRaw = await $.getJSON(
				'https://raw.githubusercontent.com/sthhher/prueba2/main/myschema.json'
			).then(function (data) {
				return data;
			});
			this.jsonData = jsonRaw;
		},
	},
};
</script>
<style>
.form {
	text-align: left;
	width: 600px;
	margin: auto;
}

h1 {
	font-size: 1.7em;
	text-align: center;
	margin-top: 0;
	margin-bottom: 0.2em;
}

h1 + p {
	display: block;
	text-align: center;
	margin-bottom: 1.2em;
}

small {
	line-height: 20px;
	display: block;
}

.el-alert {
	margin-bottom: 15px;
}
</style>
