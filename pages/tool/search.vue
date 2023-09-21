<template>
	<v-container fluid class="pa-0">
		<SearchBar />
		<v-container :fluid="$vuetify.breakpoint.width < 1550">
			<v-row justify="center">
				<v-col cols="4">
					<CardsFilter />
				</v-col>
				<v-col cols="8">
					<v-row v-if="loading.initialSearch" justify="center" class="mt-5">
						<v-col cols="11">
							<v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
						</v-col>
						<v-col v-for="n in 9" :key="n" cols="11">
							<v-skeleton-loader
								v-bind="attrs"
								type="article"
							></v-skeleton-loader>
						</v-col>
					</v-row>
					<v-row v-else class="mt-1">
						<ResultCards />

						<v-col cols="11" align="center">
							<v-progress-circular
								v-show="loading.loadMore"
								indeterminate
								color="primary"
								transition="scroll-y-transition"
							></v-progress-circular>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import SearchBar from '~/components/Tools/Search/SearchBar.vue';
import CardsFilter from '~/components/Tools/Search/CardsFilter.vue';
import ResultCards from '~/components/Tools/Search/ResultCards.vue';
import { SearchTools } from '~/mixins/SearchTools.js';

export default {
	name: 'SearchResultPage',
	components: {
		SearchBar,
		CardsFilter,
		ResultCards,
	},
	mixins: [SearchTools],
	layout: 'SearchTools',
	data() {
		return {
			// q value from url
			attrs: {
				class: 'mb-6',
				boilerplate: true,
				elevation: 2,
			},
		};
	},
	computed: {
		// get q value from url
		q() {
			return this.$route.query.q;
		},
		...mapGetters({
			loading: 'tool/loading',
		}),
	},
	watch: {
		// if new q value is different from old q value, search
		q: {
			handler(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.search(newVal);
				}
			},
			immediate: true,
		},
	},
	methods: {
		// search for tools
		search(q) {
			this.$store.dispatch('tool/updateSearchedTerm', q);
			this.$store.dispatch('tool/initialSearch', q);
		},
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
	height: 150px;
}

.v-input >>> v-input__control {
	margin-top: 4px !important;
}
</style>
