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
	created() {
		this.$store.dispatch('tool/getEDAMTerms');
	},
	methods: {
		onFilterActive(index, isActive) {
			// console.log(
			// 	'[CardsFilter] onFilterActive called, index:',
			// 	index,
			// 	'isActive:',
			// 	isActive
			// );
			if (isActive && !this.expanded.includes(index)) {
				this.expanded.push(index);
			} else if (!isActive) {
				this.expanded = this.expanded.filter((i) => i !== index);
			}
			// console.log('[CardsFilter] expanded is now:', this.expanded);
		},
		filterRestore() {
			this.$store.dispatch('tool/restoreFilters');
			this.$store.dispatch('tool/initialSearch', this.$route.query.q);
		},
	},
};
</script>
