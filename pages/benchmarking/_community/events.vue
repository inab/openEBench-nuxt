<template>
	<v-container>
		<h1 class="text-h4">Events</h1>
		<div v-if="$store.state.community.loading.events">
			<v-skeleton-loader
				v-for="index in 10"
				:key="index"
				type="list-item"
			></v-skeleton-loader>
		</div>
		<v-list v-else>
			<v-list-item v-for="(event, index) in events" :key="index" link>
				<v-list-item-title @click="handleEventClick(event)">{{
					event.name
				}}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'CommunityPage',
	components: {},
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
					disabled: false,
					exact: true,
					to: './',
				},
				{
					text: 'Events',
					disabled: true,
					to: this.$route.params.community + '/events',
				},
			],
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			community: 'community',
		}),
	},
	watch: {},
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
