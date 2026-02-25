<template>
	<v-select
		v-model="selectedType"
		:items="typeItems"
		multiple
		dense
		class="text-body mt-6"
		@change="changeValue"
	>
		<template #selection="{ item }">
			<v-chip small color="gray" text-color="black" class="mr-1">
				{{ item.toUpperCase() }}
			</v-chip>
		</template>
		<template #item="{ item }">
			<v-list-item-content>
				<v-list-item-title class="text-caption">
					{{ item.toUpperCase() }}
				</v-list-item-title>
			</v-list-item-content>
		</template>
	</v-select>
</template>
<script>
export default {
	name: 'SelectorType',
	props: {
		initialSelectedType: {
			type: [Array, String],
			default: () => [],
		},
		field: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			selectedType: Array.isArray(this.initialSelectedType)
				? this.initialSelectedType
				: this.initialSelectedType
				? [this.initialSelectedType]
				: [],
			typeItems: [
				'cmd',
				'web',
				'api',
				'lib',
				'workflow',
				'soap',
				'db',
				'suite',
			],
		};
	},

	methods: {
		changeValue() {
			const payload = {
				field: this.field,
				value: this.selectedType,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateSelectorEntry',
				payload
			);
		},
	},
};
</script>
