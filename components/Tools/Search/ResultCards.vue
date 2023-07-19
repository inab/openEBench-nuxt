<template>
	<v-card id="main-container" class="mt-2 pa-4" elevation="0">
		<v-row justify="start" align="center">
			<span class="text-subtitle-2 ml-4 mt-1">Search in:</span>
			<v-chip-group
				v-model="searchingIn"
				column
				multiple
				class="ml-4"
				active-class="primary--text"
			>
				<v-chip filter outlined> Tool Name (1,345) </v-chip>
				<v-chip filter outlined> Tool Description (2,547) </v-chip>
				<v-chip filter outlined> Associated Topics (625) </v-chip>
				<v-chip filter outlined> Associated Operations (25) </v-chip>
				<v-chip filter outlined> Publication Title (16) </v-chip>
				<v-chip filter outlined> Publication Abstract (238) </v-chip>
			</v-chip-group>
		</v-row>
		<v-row v-if="displayCards">
			<v-col
				v-for="(c, i) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
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
				v-for="(c, i) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
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

export default {
	name: 'ResultCards',
	components: {
		ToolCard,
	},
	data() {
		return {
			searchingIn: [0, 1, 2, 3, 4, 5],
		};
	},
	computed: {
		...mapGetters({
			displayCards: 'tool/toolsDisplayCards',
		}),
	},
};
</script>

<style scoped>
#main-container {
	padding-top: 0 !important;
}
</style>
