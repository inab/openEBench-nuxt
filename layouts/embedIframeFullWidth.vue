<template>
	<v-app>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<Nuxt />
		</v-main>
		<v-footer class="justify-center" app>
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
	</v-app>
</template>

<script>
import HeaderMenu from '~/components/Header/HeaderMenu.vue';

export default {
	name: 'EmbedIframeFullWidth',
	components: {
		'main-header': HeaderMenu,
	},
	head() {
		return {
			title:
				'OpenEBench - The ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics',
		};
	},
};
</script>
