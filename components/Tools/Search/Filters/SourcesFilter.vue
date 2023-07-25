<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Sources</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<v-btn-toggle
				v-model="sources"
				group
				dense
				multiple
				tile
				color="primary"
				class="flex-wrap"
			>
				<v-btn
					v-for="(item, i) in source_items"
					:key="i"
					@click="updateSources"
				>
					<span class="text-caption">{{ item }}</span>
				</v-btn>
			</v-btn-toggle>
		</v-expansion-panel-content>
		<v-divider></v-divider>
	</v-expansion-panel>
</template>
<script>
export default {
	name: 'SourcesFilter',
	data() {
		return {
			sources: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			source_items: [
				'OpenEBench',
				'bio.tools',
				'bioconda',
				'bioconductor',
				'GalaxyEU',
				'Toolshed',
				'Github',
				'Sourceforge',
				'Bitbucket',
			],
		};
	},
	methods: {
		updateSources(value) {
			this.$store.dispatch('tool/updateToolsSources', value);
		},
	},
};
</script>
