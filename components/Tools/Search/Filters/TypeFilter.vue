<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Type of Tool</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-btn-toggle
				v-model="types"
				group
				dense
				multiple
				tile
				color="primary"
				class="flex-wrap"
			>
				<v-btn v-for="(item, i) in type_items" :key="i" @click="updateTypes">
					<span class="text-caption">{{ item }}</span>
				</v-btn>
			</v-btn-toggle>
		</v-expansion-panel-content>
		<v-divider></v-divider>
	</v-expansion-panel>
</template>
<script>
export default {
	name: 'TypeFilter',
	data() {
		return {
			types: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			type_items: [
				'CMD',
				'APP',
				'WEB',
				'LIB',
				'API',
				'DB',
				'WORKFLOW',
				'SUITE',
				'OTHER',
			],
		};
	},
	methods: {
		updateTypes(value) {
			this.$store.dispatch('tool/updateToolsTypes', value);
		},
	},
};
</script>
