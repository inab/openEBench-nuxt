<template>
	<v-card id="main-container" class="mt-2 pa-4" elevation="0">
		<v-row justify="start" align="center">
			<span class="text-subtitle-2 ml-4 mt-1">Search in:</span>
			<SearchCategories :counts="counts" class="pr-3" />
		</v-row>
		<v-row v-if="displayCards">
			<v-col
				v-for="(c, i) in visibleTools"
				:key="i"
				justify="center"
				cols="12"
				sm="12"
				md="4"
			>
				<ToolCard />
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col
				v-for="(c, i) in visibleTools"
				:key="i"
				justify="center"
				cols="12"
				sm="12"
				md="11"
			>
				<ToolCard />
			</v-col>
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
			visibleTools: 'visibleTools',
		}),
	},
};
</script>

<style scoped>
#main-container {
	padding-top: 0 !important;
}
</style>
