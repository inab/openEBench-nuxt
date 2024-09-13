<template>
	<v-row no-gutters align="center">
		<v-col cols="12" class="d-flex justify-space-between align-center">
			<div>
				<h2 v-if="currentEvent" class="text-h6">
					<v-menu auto>
						<template #activator="{ on, attrs }">
							<span
								class="text--clickable primary--text"
								v-bind="attrs"
								v-on="on"
							>
								Event - {{ currentEvent.name }}
							</span>
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
				<!-- Challenges count for mobile -->
				<div class="d-flex align-center mt-2 d-md-none">
					<v-icon class="mr-1 text--primary">mdi-flag-outline</v-icon>
					<span>{{ currentEvent.challenges.length }}</span>
					<span>{{
						'Challenges' | pluralize(currentEvent.challenges.length)
					}}</span>
				</div>
			</div>
			<!-- Challenges count for desktop (conditionally hidden) -->
			<div v-if="!isMobile" class="d-flex align-center">
				<v-icon class="mr-1 text--primary">mdi-flag-outline</v-icon>
				<span>{{ currentEvent.challenges.length }}&nbsp;</span>
				<span>{{
					'Challenges' | pluralize(currentEvent.challenges.length)
				}}</span>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: {
		currentEvent: { type: Object, required: true },
		events: { type: Array, required: true },
	},
	computed: {
		isMobile() {
			return this.$vuetify.breakpoint.smAndDown; // Checks if screen is mobile (sm and down)
		},
	},
};
</script>

<style scoped>
@media (max-width: 960px) {
	.mt-2 {
		margin-top: 8px !important;
	}
}
</style>
