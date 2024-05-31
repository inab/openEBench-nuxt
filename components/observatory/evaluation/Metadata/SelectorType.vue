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
	props: ['initialSelectedType', 'field'],
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
