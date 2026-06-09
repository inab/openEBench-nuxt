<template>
	<v-app :class="{ 'is-loading': isLoading }">
		<!-- Progress bar -->
		<v-progress-linear
			v-if="isLoading"
			indeterminate
			color="primary"
			class="loading-bar"
		></v-progress-linear>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<breadcrumbs-bar v-if="breadcrumbs.length > 0" :items="breadcrumbs" />
			<Nuxt @emitBreadcrumbs="handleBreadcrumbs" />
			<back-to-top />
			<Footer ref="Footer" class="mt-16" />
		</v-main>
		<v-footer class="justify-center" app>
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderMenu from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter';
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';
import BackToTop from '~/components/Molecules/BackToTop.vue';

export default {
	name: 'DefaultLayout',
	components: {
		'main-header': HeaderMenu,
		Footer,
		BreadcrumbsBar,
		'back-to-top': BackToTop,
	},
	data() {
		return {
			breadcrumbs: [],
		};
	},
	computed: {
		...mapGetters({
			toolLoading: 'tool/loading',
		}),
		isLoading() {
			if (!this.toolLoading) return false;
			return (
				this.toolLoading.initialSearch ||
				this.toolLoading.search ||
				this.toolLoading.loadMore
			);
		},
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

<style scoped>
.is-loading {
	cursor: wait;
}

.loading-bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2000;
}
</style>
