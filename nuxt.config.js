import colors from 'vuetify/es5/util/colors';

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - openEBench-nuxt',
		title: 'openEBench-nuxt',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/main'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/vue-fragment-config',
		'~/plugins/vue-observe-visibility',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
		'@nuxtjs/pwa',
		'@nuxtjs/dotenv',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/',
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		optionsPath: './config/vuetify.options.js',
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	publicRuntimeConfig: {
		OEB_LEGACY_ANGULAR_URI:
			process.env.OEB_LEGACY_ANGULAR_URI || 'https://dev2-openebench.bsc.es/',
		VRE_URI: process.env.VRE_URI || 'https://dev-openebench.bsc.es/vre/home/',
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
