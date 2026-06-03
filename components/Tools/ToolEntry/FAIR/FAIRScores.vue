<template>
	<div v-if="fairsoft" id="fair-scores" class="mt-5">
		<div
			v-for="dimension in dimensions"
			:key="dimension.id"
			class="mb-3 dimension"
		>
			<div class="d-flex align-center mb-2">
				<span class="text-caption text-uppercase font-weight-bold grey--text">
					{{ dimension.title }}
				</span>
				<v-chip
					v-if="score(dimension.id) !== null"
					x-small
					text-color="white"
					class="ml-2 score-chip"
					:style="chipStyle(dimension.id)"
				>
					{{ score(dimension.id) }}
				</v-chip>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'FAIRScores',
	data: () => ({
		dimensions: [
			{
				id: 'F',
				title: 'Findability',
				children: [
					{ id: 'F1', name: 'F1. Identity Uniqueness' },
					{ id: 'F2', name: 'F2. Existence of Metadata' },
					{ id: 'F3', name: 'F3. Searchability' },
				],
			},
			{
				id: 'A',
				title: 'Accessibility',
				children: [
					{ id: 'A1', name: 'A1. Existence of available working version' },
					{ id: 'A2', name: 'A2. Software history trackability' },
					{ id: 'A3', name: 'A3. Unrestricted access' },
				],
			},
			{
				id: 'I',
				title: 'Interoperability',
				children: [
					{
						id: 'I1',
						name: 'I1. Documentation on Input/output data types and formats',
					},
					{ id: 'I2', name: 'I2. Workflow compatibility' },
					{ id: 'I3', name: 'I3. Dependencies availability' },
				],
			},
			{
				id: 'R',
				title: 'Reusability',
				children: [
					{ id: 'R1', name: 'R1. Usage documentation' },
					{ id: 'R2', name: 'R2. License' },
					{ id: 'R3', name: 'R3. Contribution policy' },
					{ id: 'R4', name: 'R4. Provenance' },
				],
			},
		],
	}),
	computed: {
		...mapGetters('tool_entry', { tool: 'tool' }),
		fairsoft() {
			return this.tool?.fairsoft || null;
		},
	},
	methods: {
		// Dimension score (0-1) formatted as a rounded percentage, or null if absent
		score(key) {
			const value = this.fairsoft?.[key];
			return typeof value === 'number' ? Math.round(value * 100) : null;
		},
		// Chip background: primary color with opacity proportional to the score,
		// so higher scores look more solid and lower scores more transparent.
		chipStyle(key) {
			const value = this.fairsoft?.[key];
			const opacity = typeof value === 'number' ? value : 0;
			const primary = this.$vuetify.theme.currentTheme.primary;
			const [r, g, b] = this.hexToRgb(primary);
			return { backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})` };
		},
		hexToRgb(hex) {
			const normalized = String(hex || '').replace('#', '');
			const value = parseInt(normalized, 16);
			return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
		},
	},
};
</script>
<style scoped>
.indicator {
	line-height: 1.3;
}

.score-chip {
	font-weight: 600;
}
</style>
