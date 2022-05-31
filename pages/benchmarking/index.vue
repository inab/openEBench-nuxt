<template>
	<v-container fluid>
		<v-container>
			<h1 class="text-h4 mt-13 mb-5 hidden-md-and-up">
				Benchmarking Communities
			</h1>
			<info-slider class="mb-5 hidden-sm-and-down" :img="illustration">
				<template #header>
					<h1 class="text-h4">Benchmarking Communities</h1>
				</template>
				<p class="text--primary">
					Unbiased and objective evaluations of bioinformatics resources are
					challenging to set up and can only be effective when built and
					implemented around community driven efforts. Thus, in OpenEBench we
					gather several community initiatives which establish standards and
					automated services to facilitate scientific benchmarking.
				</p>

				<p class="text--primary">
					These efforts provide a way for software developers to implement more
					efficient methods, tools and web services by comparing their
					performance on previously agreed datasets and metrics with other
					similar resources and, more importantly, help end-users that tend to
					have difficulties in choosing the right tool for the problem at hand,
					and are not necessarily aware of the latest developments in each of
					the fields of the bioinformatics methods they need to use.
				</p>
			</info-slider>
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
						:status="community.status"
						:benchmarking-events="community.benchmarkingEvents"
						:reference-tools="[]"
						:to="'/benchmarking/' + community._id"
						class="fill-height"
					/>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import CommunityCard from '~/components/Cards/CommunityCard';
import InfoSlider from '~/components/Molecules/InfoSlider';

export default {
	name: 'CommunitiesIndexPage',
	components: {
		CommunityCard,
		InfoSlider,
	},
	data() {
		return {
			illustration: require('~/static/images/illustrations/lab_community.png'),
			expand: true,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Benchmarking Communities',
					to: '/benchmarking',
				},
			],
		};
	},
	computed: {
		...mapGetters('communities', {
			communities: 'communitiesList',
		}),
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);

		if (this.$store.state.communities.list.length === 0)
			this.$store.dispatch('communities/getCommunities');
	},
};
</script>
