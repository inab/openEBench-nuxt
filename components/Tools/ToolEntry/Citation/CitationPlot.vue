<template>
	<div style="border-top: 1px solid rgba(0, 0, 0, 8%); padding-top: 12px">
		<template>
			<!-- Botones + Mensaje -->
			<div class="d-flex align-center justify-space-between mb-2 mt-5 mx-3">
				<div class="d-flex" style="gap: 20px">
					<v-tooltip v-if="showCumulativeButton" bottom>
						<template #activator="{ on, attrs }">
							<v-btn
								v-bind="attrs"
								v-on="on"
								small
								rounded
								tonal
								:color="cumulativeActive ? 'primary' : ''"
								:aria-pressed="cumulativeActive"
								@click="cumulativeActive = !cumulativeActive"
							>
								<span
									v-if="cumulativeActive"
									class="mdi mdi-radiobox-marked"
									style="font-size: 15px; font-weight: 800; margin-right: 3px"
								></span>
								<span
									v-if="!cumulativeActive"
									class="mdi mdi-radiobox-blank"
									style="font-size: 15px; margin-right: 3px"
								></span>
								Cumulative
							</v-btn>
						</template>
						<span>{{ cumulativeTooltip }}</span>
					</v-tooltip>

					<v-tooltip v-if="dataTraces.length > 1" bottom>
						<template #activator="{ on, attrs }">
							<v-btn
								v-bind="attrs"
								v-on="on"
								small
								rounded
								tonal
								:color="mergeActive ? 'primary' : ''"
								:aria-pressed="mergeActive"
								@click="mergeActive = !mergeActive"
							>
								<span
									v-if="mergeActive"
									class="mdi mdi-radiobox-marked"
									style="font-size: 15px; font-weight: 800; margin-right: 3px"
								></span>
								<span
									v-if="!mergeActive"
									class="mdi mdi-radiobox-blank"
									style="font-size: 15px; margin-right: 3px"
								></span>
								Merge all publication counts
							</v-btn>
						</template>
						<span>{{ mergeTooltip }}</span>
					</v-tooltip>
				</div>

				<div
					v-if="message"
					class="d-flex align-center"
					style="
						gap: 6px;
						font-size: 0.9rem;
						color: rgba(0, 0, 0, 45%);
						margin-top: 4px;
					"
				>
					<i class="fas fa-info-circle" style="font-size: 12px"></i>
					{{ message }}
				</div>
			</div>

			<!-- Plot -->
			<citationsPlot
				:key="plotKey"
				:data-traces="computedTraces"
				:colors="computedColors"
				:showlegend="mergeActive ? false : showlegend"
				:line="computedLine"
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
			cumulativeActive: false,
			mergeActive: false,
		};
	},
	computed: {
		plotKey() {
			return `${this.cumulativeActive}-${this.mergeActive}`;
		},
		showCumulativeButton() {
			return !(
				this.dataTraces.length === 1 && this.dataTraces[0].data.length === 1
			);
		},
		computedTraces() {
			let traces = this.mergeActive ? this.buildMerge() : this.dataTraces;

			if (this.cumulativeActive) {
				traces = this.buildCumulative(traces);
			}

			return traces;
		},
		computedColors() {
			if (this.mergeActive) return ['#37474F'];
			return this.colors;
		},
		computedLine() {
			if (this.mergeActive) return { dash: 'dot', width: 2 };
			return { dash: 'solid', width: 1.8 };
		},
		cumulativeTooltip() {
			if (this.cumulativeActive) {
				return this.mergeActive
					? 'Show combined total, not accumulated'
					: 'Show yearly values, not accumulated';
			}
			return this.mergeActive
				? 'Accumulate the combined total'
				: 'Accumulate each series over time';
		},
		mergeTooltip() {
			if (this.mergeActive) {
				return this.cumulativeActive
					? 'Split into separate accumulated series'
					: 'Split into separate series';
			}
			return this.cumulativeActive
				? 'Combine into one cumulative line'
				: 'Combine all series into one line';
		},
	},
	methods: {
		buildCumulative(traces) {
			return traces.map((trace) => {
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
					line: { dash: 'dot', width: 2 },
				},
			];
		},
	},
};
</script>
