<template>
	<v-row justify="start" class="ml-5">
		<v-col cols="12">
			<v-expansion-panels v-model="expanded" accordion multiple flat>
				<!-------------- VIEW ----------------->
				<v-expansion-panel>
					<v-expansion-panel-header>
						<h3 class="text-overline">View</h3>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-btn-toggle
							v-model="display"
							mandatory
							dense
							title
							group
							color="primary"
						>
							<v-btn @click="updateDisplay(false)">
								<v-icon small>mdi-view-list</v-icon>
								<span class="text-caption">List</span>
							</v-btn>
							<v-btn @click="updateDisplay(true)">
								<v-icon small>mdi-view-grid</v-icon>
								<span class="text-caption">Grid</span>
							</v-btn>
						</v-btn-toggle>
					</v-expansion-panel-content>
					<v-divider></v-divider>
				</v-expansion-panel>

				<!-------------- SOURCES ----------------->
				<v-expansion-panel>
					<v-expansion-panel-header>
						<h3 class="text-overline mt-1">Sources</h3>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-btn-toggle
							v-model="sources"
							group
							dense
							multiple
							tile
							color="primary"
							class="flex-wrap"
						>
							<v-btn
								v-for="(item, i) in source_items"
								:key="i"
								@click="updateSources"
							>
								<span class="text-caption">{{ item }}</span>
							</v-btn>
						</v-btn-toggle>
					</v-expansion-panel-content>
					<v-divider></v-divider>
				</v-expansion-panel>

				<!------------------ TOPICS ---------------->

				<v-expansion-panel>
					<v-expansion-panel-header>
						<h3 class="text-overline mt-1">TOPICS/DOMAINS</h3>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-text-field
							v-model="topic"
							placeholder="Eg. 'Sequencing'"
							dense
							hide-details
							solo
							class="text-body-2"
						>
							<template #append-outer>
								<v-btn
									color="primary"
									fab
									x-small
									elevation="1"
									@click="updateTopic"
								>
									<v-icon class="pa-0">mdi-plus</v-icon>
								</v-btn>
							</template>
						</v-text-field>
						<v-chip-group
							v-model="selected_topics"
							active-class="primary--text"
							column
							multiple
						>
							<v-chip
								v-for="tag in topics"
								:key="tag"
								label
								close
								@click:close="topics.splice(topics.indexOf(tag), 1)"
							>
								<span class="text-overline">{{ tag }}</span>
							</v-chip>
						</v-chip-group>
					</v-expansion-panel-content>
					<v-divider class="mt-0 mb-0"></v-divider>
				</v-expansion-panel>

				<!------------------ OPERATIONS ---------------->
				<v-expansion-panel>
					<v-expansion-panel-header>
						<h3 class="text-overline mt-1">OPERATIONS/FUNCTIONALITY</h3>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-text-field
							v-model="operation"
							placeholder="Eg. 'Multiple Sequence Alignment'"
							dense
							hide-details
							solo
							class="text-body-2"
							clearable
						>
							<template #append-outer>
								<v-btn
									color="primary"
									fab
									x-small
									elevation="1"
									@click="updateOperation"
								>
									<v-icon class="pa-0">mdi-plus</v-icon>
								</v-btn>
							</template>
						</v-text-field>
						<v-chip-group
							v-model="selected_operations"
							active-class="primary--text"
							column
							multiple
						>
							<v-chip
								v-for="tag in operations"
								:key="tag"
								label
								close
								@click:close="operations.splice(operations.indexOf(tag), 1)"
							>
								<span class="text-overline">{{ tag }}</span>
							</v-chip>
						</v-chip-group>
					</v-expansion-panel-content>
					<v-divider class="mt-0 mb-0"></v-divider>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-col>
	</v-row>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ResultsFilter',
	data() {
		return {
			expanded: [0, 1, 2, 3, 4],
			display: 0,
			sources: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			source_items: [
				'OpenEBench',
				'bio.tools',
				'bioconda',
				'bioconductor',
				'GalaxyEU',
				'Toolshed',
				'Github',
				'Sourceforge',
				'Bitbucket',
			],
			topic: '',
			topics: [],
			selected_topics: [],
			operation: '',
			operations: [],
			selected_operations: [],
		};
	},
	computed: {
		...mapGetters({
			displayCards: 'tool/toolsDisplayCards',
		}),
	},
	methods: {
		updateDisplay(value) {
			this.$store.dispatch('tool/updateToolsDisplayCards', value);
		},
		updateSources(value) {
			this.$store.dispatch('tool/updateToolsSources', value);
		},
		updateTopic() {
			this.$store.dispatch('tool/updateToolsTopics', this.topic);
			this.topics.push(this.topic);
			this.selected_topics.push(this.topics.indexOf(this.topic));
		},
		updateOperation() {
			this.$store.dispatch('tool/updateToolsOperations', this.operation);
			this.operations.push(this.operation);
			this.selected_operations.push(this.operations.indexOf(this.operation));
		},
	},
};
</script>
