<template>
	<v-app id="layout-container" :class="{ 'is-loading': isLoading }">
		<!-- Progress bar -->
		<v-progress-linear
			v-if="isLoading"
			indeterminate
			color="primary"
			class="loading-bar"
		></v-progress-linear>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<Nuxt />
			<back-to-top />
			<Footer class="mt-16" />
		</v-main>
		<v-footer class="justify-center" app style="z-index: 9999">
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderMenu from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter';
import BackToTop from '~/components/Molecules/BackToTop.vue';

export default {
	name: 'SearchTools',
	components: {
		'main-header': HeaderMenu,
		'back-to-top': BackToTop,
		Footer,
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
};
</script>

<style scoped>
#layout-container {
	padding-top: 0 !important;
	overflow: auto;
	height: 100vh;
}

#layout-container.is-loading {
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
