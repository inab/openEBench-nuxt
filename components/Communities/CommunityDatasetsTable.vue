<template>
	<div>
		<v-data-table
			dense
			:headers="headers"
			:items="datasets"
			:items-per-page="15"
			:search="search"
			item-key="_id"
			:loading="$store.state.community.loading.datasets"
		>
			<template #top>
				<v-text-field
					v-model="search"
					label="Search"
					class="mx-4"
				></v-text-field>
			</template>
			<!-- eslint-disable -->
			<template #item.datalink="{ item }">
				<!-- eslint-enable -->
				<a v-if="item.datalink.uri" :href="item.datalink.uri" target="_blank">
					Download
				</a>
				<span v-else class="text--disabled">not available</span>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		datasets: { type: Array, required: true },
	},
	data() {
		return {
			search: '',
			headers: [
				{
					text: 'Name',
					align: 'start',
					value: 'name',
				},
				{ text: 'Type', value: 'type' },
				{ text: 'Download', value: 'datalink' },
			],
		};
	},
};
</script>
