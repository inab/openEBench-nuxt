<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">COLLECTION</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-autocomplete
				v-model="collections"
				:items="biotoolsCollections"
				multiple
				outlined
				hint="Filter tools belonging to at least on of the selected collections."
				persistent-hint
				color="primary lighten-1"
				label="Select"
				item-text="value"
				item-value="value"
				class="text-body-2 ml-2"
			>
				<template #selection="data">
					<v-chip
						v-bind="data.attrs"
						:input-value="data.selected"
						close
						label
						color="#D2E0ED"
						text-color="primary"
						@click="data.select"
						@click:close="remove(data.item)"
					>
						{{ data.item }}
					</v-chip>
				</template>
				<template #item="data">
					<template>
						<v-list-item-content
							class="text-body-2"
							v-text="data.item"
						></v-list-item-content>
					</template>
				</template>
			</v-autocomplete>
		</v-expansion-panel-content>
		<v-divider class="mt-0 mb-0"></v-divider>
	</v-expansion-panel>
</template>
<script>
export default {
	name: 'CollectionFilter',
	data() {
		return {
			collections: [],
			biotoolsCollections: ['VEIS', '3DBioinfo', 'ImpactData', 'ELIXIR-ES'],
		};
	},
	methods: {
		remove(item) {
			this.collections.splice(this.collections.indexOf(item), 1);
		},
	},
};
</script>
