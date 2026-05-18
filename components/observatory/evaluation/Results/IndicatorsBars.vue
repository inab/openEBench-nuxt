<template>
	<!-- Full width, single row -->
	<div class="w-full overflow-x-visible px-4">
		<div class="bars-row">
			<div
				v-for="(indicator, index) in indicators"
				:key="index"
				class="bars-segment"
				:style="{ width: normalizedWidths[index] + '%' }"
			>
				<div class="d-flex flex-column fill-height">
					<!-- Label -->
					<div
						class="label font-weight-medium text-body-2 mb-1 ml-3"
						:style="{ color: getColor(index).text }"
					>
						{{ indicator.label }}
					</div>

					<!-- Bar + tooltip -->
					<div
						class="bar-wrapper"
						@mouseenter="hoveredIndex = index"
						@mouseleave="hoveredIndex = null"
					>
						<div
							class="bar-bg"
							:style="{ backgroundColor: getColor(index).background }"
						>
							<div
								class="bar-fill"
								:style="{
									width: clampPercent(safeScore(indicator.score) * 100),
									backgroundColor: getColor(index).fill,
								}"
							>
								<span class="bar-text">{{
									safeScore(indicator.score).toFixed(2)
								}}</span>
							</div>
						</div>

						<!-- Tooltip OUTSIDE clipped bg -->
						<div
							v-if="
								hoveredIndex === index &&
								(indicator.title || indicator.explanation)
							"
							class="tooltip"
						>
							<div v-if="indicator.title" class="tooltip-title">
								{{ indicator.title }}
							</div>
							<div v-if="indicator.explanation" class="tooltip-body">
								{{ indicator.explanation }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'IndicatorsBars',
	props: {
		indicators: {
			type: Array,
			required: true,
			// Expected shape:
			// { label: String, score: Number, title?: String, explanation?: String, width?: Number }
		},
	},
	data() {
		return {
			hoveredIndex: null,
		};
	},
	computed: {
		normalizedWidths() {
			const weights = (this.indicators || []).map((i) =>
				i && i.width && i.width > 0 ? i.width : 1
			);
			const total = weights.reduce((a, b) => a + b, 0) || 1;
			return weights.map((w) => (w / total) * 100);
		},
	},
	methods: {
		safeScore(v) {
			const n = Number(v);
			return Number.isFinite(n) ? n : 0;
		},
		clampPercent(pct) {
			const v = Math.max(0, Math.min(100, pct));
			return `${v}%`;
		},
		getColor(index) {
			const colorMap = [
				{ text: '#5E9BE1', fill: '#5E9BE1', background: '#d0e3f7' },
				{ text: '#f5b145', fill: '#f5b145', background: '#faecd7' },
				{ text: '#289c84', fill: '#289c84', background: '#c8e6df' },
				{ text: '#A26BCF', fill: '#A26BCF', background: '#F0E0FD' },
			];
			return (
				colorMap[index] || {
					text: '#4b5563',
					fill: '#9ca3af',
					background: '#f3f4f6',
				}
			);
		},
	},
};
</script>

<style scoped>
/* Layout */
.w-full {
	width: 100%;
}

.bars-row {
	display: flex;
	flex-wrap: nowrap;
	align-items: stretch;
	width: 100%;
}

/* Each segment has a normalized width */
.bars-segment {
	flex: 0 0 auto;
}

/* Bar */
.bar-wrapper {
	position: relative;
	height: 28px; /* ~h-7 */
	width: 100%;
}

.bar-bg {
	width: 100%;
	height: 100%;
	border-radius: 9999px;
	overflow: hidden; /* clip only the fill */
}

.bar-fill {
	height: 100%;
	border-radius: 9999px;
	display: flex;
	align-items: center;
	padding: 0 8px;
	color: #fff;
	font-weight: 500;
	line-height: 1;
	font-size: 0.9rem;
	white-space: nowrap;
}

.bar-text {
	margin-left: 4px;
}

/* Tooltip (not clipped by bar-bg) */
.tooltip {
	position: absolute;
	bottom: 100%;
	left: 0;
	margin-bottom: 8px;
	background: #374151; /* gray-700 */
	color: #fff;
	font-size: 0.75rem;
	border-radius: 6px;
	padding: 6px 8px;
	max-width: 360px;
	z-index: 50;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 15%);
}

.tooltip-title {
	font-weight: 600;
	font-size: 0.75rem;
}

.tooltip-body {
	margin-top: 4px;
	color: #d1d5db; /* gray-300 */
	font-size: 0.75rem;
}
</style>
