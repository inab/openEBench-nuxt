<template>
	<div>
		<h2 class="text-h5 mb-5">Classification Table</h2>
		<p class="caption">{{ event.name }}</p>
		<classification-table
			:id="event._id"
			:key="event._id"
			:filter-array="selectedIds"
		/>

		<h2 class="text-h5 mt-10 mb-5">Challenges</h2>
		<v-data-table
			:key="event._id + '_challenges'"
			v-model="selected"
			dense
			:headers="headers"
			:items="event.challenges"
			:items-per-page="10"
			:search="search"
			item-key="_id"
			show-select
			:loading="$store.state.communities.loading.events"
			class="mt-5"
		>
			<template #top>
				<v-text-field
					v-model="search"
					label="Search"
					class="mx-4"
				></v-text-field>
			</template>
			<!-- eslint-disable -->
			<template #item.acronym="{ item }">
				<!-- eslint-enable -->
				<nuxt-link :to="item._id" append>
					{{ item.acronym }}
				</nuxt-link>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import ClassificationTable from '~/components/Widgets/ClassificationTableWrapper';

export default {
	components: { ClassificationTable },
	props: {
		event: { type: Object, required: true },
	},
	data() {
		return {
			search: '',
			selected: [],
			headers: [
				{
					text: 'Acronym',
					align: 'start',
					value: 'acronym',
				},
				{ text: 'Name', value: 'name' },
			],
		};
	},
	computed: {
		selectedIds() {
			const Ids = this.selected.map(function (item) {
				return item._id;
			});
			return Ids;
		},
	},
};
</script>

<style lang="scss" scoped></style>
