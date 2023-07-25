<template>
	<v-row justify="start" class="ml-5">
		<v-col cols="12">
			<v-expansion-panels v-model="expanded" accordion multiple flat>
				<ViewSelector />
				<SourcesFilter />
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
import TopicsFilter from '~/components/Tools/Search/Filters/TopicsFilter.vue';
import ViewSelector from '~/components/Tools/Search/Filters/ViewSelector.vue';
import OperationsFilter from '~/components/Tools/Search/Filters/OperationsFilter.vue';
import InputDataFormatFilter from '~/components/Tools/Search/Filters/InputDataFormatFilter.vue';
import OutputDataFormatFilter from '~/components/Tools/Search/Filters/OutputDataFormatFilter.vue';
import LicenseFilter from '~/components/Tools/Search/Filters/LicenseFilter.vue';
import CollectionFilter from '~/components/Tools/Search/Filters/CollectionFilter.vue';

export default {
	name: 'CardsFilter',
	components: {
		SourcesFilter,
		TopicsFilter,
		ViewSelector,
		OperationsFilter,
		InputDataFormatFilter,
		OutputDataFormatFilter,
		LicenseFilter,
		CollectionFilter,
	},
	data() {
		return {
			expanded: [0],
		};
	},
	created() {
		this.$store.dispatch('tool/getEDAMTerms');
	},
};
</script>
