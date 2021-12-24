<template>
	<v-app>
		<main-header />
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
		<v-footer :absolute="!fixed" app>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
import HeaderMenu from '~/components/Header/HeaderMenu.vue';

export default {
	name: 'DefaultLayout',
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
