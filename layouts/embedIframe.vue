<template>
	<v-app>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<breadcrumbs-bar v-if="breadcrumbs.length > 0" :items="breadcrumbs" />
			<v-container class="v-container-custom">
				<Nuxt @emitBreadcrumbs="handleBreadcrumbs" />
			</v-container>
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
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';
import Footer from '~/components/TheFooter';

export default {
	name: 'EmbedIframe',
	components: {
		'main-header': HeaderMenu,
		BreadcrumbsBar,
		Footer,
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

<style lang="scss" scoped>
.v-container-custom {
	height: 100%;
}
</style>
