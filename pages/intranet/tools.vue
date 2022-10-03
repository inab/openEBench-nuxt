<template>
	<div>
		<form>
			<div class="row">
				<div class="col">
					<label>Filter by Name:</label>
					<input class="form-control" v-model="filters.name.value" />
				</div>
				<div class="col">
					<label>Filter by Age:</label>
					<input
						type="number"
						class="form-control"
						v-model="filters.age.value"
					/>
				</div>
			</div>
		</form>

		<br />
		<v-table :data="users" :filters="filters">
			<thead slot="head">
				<th>Name</th>
				<th>Age</th>
				<th>Email</th>
				<th>Address</th>
			</thead>
			<tbody slot="body" slot-scope="{ displayData }">
				<tr v-for="row in displayData" :key="row.guid">
					<td>{{ row.name }}</td>
					<td>{{ row.age }}</td>
					<td>{{ row.email }}</td>
					<td>
						{{ row.address.street }},
						{{ row.address.city }}
						{{ row.address.state }}
					</td>
				</tr>
			</tbody>
		</v-table>
	</div>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { mapGetters } from 'vuex';
import SmartTable from 'vuejs-smart-table';
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import users from './users.json';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(SmartTable);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

export default {
	name: 'IntranetToolsPage',
	data: () => ({
		users,
		filters: {
			name: { value: '', keys: ['name'] },
			age: { value: '', keys: ['age'] },
		},
	}),
	computed: {
		...mapGetters('tools', {
			tools: 'tools',
		}),
	},
	mounted() {
		this.$store.dispatch('tools/getTools', {
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
	},
};
</script>
