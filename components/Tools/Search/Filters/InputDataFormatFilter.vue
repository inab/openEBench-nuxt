<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">INPUT DATA</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-autocomplete
				v-model="input_data_formats"
				:items="EDAMFormats"
				multiple
				outlined
				hint="Filter tools annotated with at least on of the selected input data formats."
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
import { mapGetters } from 'vuex';

export default {
	name: 'InputDataFormatFilter',
	data() {
		return {
			input_data_formats: [],
		};
	},
	computed: {
		...mapGetters({
			EDAMFormats: 'tool/EDAMFormats',
		}),
	},
	watch: {
		topics: function (val) {
			// 🚧 Write following functions in store/tool.js
			this.$store.dispatch('tool/updateInputDataFilter', val);
			this.$store.dispatch('tool/updateVisibleTools');
		},
	},
	methods: {
		remove(item) {
			this.input_data_formats.splice(this.input_data_formats.indexOf(item), 1);
		},
	},
};
</script>
