<template>
	<div>
		<!--Title of section-->
		<v-row class="mt-0 pt-0 mb-2">
			<v-col cols="12" class="pt-0 mt-0 mb-0 pb-1">
				<span class="text-subtitle d-flex align-center">
					<v-icon small color="black" class="mr-1"> mdi-console </v-icon>
					{{ type }}
				</span>
			</v-col>
		</v-row>
		<!--Webpage-->
		<v-row class="mt-0 pt-0 mb-2">
			<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0 d-flex justify-center">
				<v-chip color="indigo lighten-5" class="pl-5 pr-5"
					><a class="text-body font-weight-medium">{{
						tool.webpage[0].term
					}}</a></v-chip
				>
			</v-col>
		</v-row>
		<!--Tabs with status and plot-->
		<v-row class="mt-0 pt-0 mb-2" justify="center">
			<!--Tabs-->
			<v-col cols="12" class="d-flex justify-center">
				<v-tabs v-model="tabUptime" centered>
					<v-tab class="tab">Week</v-tab>
					<v-tab class="tab">Month</v-tab>
					<v-tab class="tab">6 months</v-tab>
				</v-tabs>
			</v-col>
			<!--Status-->
			<v-col cols="11" class="d-flex justify-left pb-0">
				<upTimeStatus :status="status" :time="time" />
			</v-col>
			<!--Plot-->
			<v-col cols="12" class="pt-0">
				<v-tabs-items v-model="tabUptime">
					<v-tab-item>
						<UptimePlotWeek class="mb-2 pl-3 pr-3" />
					</v-tab-item>
					<v-tab-item>
						<UptimePlotMonth class="mb-2 pl-3 pr-3" />
					</v-tab-item>
					<v-tab-item> </v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import UptimePlotMonth from './UptimePlotMonth.vue';
import UptimePlotWeek from './UptimePlotWeek.vue';
import upTimeStatus from './upTimeStatus.vue';

export default {
	name: 'UpTime',
	components: {
		UptimePlotMonth,
		UptimePlotWeek,
		upTimeStatus,
	},
	props: {
		type: {
			type: String,
			default: 'tool',
		},
	},
	data() {
		return {
			status: 'UP',
			time: 23,
			tabUptime: 0,
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
	},
	methods: {
		urlFormatter() {
			// TODO: this way of getting id will break the ap for some tools.

			const version = this.tool.version[0];
			// get domain of first webpage in tool.webpage
			const domain = this.tool.webpage[0].term.split('/')[2];

			const url = `biotools:${this.tool.name}:${version}/${this.tool.type}/${domain}`;

			return url;
		},
	},
};
</script>
