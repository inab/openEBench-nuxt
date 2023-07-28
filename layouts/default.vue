<template>
	<v-app>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<breadcrumbs-bar v-if="breadcrumbs.length > 0" :items="breadcrumbs" />
			<v-row justify="center">
				<v-col class="ml-6 mb-2" sm="11" md="9" lg="8" xl="8">
					<v-alert
						border="left"
						color="primary"
						dismissible
						outlined
						text
						type="warning"
					>
						This site will be <b>unavailable</b> from Monday, <b>July 31</b>, at
						<b>14:00 CEST</b> to Wednesday, <b>August 2</b>, at
						<b>19:00 CEST</b> due to maintenance. We apologize for the
						inconvenience.
					</v-alert>
					<Intro />
				</v-col>
			</v-row>

			<Nuxt @emitBreadcrumbs="handleBreadcrumbs" />
			<Footer class="mt-16" />
		</v-main>
		<v-footer class="justify-center" app>
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
	</v-app>
</template>

<script>
import HeaderMenu from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter';
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';

export default {
	name: 'DefaultLayout',
	components: {
		'main-header': HeaderMenu,
		Footer,
		BreadcrumbsBar,
	},
	data() {
		return {
			breadcrumbs: [],
		};
	},
	head() {
		return {
			title:
				'OpenEBench - The ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics',
		};
	},
	watch: {
		$route(newRoute, oldRoute) {
			if (newRoute.path !== oldRoute.path) this.breadcrumbs = [];
		},
	},
	methods: {
		handleBreadcrumbs(value) {
			this.breadcrumbs = value;
		},
	},
};
</script>
