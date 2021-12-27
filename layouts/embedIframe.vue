<template>
	<v-app>
		<main-header />
		<v-main>
			<v-container class="v-container-custom">
				<Nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import HeaderMenu from '~/components/Header/HeaderMenu.vue';

export default {
	name: 'EmbedIframe',
	components: {
		'main-header': HeaderMenu,
	},
	data() {
		return {
			title: 'Vuetify.js',
		};
	},
};
</script>

<style lang="scss" scoped>
.v-container-custom {
	height: 100%;
}
</style>
