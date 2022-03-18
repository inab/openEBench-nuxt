<template>
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
		<h2 class="text-h5 mt-10">Please choose an event:</h2>
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
		};
	},
	computed: {
		...mapGetters('community', {
			events: 'events',
			community: 'community',
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
