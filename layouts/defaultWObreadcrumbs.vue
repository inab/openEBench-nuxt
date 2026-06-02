<template>
	<v-app>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<Nuxt @emitBreadcrumbs="handleBreadcrumbs" />
		</v-main>
		<back-to-top />
		<Footer ref="Footer" class="mt-16" />

		<v-footer class="justify-center" app>
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
	</v-app>
</template>

<script>
import HeaderMenu from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter';
import BackToTop from '~/components/Molecules/BackToTop.vue';

export default {
	name: 'DefaultLayoutWOBreadcrumbs',
	components: {
		'main-header': HeaderMenu,
		Footer,
		'back-to-top': BackToTop,
	},
	head() {
		return {
			title:
				'OpenEBench - The ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics',
		};
	},
};
</script>
