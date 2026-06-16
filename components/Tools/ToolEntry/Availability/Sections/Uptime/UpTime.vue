<template>
	<div v-if="filteredWebpageTerms.length && hasAllowedType" class="mb-8">
		<p class="urls-label">Monitored URLs</p>

		<!-- Chips -->
		<div class="chip-row">
			<button
				v-for="url in filteredWebpageTerms"
				:key="url"
				class="url-chip"
				:class="{ active: selectedUrl === url }"
				@click="selectUrl(url)"
			>
				<span class="dot" :class="dotClass(url)" />
				{{ shortUrl(url) }}
			</button>
		</div>

		<!-- Panel — always visible -->
		<div class="uptime-panel">
			<v-skeleton-loader
				v-if="webAvailabilityLoading"
				type="list-item-two-line, image"
			/>
			<template v-else>
				<div v-if="webAvailabilityError" class="no-data-notice notice-error">
					<v-icon small color="red darken-2">mdi-alert-circle-outline</v-icon>
					Could not reach the uptime service for this URL.
				</div>
				<div
					v-else-if="webAvailabilityNoData"
					class="no-data-notice notice-nodata"
				>
					<v-icon small color="orange darken-2"
						>mdi-chart-timeline-variant-shimmer</v-icon
					>
					No uptime data recorded for this URL yet.
					<a
						:href="selectedUrl"
						target="_blank"
						rel="noopener noreferrer"
						class="nodata-link"
					>
						Visit site
						<v-icon size="11">mdi-open-in-new</v-icon>
					</a>
				</div>
				<template v-else>
					<upTimeStatus
						:status="status"
						:time="statusDays"
						:url="selectedUrl"
					/>
					<v-tabs
						v-if="availableRanges.length"
						v-model="tabUptime"
						dense
						class="mt-2"
					>
						<v-tab v-for="range in availableRanges" :key="range.key">
							{{ range.label }}
						</v-tab>
					</v-tabs>
					<v-tabs-items v-model="tabUptime">
						<v-tab-item v-for="range in availableRanges" :key="range.key">
							<UptimePlot
								class="uptime-plot"
								:data-items="plotItems(range.key)"
								:dtick="rangeDtick(range.key)"
							/>
						</v-tab-item>
					</v-tabs-items>
				</template>
			</template>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import UptimePlot from './UptimePlot.vue';
import upTimeStatus from './upTimeStatus.vue';

const EXCLUDED_DOMAINS = ['github.com', 'gitlab.com'];

function isExcludedUrl(url) {
	if (!url) return true;
	try {
		const hostname = new URL(url).hostname.toLowerCase();
		return EXCLUDED_DOMAINS.some(
			(domain) => hostname === domain || hostname.endsWith(`.${domain}`)
		);
	} catch {
		return EXCLUDED_DOMAINS.some((domain) =>
			url.toLowerCase().includes(domain)
		);
	}
}

export default {
	name: 'UpTime',
	components: { UptimePlot, upTimeStatus },
	data() {
		return {
			tabUptime: 0,
			selectedUrl: null,
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			webAvailability: 'webAvailability',
			webAvailabilityUrl: 'webAvailabilityUrl',
			webAvailabilityLoading: 'webAvailabilityLoading',
			webAvailabilityError: 'webAvailabilityError',
			webAvailabilityNoData: 'webAvailabilityNoData',
		}),
		allowedTypesForUptime() {
			return ['web', 'rest', 'sparql', 'soap', 'workbench', 'suite'];
		},
		hasAllowedType() {
			const toolTypes = this.tool?.type || [];
			return toolTypes.some((t) => this.allowedTypesForUptime.includes(t));
		},
		webpageTerms() {
			return this.tool.webpage?.map((w) => w?.term).filter(Boolean) || [];
		},
		filteredWebpageTerms() {
			return this.webpageTerms.filter((url) => {
				try {
					const parsedUrl = new URL(url);
					return !isExcludedUrl(parsedUrl.href);
				} catch {
					return false;
				}
			});
		},
		ranges() {
			return [
				{ key: 'week', label: 'Week' },
				{ key: 'month', label: 'Month' },
				{ key: 'sixMonths', label: '6 months' },
			];
		},
		availableRanges() {
			return this.ranges.filter(
				({ key }) => this.availabilityItemsByRange(key).length > 0
			);
		},
		activeRange() {
			return this.availableRanges[this.tabUptime]?.key || '';
		},
		sortedAvailabilityItems() {
			return [...this.availabilityItemsByRange(this.activeRange)].sort(
				(a, b) => new Date(a.date) - new Date(b.date)
			);
		},
		latestAvailabilityItem() {
			return (
				this.sortedAvailabilityItems[this.sortedAvailabilityItems.length - 1] ||
				null
			);
		},
		status() {
			return this.latestAvailabilityItem
				? this.statusForItem(this.latestAvailabilityItem)
				: 'UNKNOWN';
		},
		statusDays() {
			if (!this.latestAvailabilityItem) return 0;
			let days = 0;
			const latestStatus = this.statusForItem(this.latestAvailabilityItem);
			for (let i = this.sortedAvailabilityItems.length - 1; i >= 0; i--) {
				if (
					this.statusForItem(this.sortedAvailabilityItems[i]) !== latestStatus
				)
					break;
				days += 1;
			}
			return days;
		},
	},
	watch: {
		filteredWebpageTerms: {
			immediate: true,
			handler(urls) {
				if (urls.length) {
					this.selectedUrl = urls[0];
					this.$store.dispatch('tool_entry/retrieveWebAvailability', [
						this.selectedUrl,
					]);
				} else {
					this.$store.commit('tool_entry/resetWebAvailability');
				}
			},
		},
		availableRanges() {
			if (this.tabUptime >= this.availableRanges.length) this.tabUptime = 0;
		},
		webAvailabilityNoData(val) {
			console.log('webAvailabilityNoData changed to:', val);
		},
	},
	methods: {
		shortUrl(url) {
			return url.replace(/^https?:\/\//, '');
		},
		selectUrl(url) {
			if (this.selectedUrl === url) return;
			this.selectedUrl = url;
			this.tabUptime = 0;
			console.log('before dispatch — noData:', this.webAvailabilityNoData);
			this.$store.commit('tool_entry/resetWebAvailability');
			this.$store.dispatch('tool_entry/retrieveWebAvailability', [url]);
		},
		dotClass(url) {
			if (this.selectedUrl !== url) return 'dot-unknown';
			if (this.webAvailabilityLoading) return 'dot-loading';
			if (this.webAvailabilityError) return 'dot-error';
			if (this.webAvailabilityNoData) return 'dot-nodata';
			return this.status === 'UP'
				? 'dot-up'
				: this.status === 'DOWN'
				? 'dot-down'
				: 'dot-unknown';
		},
		availabilityItemsByRange(range) {
			const payload = this.webAvailability?.[range] || [];
			const items =
				payload?.data ||
				payload?.results ||
				payload?.items ||
				payload?.availability ||
				payload;
			return Array.isArray(items) ? items : [];
		},
		plotItems(range) {
			return this.availabilityItemsByRange(range).map((item) => {
				if (item == null || typeof item !== 'object') return item;
				const plain = JSON.parse(JSON.stringify(item));

				if (plain.date) {
					const parsed = new Date(plain.date);
					plain.date = Number.isNaN(parsed.getTime())
						? String(plain.date)
						: parsed.toISOString();
				}
				return plain;
			});
		},
		rangeDtick(range) {
			const day = 86400000;
			if (range === 'sixMonths') return String(day * 15);
			if (range === 'month') return String(day * 7);
			return String(day);
		},
		statusForItem(item) {
			if (!item || item.code == null) return 'UNKNOWN';
			return item.code >= 200 && item.code < 400 ? 'UP' : 'DOWN';
		},
	},
};
</script>

<style scoped>
.urls-label {
	font-size: 1.2rem !important;
	color: rgba(0, 0, 0, 50%);
	font-weight: 500;
	margin-bottom: 8px;
}

.chip-row {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 16px;
}

.url-chip {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 5px 13px;
	border-radius: 999px;
	background: #f5f5f5;
	cursor: pointer;
	font-size: 13px;
	font-weight: 500;
	color: #555;
	transition: all 0.15s;
}

.url-chip:hover {
	color: #222;
}

.url-chip.active {
	background: #e0eaf3;
	color: #0b579f;
}

.dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	flex-shrink: 0;
}

.dot-up {
	background: #558b2f;
}

.dot-down {
	background: #c62828;
}

.dot-error {
	background: #c62828;
}

.dot-nodata {
	background: #ef6c00;
}

.dot-unknown {
	background: #9e9e9e;
}

.dot-loading {
	background: #9e9e9e;
	animation: pulse 1s infinite;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}

	50% {
		opacity: 0.3;
	}
}

.uptime-panel {
	border: 1px solid rgba(0, 0, 0, 10%);
	border-radius: 12px;
	padding: 16px 20px;
}

.uptime-plot {
	display: block;

	/* Keep the plot (almost) full width but nudge it to the right: the left
	   margin shifts it over and the width shrinks by the same amount so the
	   right edge stays flush with the panel (no overflow). Increase both
	   `30px` values together to push it further right / decrease to push less. */
	width: calc(100% - 30px);
	margin-left: 30px;
}

.no-data-notice {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 24px 0;
	font-size: 13px;
	font-weight: 500;
}

.notice-error {
	color: #c62828;
}

.notice-nodata {
	color: #ef6c00;
}
</style>
