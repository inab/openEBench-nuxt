<template>
	<v-container>
		<v-skeleton-loader
			v-if="$store.state.community.loading.community"
			class="mb-5"
			type="heading, list-item-three-line"
		/>
		<div v-else>
			<h1 class="text-h4 d-flex text--clickable" @click="expand = !expand">
				{{ community.acronym }} - {{ community.name }}
				<v-btn class="ml-2" color="primary" icon>
					<v-icon>{{
						expand
							? 'mdi-chevron-up-circle-outline'
							: 'mdi-chevron-down-circle-outline'
					}}</v-icon>
				</v-btn>
			</h1>
			<h2 class="subtitle-1 mb-5">{{ community.name }}</h2>
			<v-expand-transition>
				<v-row v-show="expand" align="center">
					<v-col align="center" cols="2">
						<v-img :src="community.logo" contain max-width="500" />
					</v-col>
					<v-col class="text-body-2 text--secondary" cols="10">
						<p>{{ community.description }}</p>
						<p v-if="community.keywords">
							Keywords:
							<span
								v-for="(keyword, index) in community.keywords"
								:key="index"
								class="font-weight-medium"
							>
								{{ keyword }};
							</span>
						</p>
						<p v-if="communityReferences.length > 0">
							References:
							<a
								v-for="(keyword, index) in communityReferences"
								:key="index"
								target="_blank"
								class="font-weight-medium"
								:href="keyword.href"
							>
								{{ keyword.doi }};
							</a>
						</p>
					</v-col>
				</v-row>
			</v-expand-transition>
		</div>
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

export default {
	name: 'CommunityPage',
	components: { CommunityEmptyState },
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
