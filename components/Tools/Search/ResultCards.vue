<template>
	<v-card id="main-container" class="mt-2 pa-4 mr-8" elevation="0">
		<v-row justify="start" align="center">
			<span class="text-subtitle-2 ml-4 mt-1">Search in:</span>
			<SearchCategories :counts="counts" class="pr-3" />
		</v-row>
		<v-row v-if="loading.search" justify="center" class="mt-5">
			<v-col v-for="n in 9" :key="n" cols="11">
				<v-skeleton-loader v-bind="attrs" type="article"></v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row v-if="visibleTools.length > 0">
			<v-col
				v-for="(tool, i) in visibleTools"
				:key="i"
				justify="center"
				cols="12"
				sm="12"
				md="11"
			>
				<ToolCard
					:name="tool.label[0]"
					:subname="tool.name"
					:description="tool.description[0]"
					:type="tool.type"
					:topics="tool.topics"
					:operations="tool.operations"
					:sources_labels="tool.sources_labels"
					:publications="tool.publication"
					:license="tool.license"
					:webpage="tool.webpage[0]"
				/>
			</v-col>
		</v-row>
		<v-row v-else class="mt-6" justify="center">
			<v-alert
				class="pa-4 mt-6 grey--text text-body-2"
				elevation="0"
				dense
				text
				type="info"
				color="grey"
			>
				No tools found.
			</v-alert>
		</v-row>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import ToolCard from '~/components/Tools/Search/Card/ToolCard.vue';
import SearchCategories from '~/components/Tools/Search/SearchCategories.vue';

export default {
	name: 'ResultCards',
	components: {
		ToolCard,
		SearchCategories,
	},
	data() {
		return {
			searchingIn: [0, 1, 2, 3, 4, 5],
		};
	},
	computed: {
		...mapGetters('tool', {
			displayCards: 'toolsDisplayCards',
			counts: 'counts',
			visibleTools: 'tools',
			loading: 'loading',
		}),
	},
};
</script>
