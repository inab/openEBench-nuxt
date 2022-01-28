<template>
	<v-container>
		<h1 class="text-h4 mt-13 mb-5">Communities</h1>
		<v-row>
			<v-col
				v-for="(community, index) in communities"
				:key="index"
				cols="12"
				sm="4"
				md="3"
			>
				<community-card
					:id="community._id"
					:name="community.acronym"
					:desc="community.name"
					:img="community.logo"
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
