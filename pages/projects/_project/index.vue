<template>
	<v-container fluid>
		<v-container>
			<v-skeleton-loader
				v-if="$store.state.projects.loading"
				class="mb-5"
				type="heading, list-item-three-line"
			/>
			<div v-else class="text--clickable" @click="expand = !expand">
				<h1 class="text-h4 mb-5 d-flex">
					{{ project.acronym }}
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
							<v-img :src="project.logo" contain max-width="500" />
						</v-col>
						<v-col class="text-body-2 text--secondary" cols="10">
							<p>
								{{ project.description }}
							</p>
							<p v-if="project.keywords">
								Keywords:
								<span
									v-for="(keyword, index) in project.keywords"
									:key="index"
									class="font-weight-medium"
								>
									{{ keyword }};
								</span>
							</p>
						</v-col>
					</v-row>
				</v-expand-transition>
			</div>
		</v-container>
		<v-tabs :vertical="vertical" class="mt-10">
			<v-tab class="justify-start">
				<v-icon left> mdi-information-outline </v-icon>
				General
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-row no-gutters align="center">
						<v-col cols="8">
							<h2 class="text-h6">General</h2>
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
import mdFile from '~/static/markdown/markdown.md';

export default {
	name: 'ProjectPage',
	components: { MarkedWrapper },
	data() {
		return {
			expand: true,
			markdownContent: mdFile,
		};
	},
	computed: {
		...mapGetters('projects', {
			project: 'currentProject',
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
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.v-tab {
	text-transform: none !important;
}

.text--clickable {
	cursor: pointer;
}
</style>
