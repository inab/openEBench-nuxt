<template>
	<v-app id="layout-container">
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<Nuxt />

			<Footer class="mt-16" />
		</v-main>
		<v-footer class="justify-center" app style="z-index: 9999">
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
		<v-btn
			id="to-top"
			class="mx-2"
			fab
			dark
			small
			color="#f48f43"
			@click="scrollToTop"
		>
			<v-icon dark> mdi-arrow-up </v-icon>
		</v-btn>
	</v-app>
</template>

<script>
import HeaderMenu from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter';

export default {
	name: 'EntryTool',
	components: {
		'main-header': HeaderMenu,
		Footer,
	},
	data() {
		return {};
	},
	head() {
		return {
			title:
				'OpenEBench - The ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics',
		};
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
		scrollToTop() {
			document.getElementById('layout-container').scrollTo({
				top: 0,
				behavior: 'smooth',
			});
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

#to-top {
	position: fixed;
	bottom: 100px;
	right: 60px;
}
</style>
