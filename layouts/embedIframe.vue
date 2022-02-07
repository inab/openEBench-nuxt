<template>
	<v-app>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<v-container class="v-container-custom">
				<Nuxt />
			</v-container>
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
	name: 'EmbedIframe',
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

<style lang="scss" scoped>
.v-container-custom {
	height: 100%;
}
</style>
