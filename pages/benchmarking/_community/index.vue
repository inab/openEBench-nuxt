<template>
	<v-container class="height">
		<v-container v-if="$store.state.community.loading.community">
			<v-skeleton-loader class="mb-5" type="heading, list-item-three-line" />
		</v-container>
		<div v-else-if="$store.state.community.error" class="block-error">
			<ApiError />
		</div>
		<v-container v-else>
			<community-info
				:community="community"
				:community-references="communityReferences"
			/>
		</v-container>
		<v-tabs
			v-if="!$store.state.community.error"
			:vertical="vertical"
			class="mt-10"
		>
			<v-tab class="justify-start">
				<v-icon left> mdi-view-dashboard </v-icon>
				Results
			</v-tab>
			<v-tab
				v-if="$store.state.community.loading.community || currentEvent"
				class="justify-start v-tab--min-width"
			>
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
			<v-tab
				v-if="$store.state.community.loading.community || currentEvent"
				class="justify-start"
			>
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

			<v-tab-item
				v-if="$store.state.community.loading.community || currentEvent"
				class="ma-5 mt-5 mt-md-0"
				:transition="false"
			>
				<v-skeleton-loader
					v-if="$store.state.community.loading.events"
					type="table"
				></v-skeleton-loader>

				<v-card
					v-else-if="currentEvent"
					outlined
					class="pa-5 d-flex flex-column"
					elevation="1"
				>
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
			<v-tab-item v-else class="ma-5 mt-5 mt-md-0" :translate="false">
				<v-card outlined class="pa-5" elevation="1">
					<div>
						<v-img :src="illustration" contain max-height="300" />
						<h2 class="mt-10 text-h4 text--secondary text-center">
							No benchmarking results yet...
						</h2>
						<h3 class="mt-5 text-h5 text--secondary text-center">
							Come back soon to see some benchmarking results.
						</h3>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item
				v-if="$store.state.community.loading.community || currentEvent"
				class="ma-5 mt-5 mt-md-0"
				:transition="false"
			>
				<v-card outlined elevation="1">
					<v-skeleton-loader
						v-if="$store.state.community.loading.datasets"
						type="table"
					></v-skeleton-loader>
					<community-datasets-table v-else :datasets="datasets" />
				</v-card>
			</v-tab-item>
			<v-tab-item
				v-if="$store.state.community.loading.community || currentEvent"
				class="ma-5 mt-5 mt-md-0"
				:transition="false"
			>
				<v-card outlined elevation="1">
					<v-skeleton-loader
						v-if="$store.state.community.loading.tools"
						type="table"
					></v-skeleton-loader>
					<community-tools-table v-else :tools="tools" />
				</v-card>
			</v-tab-item>
			<v-tab v-if="community.summary" class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Summary
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper
								v-if="community.summary"
								:markdown="community.summary"
							/>
						</v-col>
					</v-row>
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
import CommunityEventSelector from '~/components/Communities/CommunityEventSelector';
import CommunityInfo from '~/components/Communities/CommunityInfo';
import MarkedWrapper from '~/components/Molecules/MarkedWrapper.vue';
import ApiError from '~/components/Molecules/ApiError';

export default {
	name: 'CommunityPage',
	components: {
		CommunityClassificationTable,
		CommunityToolsTable,
		CommunityDatasetsTable,
		CommunityEventSelector,
		CommunityInfo,
		MarkedWrapper,
		ApiError,
	},
	data() {
		return {
			illustration: require('~/static/images/illustrations/empty-state.svg'),
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			currentEvent: 'currentEvent',
			datasets: 'datasets',
			tools: 'tools',
			community: 'community',
			communityReferences: 'communityReferences',
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
					text: 'Benchmarking Communities',
					disabled: false,
					exact: true,
					to: '/benchmarking',
				},
				{
					text: (this.community ? this.community.acronym : '') + ' Events',
					disabled: false,
					exact: true,
					to: '/benchmarking/' + this.$route.params.community + '/events',
				},
				{
					text: this.currentEvent ? this.currentEvent.name : '',
					disabled: true,
				},
			];
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
		breadcrumbs() {
			this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
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

<style lang="scss" scoped>
.v-tab {
	text-transform: none !important;
}
.v-tab--min-width {
	min-width: 160px;
}

.height {
	height: calc(100% - 390px);
}
</style>
