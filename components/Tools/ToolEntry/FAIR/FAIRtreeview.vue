<template>
	<v-treeview
		:active="active"
		:items="indicators"
		:open="open"
		color="warning"
		transition
		multiple-active
		all-active
		dense
	>
		<template #label="{ item }">
			<span class="text-body-2 font-weight-regular label-span">{{
				item.name
			}}</span>
		</template>
	</v-treeview>
</template>
<script>
export default {
	name: 'FAIRtreeview',
	props: {
		active: {
			type: Array,
			required: true,
		},
		open: {
			type: Array,
			required: true,
		},
	},
	data: () => ({
		indicators: [
			{
				id: 'F',
				name: 'Findability',
				children: [
					{ id: 'F1', name: 'F1. Identity Uniqueness' },
					{ id: 'F2', name: 'F2. Existence of Metadata' },
					{ id: 'F3', name: 'F3. Searchability' },
				],
			},
			{
				id: 'A',
				name: 'Accessibility',
				children: [
					{ id: 'A1', name: 'A1. Existence of available working version' },
					{ id: 'A2', name: 'A2. Software history trackability' },
					{ id: 'A3', name: 'A3. Unrestricted access' },
				],
			},
			{
				id: 'I',
				name: 'Interoperability',
				children: [
					{
						id: 'I1',
						name: 'I1. Documentation on Input/output data types and formats',
					},
					{ id: 'I2', name: 'I2. Workflow compatibility' },
					{ id: 'I3', name: 'I3. Dependencies availability' },
				],
			},
			{
				id: 'R',
				name: 'Reusability',
				children: [
					{ id: 'R1', name: 'R1. Usage documentation' },
					{ id: 'R2', name: 'R2. License' },
					{ id: 'R3', name: 'R3. Contribution policy' },
					{ id: 'R4', name: 'R4. Provenance' },
				],
			},
		],
	}),
};
</script>
<style scoped>
.label-span {
	white-space: initial;
	font-size: 0.8rem !important;
}

.v-treeview {
	overflow: auto;
	height: 85vh;
}
</style>
