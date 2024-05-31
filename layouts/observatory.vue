<template>
	<v-app>
		<main-header :vre-href="$config.VRE_URI" />
		<v-main>
			<breadcrumbs-bar v-if="breadcrumbs.length > 0" :items="breadcrumbs" />
			<v-container fluid class="mt-3">
				<v-row justify="center">
					<v-navigation-drawer
						permanent
						floating
						v-if="$vuetify.breakpoint.lgAndUp"
						:expand-on-hover="$vuetify.breakpoint.lgAndDown"
						:width="$vuetify.breakpoint.lgAndDown ? 200 : 200"
					>
						<v-list nav dense>
							<v-list-item-group
								v-model="group"
								active-class="text--accent-4"
								color="primary"
							>
								<v-list-item
									v-for="(item, i) in subMenuEntriesObservatory"
									:key="i"
									link
									:to="item.to"
								>
									<v-list-item-icon class="mr-1">
										<v-icon>{{ item.icon }}</v-icon>
									</v-list-item-icon>
									<v-list-item-title class="ml-1">{{
										item.title
									}}</v-list-item-title>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-navigation-drawer>
					<v-col cols="12" sm="12" md="12" lg="10" xl="9">
						<Nuxt @emitBreadcrumbs="handleBreadcrumbs" />
					</v-col>
				</v-row>
			</v-container>

			<Footer class="mt-16" />
		</v-main>
		<v-footer class="justify-center" app>
			Made with <v-icon color="red">mdi-heart</v-icon>
			in Barcelona.
		</v-footer>
	</v-app>
</template>
<script>
import { mapGetters } from 'vuex';
import debounce from 'lodash/debounce';
import HeaderMenu from '~/components/Header/HeaderMenu.vue';
import Footer from '~/components/TheFooter';
import subMenuEntriesObservatory from '~/components/Header/subMenuEntriesObservatory.js';
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';

export default {
	name: 'Observatory',
	components: {
		'main-header': HeaderMenu,
		Footer,
		BreadcrumbsBar,
	},
	data() {
		return {
			mainMenuElevation: 0,
			subMenuEntriesObservatory,
			sections: [
				{
					label: 'Trends',
					path: '/observatory',
					icon: 'mdi-chart-line',
					hover: 'Trends',
				},
				{
					label: 'FAIRness',
					path: '/observatory/FAIRness',
					icon: 'mdi-bullseye',
					hover: 'FAIRness',
				},
				{
					label: 'Evaluate',
					path: '/observatory/Evaluation',
					icon: 'mdi-check-circle-outline',
					hover: 'Evaluate',
				},
				{
					label: 'Data',
					path: '/observatory/Data',
					icon: 'mdi-database',
					hover: 'Data',
				},
				{
					label: 'About',
					path: '/observatory/About',
					icon: 'mdi-lightbulb-outline',
					hover: 'About',
				},
			],
			bigDis: true,
			breadcrumbs: [],
		};
	},
	head() {
		return {
			title:
				'OpenEBench - The ELIXIR gateway to benchmarking communities, software monitoring, and quality metrics',
		};
	},
	watch: {
		$route(newRoute, oldRoute) {
			if (newRoute.path !== oldRoute.path) this.breadcrumbs = [];
		},
	},
	mounted() {
		this.handleResize(); // Initialize dimensions
		window.addEventListener('resize', this.debouncedResizeHandler);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.debouncedResizeHandler);
	},

	computed: {
		...mapGetters('observatory', {
			window: 'getWindow',
		}),
		vertical() {
			return this.$vuetify.breakpoint.lgAndUp;
		},
		tab() {
			return this.$store.getters['observatory/getActiveTab'];
		},
		columnNeeded() {
			console.log(!this.$vuetify.breakpoint.lgAndUp);
			return this.$vuetify.breakpoint.lgAndUp;
		},
		tabsStyle() {
			const style = {
				'max-width': this.window.width * 0.9 + 'px',
			};
			return style;
		},
	},
	methods: {
		handleResize() {
			this.$store.dispatch('observatory/changeWindowWidth', window.innerWidth);
		},
		debouncedResizeHandler: debounce(function () {
			this.handleResize();
		}, 200), // Debounce resizing to improve performance
		// Other methods...
		checkUniqueCollectionInRoute() {
			if (this.$route.query.uniqueCollection !== undefined) {
				console.log('We should change the unique collection');
				this.$store.dispatch(
					'observatory/changeUniqueCollection',
					this.$route.query.uniqueCollection
				);
			}
		},
		handleBreadcrumbs(value) {
			this.breadcrumbs = value;
		},
	},
};
</script>

<style>
#app {
	background-color: white;
	width: 100%;
}

html,
body,
.container {
	margin: auto;
}

h1 {
	font-family: Roboto, sans-serif;
	font-size: 2.2rem !important;
	line-height: 4.5rem;
	font-weight: 400;
	color: #0b579f;
}

h2 {
	font-family: Roboto, sans-serif;
	font-size: 1.7rem !important;
	line-height: 4.5rem;
	font-weight: 500;
}

h6 {
	font-family: Roboto, sans-serif;
	font-size: 1.3rem !important;
	line-height: 2.5rem;
}

p {
	font-family: Roboto, sans-serif;
	font-size: 0.9em !important;
	font-weight: 400;
}

.text-subtitle {
	font-family: Roboto, sans-serif;
	font-weight: 300;
	font-size: 1.4em;
}

.alert-text {
	font-size: 0.9em;
	font-weight: 400;
	word-break: initial;
}

.alert-text a {
	text-decoration-line: none;
}

.highlight {
	color: #001752f8;
	font-weight: 500;
}
</style>
