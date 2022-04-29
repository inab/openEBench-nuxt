<template>
	<v-container fluid>
		<v-container>
			<v-skeleton-loader
				v-if="$store.state.community.loading.community"
				class="mb-5"
				type="heading, list-item-three-line"
			/>
			<community-info v-else :community="project" />
		</v-container>
		<v-tabs :vertical="vertical" class="mt-10">
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				Summary
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col>
							<marked-wrapper :markdown="markdownContent" />
						</v-col>
					</v-row>
				</v-card>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import MarkedWrapper from '~/components/Molecules/MarkedWrapper.vue';
import CommunityInfo from '~/components/Communities/CommunityInfo';

export default {
	name: 'ProjectPage',
	components: { MarkedWrapper, CommunityInfo },
	computed: {
		...mapGetters('community', {
			project: 'community',
		}),
		vertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
		breadcrumbs() {
			return [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Project Spaces',
					disabled: false,
					exact: true,
					to: '/projects',
				},
				{
					text: this.project ? this.project.acronym : '',
					disabled: true,
					exact: true,
					to: '/projects/' + this.$route.params.project,
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
			this.$store.state.community.community._id !== this.$route.params.project
		) {
			this.$store.dispatch('community/getCommunity', {
				id: this.$route.params.project,
			});
		}
	},
	created() {
		const {
			default: md,
		} = require(`~/static/markdown/projects/${this.$route.params.project}.md`);
		this.markdownContent = md || '';
	},
};
</script>

<style lang="scss" scoped>
.v-tab {
	text-transform: none !important;
}
</style>
