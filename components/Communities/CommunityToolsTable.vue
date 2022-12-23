<template>
	<div>
		<v-data-table
			dense
			:headers="headers"
			:items="tools"
			:items-per-page="15"
			:search="search"
			item-key="_id"
			:loading="$store.state.community.loading.tools"
		>
			<template #top>
				<v-text-field
					v-model="search"
					label="Search"
					class="mx-4"
				></v-text-field>
			</template>
			<!-- eslint-disable -->
			<template #item.name="{ item }">
				<!-- eslint-enable -->
				<nuxt-link
					:to="
						/tool/ +
						(item.registry_tool_id ? item.registry_tool_id.split(':')[1] : '')
					"
					append
					target="_blank"
				>
					<v-icon x-small>mdi-open-in-new</v-icon>
					{{ item.name }}
				</nuxt-link>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		tools: { type: Array, required: true },
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
				{ text: 'Status', value: 'status' },
				{ text: 'Description', value: 'description' },
			],
		};
	},
};
</script>
