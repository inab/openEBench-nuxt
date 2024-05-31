<template>
	<v-simple-table light>
		<template #default>
			<thead>
				<tr>
					<th class="text-center"></th>
					<th class="text-center">Copyleft</th>
					<th class="text-center">Permissive</th>
					<th class="text-center">Creative Commons</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in questions" :key="item.a">
					<td>{{ item.a }}</td>
					<td>{{ item.b }}</td>
					<td>{{ item.c }}</td>
					<td>{{ item.d }}</td>
				</tr>
			</tbody>
		</template>
	</v-simple-table>
</template>

<script>
export default {
	data: () => ({
		questions: [
			{
				a: 'What is a user allowed to do with the code?',
				b: 'What user wants under certain rules',
				c: 'What user wants with a few restrictions',
				d: 'What user wants without restrictions',
			},
			{
				a: 'Clause of the use',
				b: 'Derivative work must be attributed to creator opensource and copyleft',
				c: 'Derivative work must be attributed to a creator',
				d: 'Derivative work must be attributed to a creator',
			},
			{
				a: 'Source code',
				b: 'Must be open',
				c: 'Don’t have to be open',
				d: 'No specific terms about the distribution of source code',
			},
			{
				a: 'Is creator liable for bugs?',
				b: 'Yes',
				c: 'No',
				d: 'No',
			},
			{
				a: 'Re-licensing',
				b: 'Derivative work cannot be released as proprietary sotfware',
				c: 'Derivative work can be released under another license or as proprietary software',
				d: 'Derivative work can be released under another license or as proprietary software',
			},
			{
				a: 'Commercial restrictions',
				b: 'Permitted',
				c: 'Permitted',
				d: 'Permitted',
			},
		],
	}),
};
</script>
<style scoped>
.v-data-table >>> table > tbody > tr > th {
	font-size: 0.7rem !important;
}

.v-data-table >>> table > tbody > tr > td {
	font-size: 0.7rem !important;
}
</style>
