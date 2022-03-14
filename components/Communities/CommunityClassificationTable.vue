<template>
	<div>
		<p class="text-body-2 text--secondary d-flex align-center">
			<v-icon small class="mr-1">mdi-information-outline</v-icon>
			Events correspond to a benchmarking experiment which is held within a
			certain time-frame, usually including a set of Benchmarking Event
			Challenges.
		</p>
		<p class="text-body-2 text--secondary d-flex align-center">
			<v-icon small class="mr-1">mdi-information-outline</v-icon>
			Challenges are a set of tests which the community uses to benchmark
			participating tools
		</p>
		<classification-table
			:id="event._id"
			:key="event._id"
			:filter-array="selectedIds"
			class="mt-5"
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
			:loading="$store.state.community.loading.events"
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
