<template>
	<v-row no-gutters align="center">
		<v-col cols="8">
			<h2 v-if="currentEvent" class="text-h6">
				<v-menu auto>
					<template #activator="{ on, attrs }">
						<span class="text--clickable primary--text" v-bind="attrs" v-on="on"
							>Event - {{ currentEvent.name }}</span
						>
						<v-btn
							icon
							color="primary"
							v-bind="attrs"
							aria-label="Expand Community Selector"
							v-on="on"
						>
							<v-icon>mdi-chevron-down</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="(event, index) in events"
							:key="index"
							link
							dense
							@click="$emit('change', event)"
						>
							<v-list-item-title>{{ event.name }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</h2>
		</v-col>
		<v-col cols="4" class="d-flex align-center">
			<v-icon class="mr-1 text--primary"> mdi-flag-outline </v-icon>
			{{ currentEvent.challenges.length }}
			{{ 'Challenges' | pluralize(currentEvent.challenges.length) }}
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: {
		currentEvent: { type: Object, required: true },
		events: { type: Array, required: true },
	},
};
</script>
