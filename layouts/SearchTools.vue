<template>
	<v-app id="layout-container">
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
			page: 0,
		};
	},
	head() {
		return {
			title:
				'OpenEBench - The ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics',
		};
	},
	computed: {
		...mapGetters('tool', {
			loading: 'loading',
			visibleTools: 'tools',
			totalTools: 'totalTools',
		}),
	},
	mounted() {
		// Detect when scrolled to bottom.
		const listElm = document.querySelector('#layout-container');
		listElm.addEventListener('scroll', (_e) => {
			if (
				listElm.scrollTop + listElm.clientHeight >=
				listElm.scrollHeight - 150
			) {
				this.loadMore();
			}
		});
	},
	methods: {
		async loadMore() {
			if (!this.loading.search) {
				if (this.totalTools > this.visibleTools.length) {
					await this.$store.dispatch('tool/updateLoadingLoadMore', true);
					this.page = this.page + 1;
					await this.$store.dispatch('tool/loadMoreTools', this.page);
					await this.$store.dispatch('tool/updateLoadingLoadMore', false);
				}
			}
		},
	},
};
</script>

<style scoped>
#layout-container {
	padding-top: 0 !important;
	overflow: auto;
	height: 100vh;
}
</style>
