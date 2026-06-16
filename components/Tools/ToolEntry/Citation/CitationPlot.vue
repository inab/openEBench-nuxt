<template>
	<div style="border-top: 1px solid rgba(0, 0, 0, 8%); padding-top: 12px">
		<template>
			<!-- Botones -->
			<!-- Botones + Mensaje -->
			<div class="d-flex align-center justify-space-between mb-2 mt-5 mx-5">
				<div class="d-flex" style="gap: 30px">
					<v-btn
						v-if="showCumulativeButton"
						small
						rounded
						tonal
						:color="mode === 'cumulative' ? 'primary' : ''"
						@click="mode = mode === 'cumulative' ? 'normal' : 'cumulative'"
					>
						Cumulative
					</v-btn>
					<v-btn
						v-if="dataTraces.length > 1"
						small
						rounded
						tonal
						:color="mode === 'merge' ? 'primary' : ''"
						@click="mode = mode === 'merge' ? 'normal' : 'merge'"
					>
						Merge all publication counts
					</v-btn>
				</div>

				<div
					v-if="message"
					class="d-flex align-center"
					style="
						gap: 6px;
						font-size: 0.9rem;
						color: rgba(0, 0, 0, 45%);
						margin-top: 8px;
						margin-right: 35px;
					"
				>
					<i class="fas fa-info-circle" style="font-size: 12px"></i>
					{{ message }}
				</div>
			</div>

			<!-- Plot -->
			<citationsPlot
				:key="mode"
				:dataTraces="computedTraces"
				:colors="computedColors"
				:showlegend="mode === 'merge' ? false : showlegend"
			/>
		</template>
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
		message: {
			type: String,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			mode: 'normal',
		};
	},
	computed: {
		showCumulativeButton() {
			return !(
				this.dataTraces.length === 1 && this.dataTraces[0].data.length === 1
			);
		},
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
