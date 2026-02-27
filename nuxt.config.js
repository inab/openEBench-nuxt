import path from 'path';
import colors from 'vuetify/es5/util/colors';

const routerBase =
	process.env.DEPLOY_ENV === 'GH_PAGES'
		? {
				router: {
					base: '/openEBench-nuxt/',
				},
		  }
		: {};

export default {
	// routerBase object for github pages deploy
	...routerBase,

	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	telemetry: false,

	server: {
		host: '0.0.0.0',
		timing: false,
	},

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
			{
				hid: 'description',
				name: 'description',
				content:
					'OpenEBench is the ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics for life sciences tools and workflows.',
			},
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/main'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/vue-fragment-config',
		'~/plugins/graphql',
		'~/plugins/observatory',
		'~/plugins/githubapp',
		'~/plugins/pluralize',
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
		'@nuxtjs/svg',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/robots',
		'@nuxtjs/auth-next',
	],

	auth: {
		strategies: {
			keycloak: {
				scheme: '~/plugins/keycloak.js',
				endpoints: {
					authorization: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
					userInfo: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
					token: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
					logout: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`,
					property: 'access_token',
					type: 'Bearer',
					name: 'Authorization',
					maxAge: 1800, // Can be dynamic ?
				},
				refreshToken: {
					property: 'refresh_token',
					maxAge: 60 * 60 * 24 * 30, // Can be dynamic ?
				},
				responseType: 'code',
				responseMode: 'fragment',
				grantType: 'authorization_code',
				clientId: process.env.KEYCLOAK_CLIENT_ID,
				scope: ['openid'],
				codeChallengeMethod: 'S256',
			},
		},
		redirect: {
			login: '/',
		},
	},

	robots: {
		UserAgent: '*',
		Allow: '/',
	},

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
		ENVIRONMENT: process.env.ENVIRONMENT || 'dev-openebench',
		OEB_LEGACY_ANGULAR_URI:
			process.env.OEB_LEGACY_ANGULAR_URI ||
			'https://legacy.dev-openebench.bsc.es/',
		VRE_URI: process.env.VRE_URI || 'https://dev-openebench.bsc.es/vre/home/',
		OBSERVATORY_URI:
			process.env.OBSERVATORY_URI || 'https://observatory.openebench.bsc.es',
		SCIENTIFIC_SERVICE_URL:
			process.env.SCIENTIFIC_SERVICE_URL ||
			'https://dev-openebench.bsc.es/api/scientific',
		BENCH_EVENT_API_URL:
			process.env.BENCH_EVENT_API_URL ||
			'https://dev-openebench.bsc.es/rest/bench_event_api',
		OBSERVATORY_API_URL:
			process.env.OBSERVATORY_API_URL ||
			'https://observatory.openebench.bsc.es/api',
		GITHUBAPP_API_URL:
			process.env.GITHUBAPP_API_URL ||
			'https://observatory.openebench.bsc.es/github-metadata-api',
		axios: {
			// See https://github.com/nuxt-community/axios-module#options
			baseURL:
				process.env.REST_API_URL ||
				'https://dev-openebench.bsc.es/monitor/rest/',
		},
		KEYCLOAK_HOST: process.env.KEYCLOAK_HOST || 'https://inb.bsc.es/auth',
		KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || 'openebench',
		KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'oeb-frontend',
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend(config) {
			config.module.rules.push({
				test: /\.md$/,
				loader: 'raw-loader',
			});
			config.module.rules.push({
				test: /\.json$/,
				loader: 'json-loader',
				include: [
					// Adjust this path to your project's structure
					path.resolve(__dirname, 'static/posters/poster_list'),
				],
			});
			config.module.rules.push({
				test: /\.ico$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			});
			config.module.rules.push({
				test: /\.pdf$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			});
		},
	},

	router: {
		extendRoutes(routes, resolve) {
			routes.push({
				name: 'dashboard',
				path: '/dashboard',
				component: resolve(__dirname, 'pages/index.vue'),
			});
			routes.push({
				name: 'scientific',
				path: '/scientific',
				component: resolve(__dirname, 'pages/benchmarking'),
			});
			routes.push({
				name: 'observatory',
				path: '/observatory',
				component: resolve(__dirname, 'pages/observatory/Trends.vue'),
			});
			routes.push({
				name: 'tools',
				path: '/tool',
				component: resolve(__dirname, 'pages/tool/index'),
			});
			routes.push({
				name: 'search-results',
				path: '/tool/search',
				component: resolve(__dirname, 'pages/tool/search'),
			});
			routes.push({
				name: 'tool-entry',
				path: '/tool/:name',
				component: resolve(__dirname, 'pages/tool/_id.vue'),
			});
			routes.push({
				name: 'post-github-app-install',
				path: '/post-github-app-install',
				component: resolve(
					__dirname,
					'pages/observatory/PostGitHubInstall.vue'
				),
			});
			routes.push({
				name: 'visualizations',
				path: '/visualizations/:domain/:visualization/:collection?',
				component: resolve(
					__dirname,
					'pages/observatory/visualizations/_domain/_visualization'
				),
			});
			routes.push({
				name: 'scientific-community',
				path: '/scientific/:community',
				component: resolve(__dirname, 'pages/benchmarking/_community'),
			});
			routes.push({
				name: 'scientific-community-challenge',
				path: '/scientific/:community/:id',
				component: resolve(__dirname, 'pages/benchmarking/_community/_id'),
			});
			routes.push({
				name: 'scientific-community-challenge-participants',
				path: '/scientific/:community/:id/participants',
				component: resolve(
					__dirname,
					'pages/benchmarking/_community/_id/participants'
				),
			});
			// routes.push({
			//	name: 'scientific-community-challenge-participants',
			//	path: '/benchmarking/:community/:id/participants',
			//	component: resolve(__dirname, 'pages/benchmarking/_community/_id/participants'),
			// });
			routes.push({
				name: 'search-results',
				path: '/tool/search',
				component: resolve(__dirname, 'pages/tool/search'),
			});
			routes.push({
				name: 'tool',
				path: '/tool',
				component: resolve(__dirname, 'pages/tool/index'),
			});
			routes.push({
				name: 'tool-entry',
				path: '/tool/:name/:type',
				component: resolve(__dirname, 'pages/tool/_id.vue'),
			});
		},
	},
};
