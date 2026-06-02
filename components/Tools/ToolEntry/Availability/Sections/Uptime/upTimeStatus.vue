<template>
	<v-row class="status-row">
		<v-col cols="4" class="status-cell">
			<div class="status-title">CURRENT<br />STATUS</div>
			<div class="status-text" :class="statusClass">{{ status }}</div>
		</v-col>
		<v-col cols="4" class="status-cell">
			<div class="status-title">DAYS<br />{{ status }}</div>
			<div class="status-text">{{ time }}</div>
		</v-col>
		<v-col v-if="url" cols="4" class="status-cell">
			<div class="status-title">SOURCE</div>
			<a
				:href="url"
				target="_blank"
				rel="noopener noreferrer"
				class="visit-link"
			>
				<v-icon small class="mr-1">mdi-open-in-new</v-icon>
				{{ shortUrl }}
			</a>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'UpTimeStatus',
	props: {
		status: { type: String, default: 'UP' },
		time: { type: Number, default: 0 },
		url: { type: String, default: '' }, // ← new prop
	},
	computed: {
		shortUrl() {
			return this.url.replace(/^https?:\/\//, '');
		},
		statusClass() {
			return this.status === 'UP'
				? 'text-up'
				: this.status === 'DOWN'
				? 'text-down'
				: '';
		},
	},
};
</script>

<style scoped>
.status-row {
	border-bottom: 1px solid rgba(0, 0, 0, 8%);
	margin-bottom: 12px;
	padding-bottom: 12px;
}

.status-cell {
	border-right: 1px solid rgba(0, 0, 0, 8%);
}

.status-cell:last-child {
	border-right: none;
}

.status-title {
	font-size: 11px;
	font-weight: 500;
	line-height: 1.3;
	color: #888;
	letter-spacing: 0.04em;
}

.status-text {
	font-size: 30px;
	font-weight: 500;
	line-height: 1.1;
}

.text-up {
	color: #2e7d32;
}

.text-down {
	color: #c62828;
}

.visit-link {
	display: inline-flex;
	align-items: center;
	font-size: 13px;
	font-weight: 500;
	color: #1565c0;
	text-decoration: none;
	margin-top: 4px;
	word-break: break-all;
}

.visit-link:hover {
	text-decoration: underline;
}
</style>
