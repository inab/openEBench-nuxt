<template>
	<div class="pa-0">
		<MainCard :breadcrumbs="breadcrumbs" />
		<div class="px-12 px-xl-16">
			<v-row>
				<v-col cols="12" md="4" lg="3" xl="3">
					<CardsFilter />
				</v-col>
				<v-col cols="12" md="8" lg="9" xl="9">
					<v-row ref="scrollBox" class="mt-1">
						<v-col cols="12">
							<ResultCards />
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import MainCard from '~/components/Tools/MainCard.vue';
import CardsFilter from '~/components/Tools/Search/CardsFilter.vue';
import ResultCards from '~/components/Tools/Search/ResultCards.vue';
import { SearchTools } from '~/mixins/SearchTools.js';
import { queryToFilters } from '~/utils/toolFilters';

export default {
	name: 'SearchResultPage',
	components: { MainCard, CardsFilter, ResultCards },
	mixins: [SearchTools],
	layout: 'SearchTools',
	data() {
		return {
			attrs: { class: 'mb-6', boilerplate: true, elevation: 2 },
		};
	},
	computed: {
		q() {
			return this.$route.query.q;
		},
		// Dynamic breadcrumbs: Home > Tools > <search term>
		breadcrumbs() {
			return [
				{ text: 'Home', disabled: false, exact: true, to: '/' },
				{ text: 'Tools', disabled: false, exact: true, to: '/tool' },
				// Search term is the last crumb — clickable to re-run same search
				{ text: `Search: ${this.q || ''}`, disabled: true },
			];
		},
		...mapGetters({
			loading: 'tool/loading',
		}),
	},
	watch: {
		// The URL is the source of truth: any change to the query (search term or
		// filters) re-hydrates the filter state and re-runs the search. This is the
		// only place a search is triggered, so applying a filter never double-fetches.
		'$route.query': {
			handler(newQuery, oldQuery) {
				// Seed the facet list on first load / when the search term changes;
				// a plain filter toggle only needs to refine the existing facets.
				const needsSeed = !oldQuery || newQuery.q !== oldQuery.q;
				this.applyFromUrl(needsSeed);
			},
			immediate: true,
			deep: true,
		},
	},
	methods: {
		async applyFromUrl(needsSeed) {
			const q = this.$route.query.q || '';

			// The filter sidebar options come from `stats`, which only gets its full
			// (unfiltered) option list from an initialSearch. Without this seed, a
			// fresh tab on a filtered URL would show an empty filter sidebar because
			// the filtered response only contains the matching options.
			if (needsSeed) {
				this.$store.dispatch('tool/restoreFilters');
				await this.$store.dispatch('tool/initialSearch', q);
			}

			// Apply the filters from the URL, then run the (filtered) search.
			const filters = queryToFilters(this.$route.query);
			Object.entries(filters).forEach(([property, values]) => {
				this.$store.dispatch('tool/updateFilters', { property, values });
			});
			this.search(q);
		},
	},
};
</script>
