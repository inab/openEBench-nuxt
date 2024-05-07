<template>
	<div>
		<v-data-table
			dense
			:headers="headers"
			:items="items"
			:items-per-page="15"
			:search="search"
			item-key="_id"
			:loading="
				$store.state.challenge.loading.participants ||
				$store.state.challenge.loading.metrics
			"
		>
			<template #top>
				<v-text-field
					v-model="search"
					label="Search"
					class="mx-4"
				></v-text-field>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		metricsTable: { type: Object, required: true },
	},
	data() {
		const headers = this.metricsTable.metrics.map((metric, metricsI) => {
			return {
				text: metric.metrics_label,
				align: 'start',
				value: `metricsValues[${metricsI}].value`,
			};
		});
		headers.unshift({
			text: 'Participant',
			align: 'start',
			value: 'participant.participant_label',
		});

		const items = this.metricsTable.participants.map(
			(participant, participantI) => {
				return {
					_id: participant._id,
					participant,
					metricsValues: this.metricsTable.dataMatrix[participantI],
				};
			}
		);

		return {
			search: '',
			headers,
			items,
		};
	},
};
</script>
