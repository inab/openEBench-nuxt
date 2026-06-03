<template>
	<v-card id="main-container" class="mt-2 pa-4 mr-12" elevation="0">
		<v-row v-if="loading.search" justify="center" class="mt-5">
			<v-col v-for="n in 9" :key="n" cols="11">
				<v-skeleton-loader type="article"></v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row v-else>
			<div v-if="visibleTools.length > 0" class="result-cards__list">
				<v-col
					v-for="(tool, i) in visibleTools"
					:key="i"
					justify="center"
					cols="11"
					sm="11"
					md="11"
				>
					<ToolCard
						:name="tool.label"
						:subname="tool.name"
						:description="tool.description"
						:documentation="tool.documentation"
						:type="tool.type"
						:topics="tool.topics"
						:operations="tool.operations"
						:sources-labels="tool.sourcesLabels"
						:publications="tool.publications"
						:license="tool.license"
						:webpage="tool.webpage"
						:findability="tool.findability"
						:accessibility="tool.accessibility"
						:interoperability="tool.interoperability"
						:reusability="tool.reusability"
						:order="i"
					/>
				</v-col>
			</div>
			<v-col v-else cols="12" class="d-flex justify-center">
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
			</v-col>
			<v-col
				v-if="visibleTools.length > 0"
				cols="11"
				md="11"
				class="result-cards__summary pt-0 pb-0 text-caption text--grey"
			>
				<div>
					<span v-if="!searchedTerm">
						Showing {{ visibleTools.length.toLocaleString() }} of
						{{ totalToolsGlobal.toLocaleString() }} total tools
					</span>
					<span v-else>
						Showing {{ visibleTools.length.toLocaleString() }} of
						{{ totalTools.toLocaleString() }} results for "<b>{{
							searchedTerm
						}}</b
						>"
					</span>
				</div>
			</v-col>
			<v-col cols="11" class="pt-0 d-flex justify-center">
				<LoadMoreTools />
			</v-col>
		</v-row>
		<v-row class="mt-6" justify="center"> </v-row>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import ToolCard from '~/components/Tools/Search/Card/ToolCard.vue';
import LoadMoreTools from '~/components/Tools/Search/LoadMoreTools.vue';

export default {
	name: 'ResultCards',
	components: {
		ToolCard,
		LoadMoreTools,
	},
	computed: {
		...mapGetters('tool', {
			displayCards: 'toolsDisplayCards',
			visibleTools: 'tools',
			loading: 'loading',
			totalTools: 'totalTools',
			totalToolsGlobal: 'totalToolsGlobal',
			searchedTerm: 'searchedTerm',
		}),
	},
};
</script>
<style scoped>
.result-cards__list {
	width: 100%;
}

.result-cards__summary {
	margin-top: -4px;
}
</style>
