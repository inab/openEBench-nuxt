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
		<v-row v-else-if="events.length > 0" class="events-grid">
			<v-col
				v-for="(event, index) in paginatedEvents"
				:key="index"
				cols="12"
				sm="6"
				md="4"
				class="d-flex"
			>
				<v-card
					class="ma-3 d-flex flex-column event-card"
					@click="handleEventClick(event)"
					hover
				>
					<v-card-title class="event-title">{{ event.name }}</v-card-title>
					<v-card-subtitle class="d-flex align-center">
						<v-icon small class="mr-1">mdi-flag-outline</v-icon>
						{{ event.challenges.length }}
						{{ 'Challenges' | pluralize(event.challenges.length) }}
					</v-card-subtitle>
				</v-card>
			</v-col>
			<v-col cols="12" class="d-flex justify-center">
				<v-pagination
					v-if="events.length > itemsPerPage"
					v-model="currentPage"
					:length="pageCount"
					:total-visible="5"
					size="small"
					class="my-4"
				></v-pagination>
			</v-col>
		</v-row>
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
			currentPage: 1,
			itemsPerPage: 12,
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
		pageCount() {
			return Math.ceil(this.events.length / this.itemsPerPage);
		},
		paginatedEvents() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.events.slice(start, end);
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

<style scoped>
.container {
	height: calc(100% - 390px);
}

.events-grid {
	margin-top: 20px;
}

.v-card {
	cursor: pointer;
	width: 100%; /* Ensure cards take up the full width of their column */
}

.event-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%; /* Ensures all cards are the same height */
}

.event-title {
	font-size: 0.9rem; /* Adjust this value to make the text tinier */
	white-space: normal; /* Allow the text to wrap */
	overflow-wrap: break-word; /* Ensure long words break properly */
	word-break: break-word; /* Ensure words do not break in the middle */
	hyphens: auto; /* Add hyphens where applicable */
}

.v-pagination {
	margin-top: 20px;
}
</style>
