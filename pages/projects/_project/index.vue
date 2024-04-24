<template>
	<v-container fluid>
		<v-container>
			<v-skeleton-loader
				v-if="$store.state.community.loading.community"
				class="mb-5"
				type="heading, list-item-three-line"
			/>
			<community-info v-else :community="project" />
		</v-container>
		<v-tabs :vertical="vertical" class="mt-10">
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Summary
			</v-tab>
			<v-tab class="justify-start">
				<v-icon left> mdi-view-dashboard </v-icon>
				Results
			</v-tab>
			<v-tab class="justify-start v-tab--min-width">
				<v-icon left> mdi-folder </v-icon>
				<v-badge
					color="secondary"
					:value="datasets.length"
					:content="datasets.length"
					offset-x="-1"
				>
					Datasets
				</v-badge>
			</v-tab>
			<v-tab class="justify-start">
				<v-icon left> mdi-cube-outline </v-icon>
				<v-badge
					color="secondary"
					:value="tools.length"
					:content="tools.length"
					offset-x="-1"
				>
					Tools
				</v-badge>
			</v-tab>

			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper
								v-if="project.summary"
								:markdown="project.summary"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>

			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-skeleton-loader
					v-if="$store.state.community.loading.events"
					type="table"
				></v-skeleton-loader>

				<v-card v-else-if="currentEvent" outlined class="pa-5" elevation="1">
					<community-event-selector
						:current-event="currentEvent"
						:events="events"
						@change="handleEventSelection"
					/>
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
import MarkedWrapper from '~/components/Molecules/MarkedWrapper.vue';
import CommunityClassificationTable from '~/components/Communities/CommunityClassificationTable';
import CommunityToolsTable from '~/components/Communities/CommunityToolsTable';
import CommunityDatasetsTable from '~/components/Communities/CommunityDatasetsTable';
import CommunityEventSelector from '~/components/Communities/CommunityEventSelector';
import CommunityInfo from '~/components/Communities/CommunityInfo';

export default {
	name: 'ProjectPage',
	components: {
		MarkedWrapper,
		CommunityClassificationTable,
		CommunityToolsTable,
		CommunityDatasetsTable,
		CommunityEventSelector,
		CommunityInfo,
	},
	computed: {
		...mapGetters('community', {
			currentEvent: 'currentEvent',
			events: 'events',
			project: 'community',
			datasets: 'datasets',
			community: 'community',
			communityReferences: 'communityReferences',
			tools: 'tools',
		}),
		vertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
		breadcrumbs() {
			return [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Project Spaces',
					disabled: false,
					exact: true,
					to: '/projects',
				},
				{
					text: this.project ? this.project.acronym : '',
					disabled: true,
					exact: true,
					to: '/projects/' + this.$route.params.project,
				},
			];
		},
	},
	watch: {
		breadcrumbs() {
			this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		},
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);

		if (
			this.$store.state.community.community._id !== this.$route.params.project
		) {
			this.$store.commit('community/setCurrentEvent', null);

			this.$store.dispatch('community/getCommunity', {
				id: this.$route.params.project,
			});
		} else if (this.$route.query.event) {
			this.setCurrentEvent(this.$route.query.event);
		}
	},
	created() {
		// const {
		// 	default: md,
		// } = require(`~/static/markdown/projects/${this.$route.params.project}.md`);
		// this.markdownContent = md || '';
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

<style lang="scss" scoped>
.v-tab {
	text-transform: none !important;
}
</style>
