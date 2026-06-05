<template>
	<v-row justify="start" class="ml-5 mt-3">
		<v-col cols="12">
			<v-divider class="mt-4 mb-4"></v-divider>
			<v-btn
				small
				color="grey"
				elevation="0"
				text
				class="ml-2 mb-2"
				@click="filterRestore()"
			>
				<v-icon small class="mr-1">mdi-restore</v-icon>
				Reset filters
			</v-btn>
			<!-- Active filters display -->
			<div
				v-if="activeFilterGroups.length > 0"
				class="ml-4 mb-2 mt-1 d-flex align-center flex-wrap"
			>
				<div
					class="filters-label text-body-2 grey--text text--darken-1 mr-2 ml-2"
				>
					Filter applied:
				</div>

				<template v-for="(group, gIndex) in activeFilterGroups">
					<!-- AND between different categories -->
					<span
						v-if="gIndex > 0"
						:key="`and-${group.category}`"
						class="and-connector primary--text mx-2"
					>
						AND
					</span>

					<span
						:key="group.category"
						class="d-inline-flex align-center flex-wrap my-1"
					>
						<span v-if="group.chips.length > 1" class="grey--text mr-1">(</span>

						<template v-for="(chip, cIndex) in group.chips">
							<!-- or between chips of the same category -->
							<span
								v-if="cIndex > 0"
								:key="`${chip.key}-or`"
								class="or-connector grey--text text--darken-1 mx-1"
							>
								OR
							</span>
							<v-chip :key="chip.key" small color="#EAF1F7">
								<span class="primary--text font-weight-medium">
									{{ chip.label }}
								</span>
							</v-chip>
						</template>

						<span v-if="group.chips.length > 1" class="grey--text ml-1">)</span>
					</span>
				</template>
			</div>
			<v-divider class="mt-3 mb-0"></v-divider>
			<v-expansion-panels v-model="expanded" accordion multiple flat>
				<!--ViewSelector /-->

				<SourcesFilter @has-active-filters="onFilterActive(0, $event)" />
				<TypeFilter @has-active-filters="onFilterActive(1, $event)" />
				<TopicsFilter @has-active-filters="onFilterActive(2, $event)" />
				<OperationsFilter @has-active-filters="onFilterActive(3, $event)" />
				<LicenseFilter @has-active-filters="onFilterActive(4, $event)" />
				<InputDataFormatFilter
					@has-active-filters="onFilterActive(5, $event)"
				/>
				<OutputDataFormatFilter
					@has-active-filters="onFilterActive(6, $event)"
				/>
				<CollectionFilter @has-active-filters="onFilterActive(7, $event)" />
			</v-expansion-panels>
		</v-col>
	</v-row>
</template>
<script>
import { mapState } from 'vuex';
import SourcesFilter from '~/components/Tools/Search/Filters/SourcesFilter.vue';
import TypeFilter from '~/components/Tools/Search/Filters/TypeFilter.vue';
import TopicsFilter from '~/components/Tools/Search/Filters/TopicsFilter.vue';
import OperationsFilter from '~/components/Tools/Search/Filters/OperationsFilter.vue';
import InputDataFormatFilter from '~/components/Tools/Search/Filters/InputDataFormatFilter.vue';
import OutputDataFormatFilter from '~/components/Tools/Search/Filters/OutputDataFormatFilter.vue';
import LicenseFilter from '~/components/Tools/Search/Filters/LicenseFilter.vue';
import CollectionFilter from '~/components/Tools/Search/Filters/CollectionFilter.vue';

export default {
	name: 'CardsFilter',
	components: {
		SourcesFilter,
		TypeFilter,
		TopicsFilter,
		OperationsFilter,
		InputDataFormatFilter,
		OutputDataFormatFilter,
		LicenseFilter,
		CollectionFilter,
	},
	data() {
		return {
			expanded: [],
		};
	},
	computed: {
		...mapState({
			filters: (state) => state.tool.filters,
		}),
		activeFilterGroups() {
			const f = this.filters;
			const order = [
				'source',
				'type',
				'topics',
				'operations',
				'license',
				'tags',
				'inputFormat',
				'outputFormat',
			];
			return order
				.filter((category) => f[category].length > 0)
				.map((category) => ({
					category,
					chips: f[category].map((v) => ({
						key: `${category}-${v}`,
						label: v,
					})),
				}));
		},
	},
	created() {
		this.$store.dispatch('tool/getEDAMTerms');
	},
	methods: {
		onFilterActive(index, isActive) {
			if (isActive && !this.expanded.includes(index)) {
				this.expanded.push(index);
			} else if (!isActive) {
				this.expanded = this.expanded.filter((i) => i !== index);
			}
		},
		filterRestore() {
			if (this.$route.path === '/tool/search') {
				// On the search page the URL is the source of truth: strip the filter
				// params and let the page's query watcher reset state + re-search.
				const { q, searchIn } = this.$route.query;
				const query = { page: 0 };
				if (q) query.q = q;
				if (searchIn) query.searchIn = searchIn;
				this.$router.replace({ path: '/tool/search', query }).catch(() => {});
			} else {
				// Landing page (no filter params in the URL): reset state directly.
				this.$store.dispatch('tool/restoreFilters');
				this.$store.dispatch('tool/initialSearch', this.$route.query.q);
			}
		},
	},
};
</script>
<style scoped>
.text-caption {
	display: flex;
	align-items: center;
}
</style>
