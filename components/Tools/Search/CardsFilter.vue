<template>
	<v-row justify="start" class="ml-5 mt-2">
		<v-col cols="12">
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

				<SourcesFilter />
				<TypeFilter />
				<TopicsFilter />
				<OperationsFilter />
				<LicenseFilter />
				<InputDataFormatFilter />
				<OutputDataFormatFilter />
				<CollectionFilter />
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
		filterRestore() {
			this.$store.dispatch('tool/restoreFilters');
			this.$store.dispatch('tool/initialSearch', this.$route.query.q);
		},
	},
};
</script>
