<template>
	<v-container fluid class="pa-0">
		<MainCard :breadcrumbs="breadcrumbs" />
		<v-container fluid class="px-12 px-xl-16">
			<v-row>
				<v-col cols="12" md="4" lg="3" xl="3">
					<CardsFilter />
				</v-col>
				<v-col cols="12" md="8" lg="9" xl="9">
					<v-row v-if="loading.initialSearch" justify="center" class="mt-5">
						<v-col cols="12">
							<v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
						</v-col>
						<v-col v-for="n in 9" :key="n" cols="12">
							<v-skeleton-loader
								v-bind="attrs"
								type="article"
							></v-skeleton-loader>
						</v-col>
					</v-row>
					<v-row v-else ref="scrollBox" class="mt-1">
						<v-col cols="12">
							<ResultCards />
						</v-col>
						<v-col cols="12" align="center">
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
import MainCard from '~/components/Tools/MainCard.vue';
import CardsFilter from '~/components/Tools/Search/CardsFilter.vue';
import ResultCards from '~/components/Tools/Search/ResultCards.vue';
import { SearchTools } from '~/mixins/SearchTools.js';

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
		q: {
			handler(newVal, _oldVal) {
				this.search(newVal);
			},
			immediate: true,
		},
	},
};
</script>
