<template>
	<v-container fluid>
		<v-container>
			<h1 class="text-h3 mt-10 mb-10">{{ community_id }} Community</h1>
			<p class="text-body-1 text--secondary d-flex align-center mt-3">
				Events of this community and challenges of each event are shown below.
			</p>

			<!-- FOR EACH EVENT -->
			<v-row v-for="(event, e) in events" :key="e" dense>
				<v-col cols="12">
					<h3 class="text-h5 mt-10 mb-5">
						Event #{{ e + 1 }}:
						<!-- Display index of iteration -->
						{{ event.name }}
					</h3>
					<!-- Display event name -->
				</v-col>
				<!-- FOR EACH CHALLENGE IN THIS EVENT -->
				<v-col
					v-for="(challenge, i) in event.challenges"
					:key="i"
					cols="3"
					class="mr-2 ml-2 mt-2 mb-2"
				>
					<!-- Display a card -->
					<v-card class="d-flex flex-column">
						<div class="d-flex flex-no-wrap justify-space-between">
							<div>
								<!-- Display challange acronym -->
								<v-card-title
									v-text="challenge.acronym"
									class="primary--text text-uppercase"
								></v-card-title>
								<!-- Display challange full name -->
								<v-card-subtitle
									class="text-body-2 text--secondary d-flex align-center mb-1 mt-1"
									v-text="challenge.name"
								></v-card-subtitle>
							</div>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ExampleOfPageWithChallenges',
	data() {
		return {
			community_id: 'OEBC002',
		};
	},
	// Getters are used to access data from the store.
	computed: {
		...mapGetters('community', {
			events: 'events',
			community: 'community',
			communityReferences: 'communityReferences',
		}),
	},
	// This function is called when the page is loaded.
	// It is used to initially get the community into the store.
	// It calls the graphql API and retrieves 'events', 'community', 'communityReferences' and 'tools' of the community specified with the id
	mounted() {
		this.$store.dispatch('community/getCommunity', {
			id: this.community_id,
		});
	},
};
</script>
