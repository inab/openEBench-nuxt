<template>
	<div class="pa-0">
		<MainCard :breadcrumbs="breadcrumbs" />
		<div class="px-12 px-xl-16">
			<v-row>
				<v-col cols="12" md="4" lg="3" xl="3" style="position: relative">
					<div
						v-if="!isSearchActive"
						style="
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							z-index: 10;
							cursor: not-allowed;
						"
					/>
					<div :class="{ 'disabled-chip': !isSearchActive }">
						<CardsFilter />
					</div>
				</v-col>
				<v-col cols="12" md="8" lg="9" xl="9">
					<v-row v-if="loading.initialSearch" justify="center" class="mt-5">
						<v-col v-for="n in 9" :key="n" cols="12">
							<v-skeleton-loader v-bind="attrs" type="article" />
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
							/>
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

export default {
	name: 'ToolsLandingPage',
	components: { MainCard, CardsFilter, ResultCards },
	mixins: [SearchTools],
	layout: 'SearchTools',
	data() {
		return {
			breadcrumbs: [
				{ text: 'Home', disabled: false, exact: true, to: '/' },
				{ text: 'Tools', disabled: true },
			],
			attrs: { class: 'mb-6', boilerplate: true, elevation: 2 },
		};
	},
	computed: {
		...mapGetters({
			loading: 'tool/loading',
			searchedTerm: 'tool/searchedTerm',
		}),
		isSearchActive() {
			return this.searchedTerm && this.searchedTerm.length > 0;
		},
	},
	async mounted() {
		await this.loadLanding();
		this.$store.dispatch('tool/fetchTotalTools');
	},
};
</script>
