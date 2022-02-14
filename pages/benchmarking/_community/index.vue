<template>
	<v-container fluid>
		<v-container>
			<v-skeleton-loader
				v-if="$store.state.community.loading.community"
				class="mb-5"
				type="heading, list-item-three-line"
			/>
			<div v-else>
				<h1 class="text-h4 mb-5 d-flex headline" @click="expand = !expand">
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
						<v-col class="text-body-2" cols="10">
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

				<v-expansion-panels v-else accordion mandatory class="mt-1">
					<v-expansion-panel v-for="(event, index) in events" :key="index">
						<v-expansion-panel-header>
							<v-row no-gutters>
								<v-col cols="8">
									{{ event.name }}
								</v-col>
								<v-col cols="4" class="text--secondary">
									{{ event.challenges.length }}
									{{ 'Challenges' | pluralize(event.challenges.length) }}
								</v-col>
							</v-row>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<community-classification-table
								:key="index + '_table'"
								:event="event"
							/>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-tab-item>
			<v-tab-item class="ma-5 mt-0" :transition="false">
				<v-card>
					<v-skeleton-loader
						v-if="$store.state.community.loading.datasets"
						type="table"
					></v-skeleton-loader>
					<community-datasets-table v-else :datasets="datasets" />
				</v-card>
			</v-tab-item>
			<v-tab-item class="ma-5 mt-0" :transition="false">
				<v-card>
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
			datasets: 'datasets',
			tools: 'tools',
			community: 'community',
		}),
		vertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);

		if (
			this.$store.state.community.community._id !== this.$route.params.community
		) {
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
		}
	},
};
</script>

<style lang="scss">
.v-tab {
	text-transform: none !important;
}

.headline {
	cursor: pointer;
}
</style>
