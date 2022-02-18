<template>
	<v-container fluid>
		<v-container>
			<v-skeleton-loader
				v-if="$store.state.community.loading.community"
				class="mb-5"
				type="heading, list-item-three-line"
			/>
			<div v-else class="text--clickable" @click="expand = !expand">
				<h1 class="text-h4 mb-5 d-flex">
					{{ community.acronym }} - {{ community.name }}
					<v-btn class="ml-2" color="primary" icon>
						<v-icon>{{
							expand
								? 'mdi-chevron-up-circle-outline'
								: 'mdi-chevron-down-circle-outline'
						}}</v-icon>
					</v-btn>
				</h1>
				<v-expand-transition>
					<v-row v-show="expand" align="center">
						<v-col align="center" cols="2">
							<v-img :src="community.logo" contain max-width="500" />
						</v-col>
						<v-col class="text-body-2 text--secondary" cols="10">
							{{ community.description }}
						</v-col>
					</v-row>
				</v-expand-transition>
			</div>
		</v-container>
		<v-tabs :vertical="vertical" class="mt-10">
			<v-tab class="justify-start">
				<v-icon left> mdi-view-dashboard </v-icon>
				Results
			</v-tab>
			<v-tab class="justify-start">
				<v-icon left> mdi-folder </v-icon>
				Datasets
			</v-tab>
			<v-tab class="justify-start">
				<v-icon left> mdi-cube-outline </v-icon>
				Tools
			</v-tab>

			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-skeleton-loader
					v-if="$store.state.community.loading.events"
					type="table"
				></v-skeleton-loader>

				<v-card v-else-if="currentEvent" outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col cols="8">
							<h2 v-if="currentEvent" class="text-h6">
								<v-menu auto>
									<template #activator="{ on, attrs }">
										<span
											class="text--clickable primary--text"
											v-bind="attrs"
											v-on="on"
											>{{ currentEvent.name }}</span
										>
										<v-btn icon color="primary" v-bind="attrs" v-on="on">
											<v-icon>mdi-chevron-down</v-icon>
										</v-btn>
									</template>
									<v-list>
										<v-list-item
											v-for="(event, index) in events"
											:key="index"
											link
											dense
										>
											<v-list-item-title @click="handleEventSelection(event)">{{
												event.name
											}}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</h2>
						</v-col>
						<v-col cols="4" class="text--secondary">
							{{ currentEvent.challenges.length }}
							{{ 'Challenges' | pluralize(currentEvent.challenges.length) }}
						</v-col>
					</v-row>
					<community-classification-table
						:key="currentEvent._id + '_table'"
						class="mt-5"
						:event="currentEvent"
					/>
				</v-card>
			</v-tab-item>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined elevation="1">
					<v-skeleton-loader
						v-if="$store.state.community.loading.datasets"
						type="table"
					></v-skeleton-loader>
					<community-datasets-table v-else :datasets="datasets" />
				</v-card>
			</v-tab-item>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined elevation="1">
					<v-skeleton-loader
						v-if="$store.state.community.loading.tools"
						type="table"
					></v-skeleton-loader>
					<community-tools-table v-else :tools="tools" />
				</v-card>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CommunityClassificationTable from '~/components/Communities/CommunityClassificationTable';
import CommunityToolsTable from '~/components/Communities/CommunityToolsTable';
import CommunityDatasetsTable from '~/components/Communities/CommunityDatasetsTable';

export default {
	name: 'CommunityPage',
	components: {
		CommunityClassificationTable,
		CommunityToolsTable,
		CommunityDatasetsTable,
	},
	data() {
		return {
			illustration: require('~/static/images/illustrations/lab_community.png'),
			expand: true,
			breadcrumbs: [
				{
					text: 'Dashboard',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Benchmarking Communities',
					disabled: false,
					exact: true,
					to: '/benchmarking',
				},
				{
					text: this.$route.params.community,
					disabled: true,
					to: this.$route.params.community,
				},
			],
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			currentEvent: 'currentEvent',
			datasets: 'datasets',
			tools: 'tools',
			community: 'community',
		}),
		vertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
	},
	watch: {
		events() {
			if (this.$route.query.event) {
				this.setCurrentEvent(this.$route.query.event);
			}
		},
		currentEvent() {
			if (this.currentEvent)
				this.$router.push({
					path: this.$route.path,
					query: { event: this.currentEvent._id },
				});
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);

		if (
			this.$store.state.community.community._id !== this.$route.params.community
		) {
			this.$store.commit('community/setCurrentEvent', null);

			this.$store.dispatch('community/getCommunity', {
				id: this.$route.params.community,
			});
			this.$store.dispatch('community/getBenchmarkingEvents', {
				id: this.$route.params.community,
			});
			this.$store.dispatch('community/getDatasets', {
				id: this.$route.params.community,
			});
			this.$store.dispatch('community/getTools', {
				id: this.$route.params.community,
			});
		} else if (this.$route.query.event) {
			this.setCurrentEvent(this.$route.query.event);
		}
	},
	methods: {
		handleEventSelection(event) {
			this.$store.commit('community/setCurrentEvent', event);
		},
		setCurrentEvent(eventId) {
			const event = this.$store.getters['community/getEventById'](eventId);
			if (event) this.$store.commit('community/setCurrentEvent', event);
		},
	},
};
</script>

<style lang="scss">
.v-tab {
	text-transform: none !important;
}

.text--clickable {
	cursor: pointer;
}
</style>
