<template>
	<v-app id="main-container">
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<Nuxt />
			<v-btn
				id="to-top"
				class="mx-2"
				fab
				dark
				small
				color="primary"
				@click="scrollToTop"
			>
				<v-icon dark> mdi-arrow-up </v-icon>
			</v-btn>
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

export default {
	name: 'SearchTools',
	components: {
		'main-header': HeaderMenu,
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
	mounted() {
		// Detect when scrolled to bottom.
		const listElm = document.querySelector('#main-container');
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
			await this.$store.dispatch('tool/updateLoadingLoadMore', true);
			this.page = this.page + 1;
			await this.$store.dispatch('tool/loadMoreTools', this.page);
			await this.$store.dispatch('tool/updateLoadingLoadMore', false);
		},
		scrollToTop() {
			console.log('Scrolling to top');
			document.getElementById('main-container').scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		},
	},
};
</script>

<style scoped>
#main-container {
	padding-top: 0 !important;
	overflow: auto;
	height: 250vh;
}

#to-top {
	position: fixed;
	bottom: 100px;
	right: 20px;
}
</style>
