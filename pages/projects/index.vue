<template>
	<v-container fluid>
		<v-container>
			<h1 class="text-h4 mt-13 mb-5 hidden-md-and-up">Project Spaces</h1>
			<info-slider class="mb-5 hidden-sm-and-down" :img="illustration">
				<template #header>
					<h1 class="text-h4">Project Spaces</h1>
				</template>
				<p class="text--secondary">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</info-slider>
			<v-row v-if="$store.state.projects.loading">
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
					v-for="(project, index) in projects"
					:key="index"
					cols="12"
					sm="4"
					md="3"
				>
					<community-card
						:_id="project._id"
						:acronym="project.acronym"
						:name="project.name"
						:logo="project.logo"
						:links="project.links"
						:status="project.status"
						:benchmarking-events="project.benchmarkingEvents"
						:reference-tools="[]"
						:to="'/projects/' + project._id"
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
					text: 'Project Spaces',
					to: '/projects',
				},
			],
		};
	},
	computed: {
		...mapGetters('projects', {
			projects: 'projectsList',
		}),
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>