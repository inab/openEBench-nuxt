<template>
	<v-container
		id="search-container"
		justify="start"
		class="mr-0 pr-0 pt-0"
		fluid
	>
		<v-row class="d-flex align-center justify-start mt-0 pt-0 pb-0">
			<breadcrumbs-bar
				v-if="breadcrumbs.length > 0"
				:items="breadcrumbs"
				dark
				class-disabled="{ white--text }"
				class-active="{ white--text text-decoration-underline }"
				class="mt-1"
			/>
		</v-row>
		<v-row justify="center" class="mt-0 pt-0">
			<v-col cols="10" class="text-center mt-0 mb-0 pb-0 pt-0">
				<h5 class="text-subtitle-1 mt-0">Explore Tools in OpenEBench</h5>
			</v-col>
			<v-col cols="5" class="d-flex align-center mt-0 pt-0">
				<v-text-field v-model="value" solo dense hide-details class="mt-3 mr-3">
					<template #prepend>
						<v-icon color="white"> mdi-magnify </v-icon>
					</template>
				</v-text-field>

				<v-btn elevation="2" color="#021A54" dark class="mt-3 mr-2">
					Search
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';

export default {
	name: 'SearchBar',
	components: {
		BreadcrumbsBar,
	},
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
					disabled: false,
					exact: true,
					to: '/tool',
				},
				{
					text: 'Search',
					disabled: true,
				},
			],
			value: '',
			show: false,
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
#search-container {
	background-color: #0b579f !important;
	color: white;
	top: 0;
	height: 110px;
}

.v-input >>> v-input__control {
	margin-top: 4px !important;
}
</style>
