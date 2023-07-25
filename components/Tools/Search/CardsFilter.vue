<template>
	<v-row justify="start" class="ml-5">
		<v-col cols="12">
			<v-divider class="mt-3 mb-0"></v-divider>
			<v-expansion-panels v-model="expanded" accordion multiple flat>
				<!--ViewSelector /-->

				<SourcesFilter />
				<TopicsFilter />
				<OperationsFilter />
				<LicenseFilter />
				<InputDataFormatFilter />
				<OutputDataFormatFilter />
				<CollectionFilter />
			</v-expansion-panels>
		</v-col>
		<v-col cols="12" class="d-flex align-end flex-column">
			<v-btn elevation="0" color="primary" class="mr-2" @click="filterTools">
				Filter
			</v-btn>
		</v-col>
	</v-row>
</template>
<script>
import SourcesFilter from '~/components/Tools/Search/Filters/SourcesFilter.vue';
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
		TopicsFilter,
		OperationsFilter,
		InputDataFormatFilter,
		OutputDataFormatFilter,
		LicenseFilter,
		CollectionFilter,
	},
	data() {
		return {
			expanded: [0, 1, 2, 3, 4, 5, 6, 7],
		};
	},
	created() {
		this.$store.dispatch('tool/getEDAMTerms');
	},
	methods: {
		filterTools() {
			// 🚧 TODO: build URL and send request to API
			// this.$store.dispatch('tool/filterTools');
		},
	},
};
</script>
