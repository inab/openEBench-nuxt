<template>
	<v-row id="search-container" class="mr-0 pr-0 pt-0" justify="end">
		<v-col cols="7" class="d-flex align-start" justify="start">
			<breadcrumbs-bar
				v-if="breadcrumbs.length > 0"
				:items="breadcrumbs"
				dark
				class-disabled="{ white--text }"
				class-active="{ white--text text-decoration-underline }"
				class="mt-0 pt-3 align-self-start"
			/>
		</v-col>

		<v-col cols="5" class="d-flex align-center text-center mt-0 pt-0">
			<v-text-field
				v-model="value"
				solo
				dense
				flat
				hide-details
				class="mt-1 text-body-2"
			>
			</v-text-field>
			<v-btn
				elevation="0"
				color="#F48633"
				dark
				class="mt-1 mr-2 ml-2"
				@click="triggerSearch(value)"
			>
				Search
			</v-btn>
		</v-col>
	</v-row>
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
			value: '',
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
		};
	},
};
</script>
<style scoped>
#search-container {
	background-color: #396fba !important;
	color: white;
	top: 0;
	left: 0;
	right: 0;
	height: 70px;
}

.v-input >>> v-input__control {
	margin-top: 4px !important;
	height: 20px !important;
}
</style>
