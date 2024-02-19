<template>
	<v-container>
		<v-skeleton-loader
			v-if="$store.state.community.loading.community"
			class="mb-5"
			type="heading, list-item-three-line"
		/>
		<community-info
			v-else
			:community="community"
			:community-references="communityReferences"
		/>
		<h2 class="text-h5 mt-10">Please choose an event:</h2>
		<p class="text-body-2 text--secondary d-flex align-center mt-3">
			<v-icon small class="mr-3">mdi-information-outline</v-icon>
			An Event corresponds to a time-bound contest where a tool, pipeline,
			service or product, i.e. the participant, is compared against other
			participants using a predefined collection of reference datasets and
			assessment metrics.
		</p>
		<div v-if="$store.state.community.loading.events">
			<v-skeleton-loader
				v-for="index in 10"
				:key="index"
				type="list-item"
			></v-skeleton-loader>
		</div>
		<v-list v-else-if="events.length > 0">
			<v-list-item
				v-for="(event, index) in events"
				:key="index"
				link
				data-test="event"
				@click="handleEventClick(event)"
			>
				<v-list-item-content>
					<v-list-item-title>{{ event.name }}</v-list-item-title>
					<v-list-item-subtitle class="d-flex align-center">
						<v-icon small class="mr-1"> mdi-flag-outline </v-icon>
						{{ event.challenges.length }}
						{{ 'Challenges' | pluralize(event.challenges.length) }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<community-empty-state v-else class="mt-10" />
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CommunityEmptyState from '~/components/Communities/CommunityEmptyState';
import CommunityInfo from '~/components/Communities/CommunityInfo';

export default {
	name: 'CommunityPage',
	components: { CommunityEmptyState, CommunityInfo },
	data() {
		return {
			illustration: require('~/static/images/illustrations/lab_community.png'),
			expand: true,
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			community: 'community',
			communityReferences: 'communityReferences',
		}),
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
					text: this.community ? this.community.acronym : '',
					disabled: true,
					to: this.$route.params.community + '/events',
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
			this.$store.state.community.community._id !== this.$route.params.community
		) {
			this.$store.commit('community/setCurrentEvent', null);

			this.$store.dispatch('community/getCommunity', {
				id: this.$route.params.community,
			});
		}
	},
	methods: {
		handleEventClick(event) {
			this.$router.push({
				name: 'benchmarking-community',
				params: { community: this.$route.params.community },
				query: { event: event._id },
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.text--clickable {
	cursor: pointer;
}
</style>
