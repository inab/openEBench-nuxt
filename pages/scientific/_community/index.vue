<template>
	<v-container>
		<v-tabs vertical class="mt-10">
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
				<h1 class="text-h4 mb-5">Community - {{ $route.params.community }}</h1>
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
				{{ datasets }}
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

export default {
	name: 'CommunityPage',
	components: { CommunityClassificationTable, CommunityToolsTable },
	data() {
		return {};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			datasets: 'datasets',
			tools: 'tools',
		}),
		mini() {
			return this.$vuetify.breakpoint.mdAndDown;
		},
		cardElevation() {
			return this.$vuetify.breakpoint.mdAndDown ? '0' : '2';
		},
	},
	mounted() {
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
