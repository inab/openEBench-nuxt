<template>
	<v-container fluid>
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

			<v-tab-item class="ma-5 mt-0" :transition="false">
				<h1 class="text-h4 mb-5">
					{{ community.acronym }} - {{ community.name }}
				</h1>
				<v-expansion-panels accordion mandatory>
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
				<h1 class="text-h4 mb-5">Datasets - {{ $route.params.community }}</h1>
				<community-datasets-table :datasets="datasets" />
			</v-tab-item>
			<v-tab-item class="ma-5 mt-0" :transition="false">
				<h1 class="text-h4 mb-5">Participating Tools</h1>
				<community-tools-table :tools="tools" />
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
		return {};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			datasets: 'datasets',
			tools: 'tools',
			community: 'community',
		}),
		vertical() {
			return this.$vuetify.breakpoint.smAndUp;
		},
	},
	mounted() {
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
	},
};
</script>

<style lang="scss">
.v-tab {
	text-transform: none !important;
}
</style>
