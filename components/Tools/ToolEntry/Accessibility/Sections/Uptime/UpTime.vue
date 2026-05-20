<template>
	<div v-if="!webAvailabilityNoData">
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
				<v-chip color="indigo lighten-5" class="pl-5 pr-5">
					<a
						:href="displayedWebpage"
						target="_blank"
						rel="noopener noreferrer"
						class="text-body font-weight-medium"
					>
						{{ displayedWebpage }}
					</a>
				</v-chip>
			</v-col>
		</v-row>
		<!--Tabs with status and plot-->
		<v-row class="mt-0 pt-0 mb-2" justify="center">
			<!--Tabs-->
			<v-col
				v-if="webAvailabilityLoading || availableRanges.length"
				cols="12"
				class="d-flex justify-center"
			>
				<v-tabs v-model="tabUptime" centered>
					<v-tab v-for="range in availableRanges" :key="range.key" class="tab">
						{{ range.label }}
					</v-tab>
				</v-tabs>
			</v-col>
			<v-col v-if="webAvailabilityError && !webAvailabilityNoData" cols="12">
				<v-alert dense text type="warning">
					Uptime data is not available for this webpage right now.
				</v-alert>
			</v-col>
			<v-col v-else-if="webAvailabilityLoading" cols="12">
				<v-skeleton-loader type="list-item-two-line, image" />
			</v-col>
			<template v-else>
				<!--Status-->
				<v-col cols="8">
					<upTimeStatus :status="status" :time="statusDays" />
				</v-col>
				<!--Plot-->
				<v-col cols="12" class="pa-0">
					<v-tabs-items v-model="tabUptime">
						<v-tab-item v-for="range in availableRanges" :key="range.key">
							<UptimePlot
								class="mb-2"
								style="width: 100%"
								:data-items="availabilityItemsByRange(range.key)"
								:dtick="rangeDtick(range.key)"
							/>
						</v-tab-item>
					</v-tabs-items>
				</v-col>
			</template>
		</v-row>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import UptimePlot from './UptimePlot.vue';
import upTimeStatus from './upTimeStatus.vue';

export default {
	name: 'UpTime',
	components: {
		UptimePlot,
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
			tabUptime: 0,
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
			webAvailability: 'webAvailability',
			webAvailabilityUrl: 'webAvailabilityUrl',
			webAvailabilityLoading: 'webAvailabilityLoading',
			webAvailabilityError: 'webAvailabilityError',
			webAvailabilityNoData: 'webAvailabilityNoData',
		}),
		webpageTerms() {
			return (
				this.tool.webpage?.map((webpage) => webpage?.term).filter(Boolean) || []
			);
		},
		webpageTerm() {
			return this.webpageTerms[0] || '';
		},
		displayedWebpage() {
			return this.webAvailabilityUrl || this.webpageTerm;
		},
		ranges() {
			return [
				{ key: 'week', label: 'Week' },
				{ key: 'month', label: 'Month' },
				{ key: 'sixMonths', label: '6 months' },
			];
		},
		availableRanges() {
			return this.ranges.filter(({ key }) => {
				return this.availabilityItemsByRange(key).length > 0;
			});
		},
		activeRange() {
			return this.availableRanges[this.tabUptime]?.key || '';
		},
		availabilityItems() {
			return this.availabilityItemsByRange(this.activeRange);
		},
		sortedAvailabilityItems() {
			return [...this.availabilityItems].sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			});
		},
		latestAvailabilityItem() {
			return (
				this.sortedAvailabilityItems[this.sortedAvailabilityItems.length - 1] ||
				null
			);
		},
		status() {
			if (!this.latestAvailabilityItem) {
				return 'UNKNOWN';
			}

			return this.statusForItem(this.latestAvailabilityItem);
		},
		statusDays() {
			if (!this.latestAvailabilityItem) {
				return 0;
			}

			let days = 0;
			const latestStatus = this.statusForItem(this.latestAvailabilityItem);

			for (let i = this.sortedAvailabilityItems.length - 1; i >= 0; i--) {
				if (
					this.statusForItem(this.sortedAvailabilityItems[i]) !== latestStatus
				) {
					break;
				}
				days += 1;
			}

			return days;
		},
	},
	watch: {
		webpageTerms: {
			immediate: true,
			handler(webpages) {
				if (webpages.length) {
					this.tabUptime = 0;
					this.$store.dispatch('tool_entry/retrieveWebAvailability', webpages);
				} else {
					this.$store.commit('tool_entry/resetWebAvailability');
				}
			},
		},
		availableRanges() {
			if (this.tabUptime >= this.availableRanges.length) {
				this.tabUptime = 0;
			}
		},
	},
	methods: {
		availabilityItemsByRange(range) {
			const payload = this.webAvailability?.[range] || [];
			const items =
				payload?.data ||
				payload?.results ||
				payload?.items ||
				payload?.availability ||
				payload;

			return Array.isArray(items) ? items : [];
		},
		rangeDtick(range) {
			const day = 86400000;

			if (range === 'sixMonths') {
				return String(day * 15);
			}

			if (range === 'month') {
				return String(day * 7);
			}

			return String(day);
		},
		statusForItem(item) {
			if (!item || item.code === null || item.code === undefined) {
				return 'UNKNOWN';
			}

			return item.code >= 200 && item.code < 400 ? 'UP' : 'DOWN';
		},
	},
};
</script>
