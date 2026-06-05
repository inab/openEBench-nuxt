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
				v-if="activeFilterChips.length > 0"
				class="ml-4 mb-2 mt-1 d-flex align-center flex-wrap"
			>
				<div
					class="filters-label text-body-2 grey--text text--darken-1 mr-2 ml-2"
				>
					Filters selected:
				</div>

				<div class="d-flex align-center flex-wrap">
					<v-chip
						v-for="chip in activeFilterChips"
						:key="chip.key"
						small
						class="mr-1"
						color="#EAF1F7"
					>
						<span class="primary--text font-weight-medium">
							{{ chip.label }}
						</span>
					</v-chip>
				</div>
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
		activeFilterChips() {
			const chips = [];
			const {
				source,
				type,
				topics,
				operations,
				license,
				tags,
				inputFormat,
				outputFormat,
			} = this.filters;

			source.forEach((v) => chips.push({ key: `source-${v}`, label: v }));
			type.forEach((v) => chips.push({ key: `type-${v}`, label: v }));
			topics.forEach((v) => chips.push({ key: `topic-${v}`, label: v }));
			operations.forEach((v) => chips.push({ key: `op-${v}`, label: v }));
			license.forEach((v) => chips.push({ key: `license-${v}`, label: v }));
			tags.forEach((v) => chips.push({ key: `tag-${v}`, label: v }));
			inputFormat.forEach((v) => chips.push({ key: `in-${v}`, label: v }));
			outputFormat.forEach((v) => chips.push({ key: `out-${v}`, label: v }));

			return chips;
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
			this.$store.dispatch('tool/restoreFilters');
			this.$store.dispatch('tool/initialSearch', this.$route.query.q);
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
