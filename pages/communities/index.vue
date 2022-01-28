<template>
	<v-container>
		<h1 class="text-h4 mt-13 mb-5">Communities</h1>
		<v-row v-if="$store.state.communities.loading">
			<v-col
				v-for="(c, i) in [1, 2, 3, 4, 5, 6, 7, 8]"
				:key="i"
				cols="12"
				sm="4"
				md="3"
			>
				<v-skeleton-loader
					class="mx-auto"
					max-width="300"
					type="card, list-item-two-line, actions"
					elevation="2"
				></v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col
				v-for="(community, index) in communities"
				:key="index"
				cols="12"
				sm="4"
				md="3"
			>
				<community-card
					:_id="community._id"
					:acronym="community.acronym"
					:name="community.name"
					:logo="community.logo"
					:links="community.links"
					class="fill-height"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CommunityCard from '~/components/Cards/CommunityCard';

export default {
	name: 'CommunitiesPage',
	components: {
		CommunityCard,
	},
	computed: {
		...mapGetters('communities', {
			communities: 'communitiesList',
		}),
	},
	mounted() {
		this.$store.dispatch('communities/getCommunities');
	},
};
</script>
