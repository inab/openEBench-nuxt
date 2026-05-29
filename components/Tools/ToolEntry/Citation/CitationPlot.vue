<template>
	<!-- Falta el banner de carga -->
	<div>
		<!-- Botones -->
		<div class="d-flex justify-center mb-2 mt-3" style="gap: 30px">
			<v-btn
				small
				rounded
				tonal
				:color="mode === 'cumulative' ? 'primary' : ''"
				@click="mode = mode === 'cumulative' ? 'normal' : 'cumulative'"
			>
				Cumulative
			</v-btn>
			<v-btn
				small
				rounded
				tonal
				:color="mode === 'merge' ? 'primary' : ''"
				@click="mode = mode === 'merge' ? 'normal' : 'merge'"
			>
				Merge all publication counts
			</v-btn>
		</div>

		<!-- Plot -->
		<citationsPlot
			v-if="computedTraces.length > 0"
			:key="mode"
			:dataTraces="computedTraces"
			:colors="computedColors"
			:showlegend="mode === 'merge' ? false : showlegend"
		/>
	</div>
</template>

<script>
import { citationsPlot } from '@inb/oeb_visualizations';

export default {
	name: 'CitationPlot',
	components: { citationsPlot },
	props: {
		dataTraces: {
			type: Array,
			required: true,
		},
		colors: {
			type: Array,
			required: false,
			default: () => [],
		},
		showlegend: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data() {
		return {
			mode: 'normal', // 'normal' | 'cumulative' | 'merge'
		};
	},
	computed: {
		computedTraces() {
			if (this.mode === 'cumulative') return this.buildCumulative();
			if (this.mode === 'merge') return this.buildMerge();
			return this.dataTraces;
		},
		computedColors() {
			if (this.mode === 'merge') return ['#2196f3'];
			return this.colors;
		},
	},
	methods: {
		buildCumulative() {
			return this.dataTraces.map((trace) => {
				let acc = 0;
				const cumulativeData = trace.data.map((d) => {
					acc += d.citations;
					return { year: d.year, citations: acc };
				});
				return { ...trace, data: cumulativeData };
			});
		},

		buildMerge() {
			// Agrupa todas las citas por año sumando todas las publicaciones
			const yearMap = {};
			this.dataTraces.forEach((trace) => {
				trace.data.forEach((d) => {
					yearMap[d.year] = (yearMap[d.year] || 0) + d.citations;
				});
			});

			const mergedData = Object.entries(yearMap)
				.map(([year, citations]) => ({ year: parseInt(year), citations }))
				.sort((a, b) => a.year - b.year);

			return [
				{
					id: 'merged',
					label: 'All publications',
					title: 'All publications',
					data: mergedData,
				},
			];
		},
	},
};
</script>
