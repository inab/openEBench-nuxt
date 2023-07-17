<template>
	<v-container fluid class="pa-0 ma-0">
		<breadcrumbs-bar
			v-if="breadcrumbs.length > 0"
			:items="breadcrumbs"
			dark
			class-disabled="{ white--text }"
			class-active="{ white--text text-decoration-underline }"
		/>
		<MainCard />
		<v-row>
			<v-col justify="center" cols="7" class="mx-auto">
				<SearchCarousel class="mt-2" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';
import MainCard from '~/components/Tools/Search/MainCard.vue';
import SearchCarousel from '~/components/Tools/Search/SearchCarousel.vue';

export default {
	name: 'ToolsMonitoringPage',
	components: {
		BreadcrumbsBar,
		MainCard,
		SearchCarousel,
	},
	layout: 'mainWOBreadcrumbs',
	data() {
		return {
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Tools',
					disabled: true,
				},
			],
		};
	},
	watch: {
		$route(newRoute, oldRoute) {
			if (newRoute.path !== oldRoute.path) this.breadcrumbs = [];
		},
	},
};
</script>
<style scoped>
.v-breadcrumbs {
	background-color: #0b579f !important;
	color: white !important;
}

.v-breadcrumbs >>> v-breadcrumbs__item {
	color: white !important;
}
</style>
