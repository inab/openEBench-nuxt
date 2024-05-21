<template>
	<v-select
		v-model="selectedType"
		:items="typeItems"
		dense
		class="text-body mt-6"
		@change="changeValue"
	>
		<template #selection="{ item }">
			{{ item.toUpperCase() }}
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
	props: ['initialSelectedType'],
	data() {
		return {
			selectedType: this.initialSelectedType,
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
	watch: {
		// Optional: React to future changes in prop value
		initialSelectedType(newValue) {
			this.selectedType = newValue;
		},
	},
	methods: {
		changeValue() {
			const payload = {
				field: this.field,
				value: this.select,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeSelectorEntry',
				payload
			);
		},
	},
};
</script>
