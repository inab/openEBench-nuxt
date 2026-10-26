<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline">View</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-btn-toggle
				v-model="display"
				mandatory
				dense
				title
				group
				color="primary"
			>
				<v-btn @click="updateDisplay(false)">
					<v-icon small>mdi-view-list</v-icon>
					<span class="text-caption">List</span>
				</v-btn>
				<v-btn @click="updateDisplay(true)">
					<v-icon small>mdi-view-grid</v-icon>
					<span class="text-caption">Grid</span>
				</v-btn>
			</v-btn-toggle>
		</v-expansion-panel-content>
		<v-divider></v-divider>
	</v-expansion-panel>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ViewSelector',
	data() {
		return {
			display: 0,
		};
	},
	computed: {
		...mapGetters({
			displayCards: 'tool/toolsDisplayCards',
		}),
	},
	methods: {
		updateDisplay(value) {
			this.$store.dispatch('tool/updateToolsDisplayCards', value);
		},
	},
};
</script>
