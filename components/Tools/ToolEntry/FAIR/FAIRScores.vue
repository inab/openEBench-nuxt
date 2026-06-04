<template>
	<div v-if="fairsoft" id="fair-scores" class="fair-card">
		<!-- Header -->
		<div class="d-flex align-center justify-space-between mb-1">
			<span class="fair-title">FAIRsoft scores</span>
		</div>
		<p class="fair-description">
			How well this software can be found, accessed, combined and reused.
		</p>

		<!-- One row per dimension -->
		<div
			v-for="(dimension, index) in dimensions"
			:key="dimension.id"
			class="dimension"
			:class="{ 'dimension--open': openDimension === dimension.id }"
		>
			<div
				class="dimension-row"
				role="button"
				tabindex="0"
				@click="toggle(dimension.id)"
				@keydown.enter="toggle(dimension.id)"
				@keydown.space.prevent="toggle(dimension.id)"
			>
				<span class="dimension-name">{{ dimension.title }}</span>
				<div class="d-flex align-center">
					<div class="score-bar">
						<div
							class="score-bar-fill"
							:style="{
								width: barWidth(dimension.id),
								backgroundColor: barColor(rawScore(dimension.id)),
							}"
						></div>
					</div>
					<span class="score-value">{{ score(dimension.id) }}</span>
					<v-icon small color="grey" class="ml-1">
						{{
							openDimension === dimension.id
								? 'mdi-chevron-up'
								: 'mdi-chevron-down'
						}}
					</v-icon>
				</div>
			</div>

			<!-- Expanded sub-indicators -->
			<v-expand-transition>
				<div v-show="openDimension === dimension.id" class="sub-panel">
					<div
						v-for="child in dimension.children"
						:key="child.id"
						class="sub-row"
					>
						<v-icon small :color="statusColor(child.id)" class="sub-icon">
							{{ statusIcon(child.id) }}
						</v-icon>
						<span class="sub-name">{{ child.name }}</span>
						<span v-if="score(child.id) !== null" class="sub-score">
							{{ score(child.id) }}
						</span>
					</div>
				</div>
			</v-expand-transition>

			<div v-if="index < dimensions.length - 1" class="dimension-divider"></div>
		</div>

		<!-- Footer -->
		<div class="fair-footer">
			Based on available metadata (a low score may mean information is missing,
			not that the software is lacking). <br />
			Indicator A2 (Software history trackability) is not currently measured.
			<br />
			<a
				href="https://inab.github.io/FAIRsoft_indicators/"
				target="_blank"
				rel="noopener noreferrer"
				class="fair-evaluator-link"
			>
				<v-icon x-small color="primary" class="mr-1">mdi-tools</v-icon>
				Learn about the FAIRsoft indicators
			</a>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'FAIRScores',
	data: () => ({
		openDimension: null,
		dimensions: [
			{
				id: 'F',
				title: 'Findability',
				children: [
					{ id: 'F1', name: 'F1 · Identity Uniqueness' },
					{ id: 'F2', name: 'F2 · Existence of Metadata' },
					{ id: 'F3', name: 'F3 · Searchability' },
				],
			},
			{
				id: 'A',
				title: 'Accessibility',
				children: [
					{ id: 'A1', name: 'A1 · Existence of available working version' },
					// A2 (Software history trackability) is not measured — hidden.
					{ id: 'A3', name: 'A3 · Unrestricted access' },
				],
			},
			{
				id: 'I',
				title: 'Interoperability',
				children: [
					{
						id: 'I1',
						name: 'I1 · I/O data types & formats',
					},
					{ id: 'I2', name: 'I2 · Workflow compatibility' },
					{ id: 'I3', name: 'I3 · Dependencies availability' },
				],
			},
			{
				id: 'R',
				title: 'Reusability',
				children: [
					{ id: 'R1', name: 'R1 · Usage documentation' },
					{ id: 'R2', name: 'R2 · License' },
					{ id: 'R3', name: 'R3 · Contribution policy' },
					{ id: 'R4', name: 'R4 · Provenance' },
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
		// Toggle a dimension open/closed (accordion: only one open at a time).
		toggle(id) {
			this.openDimension = this.openDimension === id ? null : id;
		},
		// Raw 0-1 score for any key (dimension or sub-indicator), or null.
		rawScore(key) {
			const value = this.fairsoft?.[key];
			return typeof value === 'number' ? value : null;
		},
		// Score (0-1) formatted as a rounded percentage, or null if absent.
		score(key) {
			const value = this.rawScore(key);
			return value === null ? null : Math.round(value * 100);
		},
		barWidth(key) {
			const value = this.rawScore(key);
			return `${value === null ? 0 : Math.round(value * 100)}%`;
		},
		// Bar fill color banded by score: high = green, mid = amber, low = orange.
		barColor(value) {
			if (value === null) return '#d0d0d0';
			if (value >= 0.7) return '#1d9e75';
			if (value >= 0.4) return '#ffb236';
			return '#ffb236';
		},
		// Sub-indicator status: pass (full), partial (in between), fail (none/missing).
		statusOf(key) {
			const value = this.rawScore(key);
			if (value === null || value === 0) return 'fail';
			if (value >= 1) return 'pass';
			return 'partial';
		},
		statusIcon(key) {
			const status = this.statusOf(key);
			if (status === 'pass') return 'mdi-check-circle';
			if (status === 'partial') return 'mdi-circle-half-full';
			return 'mdi-close-circle';
		},
		// Color banded by score (green from 70%); independent of the icon shape,
		// which stays a full circle only at 100% (see statusIcon/statusOf).
		statusColor(key) {
			const value = this.rawScore(key);
			if (value === null || value === 0) return 'grey';
			if (value >= 0.7) return '#1d9e75';
			return '#ffb236';
		},
	},
};
</script>
<style scoped>
.fair-card {
	width: 280px;
	background-color: #fff;
	padding: 1rem 1.1rem;
	max-height: calc(100vh - 150px);
	overflow-y: auto;
}

.fair-title {
	font-size: 16px;
	font-weight: 600;
	letter-spacing: 0.0071em;
	color: rgba(0, 0, 0, 87%);
}

.fair-description {
	font-size: 13px;
	color: rgba(0, 0, 0, 45%);
	margin: 0 0 14px;
	line-height: 1.5;
}

.dimension-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 7px 0;
	cursor: pointer;
	outline: none;
}

.dimension-row:focus-visible {
	outline: 1px solid var(--v-primary-base);
	border-radius: 4px;
}

.dimension-name {
	font-size: 14px;
	color: rgba(0, 0, 0, 87%);
}

.dimension--open .dimension-name {
	font-weight: 500;
}

.score-bar {
	width: 46px;
	height: 5px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 12%);
	overflow: hidden;
	margin-right: 8px;
}

.score-bar-fill {
	height: 100%;
	border-radius: 3px;
}

.score-value {
	font-size: 14px;
	font-weight: 500;
	min-width: 24px;
	text-align: right;
}

.dimension-divider {
	border-top: 0.5px solid rgba(0, 0, 0, 12%);
}

.sub-panel {
	background: rgba(0, 0, 0, 0%);
	border-radius: 6px;
	padding: 8px 10px;
	margin: 4px 0 8px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.sub-row {
	display: flex;
	align-items: flex-start;
	gap: 8px;
}

.sub-icon {
	margin-top: 1px;
}

.sub-name {
	flex: 1;
	font-size: 13px;
	font-weight: 500;
	color: rgba(0, 0, 0, 70%);
	line-height: 1.35;
}

.sub-score {
	font-size: 13px;
	font-weight: 500;
	color: rgba(0, 0, 0, 80%);
}

.fair-footer {
	border-top: 0.5px solid rgba(0, 0, 0, 12%);
	margin-top: 6px;
	padding-top: 10px;
	font-size: 12px;
	color: rgba(0, 0, 0, 45%);
	line-height: 1.5;
}

.fair-provenance {
	font-size: 10px;
	color: rgba(0, 0, 0, 45%);
	margin: 0 0 10px;
	line-height: 1.5;
}

.fair-evaluator-link {
	display: inline-flex;
	align-items: center;
	font-size: 12px;
	color: var(--v-primary-base);
	text-decoration: none;
}

.fair-evaluator-link:hover {
	text-decoration: underline;
}
</style>
