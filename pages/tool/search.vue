<template>
	<v-container fluid class="pa-0">
		<SearchBar />
		<v-container :fluid="$vuetify.breakpoint.width < 1550">
			<v-row justify="center">
				<v-col cols="4">
					<CardsFilter />
				</v-col>
				<v-col cols="8">
					<ResultCards />
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>
<script>
import SearchBar from '~/components/Tools/Search/SearchBar.vue';
import CardsFilter from '~/components/Tools/Search/CardsFilter.vue';
import ResultCards from '~/components/Tools/Search/ResultCards.vue';

export default {
	name: 'SearchResultPage',
	components: {
		SearchBar,
		CardsFilter,
		ResultCards,
	},
	layout: 'plain',
};
</script>

<style scoped>
#search-container {
	background-color: #0b579f !important;
	color: white;
	top: 0;
	left: 0;
	right: 0;
	height: 150px;
}

.v-input >>> v-input__control {
	margin-top: 4px !important;
}
</style>
