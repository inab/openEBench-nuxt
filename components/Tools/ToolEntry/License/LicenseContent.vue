<template>
	<div class="license-table">
		<v-row class="license-table__header">
			<v-col cols="11" md="6"></v-col>
			<v-col cols="5" md="2">OSI approved</v-col>
			<v-col cols="5" md="4">See also</v-col>
		</v-row>

		<template v-for="(license, index) in enrichedLicenses">
			<v-divider :key="`divider-${index}`" class="divider" />
			<v-row
				:key="licenseKey(license)"
				class="license-table__row"
				align="center"
			>
				<v-col cols="11" md="6">
					<v-btn
						v-if="license.reference || license.url"
						:href="license.reference || license.url"
						target="_blank"
						rel="noopener noreferrer"
						text
						class="license-table__license"
						:class="{ 'license-table__license--grey': !license.isSpdx }"
					>
						{{ license.displayName }}
					</v-btn>

					<div
						v-else
						class="license-table__license license-table__license--plain"
						:class="{ 'license-table__license--grey': !license.isSpdx }"
					>
						{{ license.displayName }}
					</div>
				</v-col>

				<v-col cols="5" md="2" class="license-table__osi">
					<span v-if="license.loading" class="license-table__muted"
						>Checking...</span
					>
					<span v-else-if="license.isOsiApproved === true">Yes</span>
					<span v-else-if="license.isOsiApproved === false">No</span>
					<span v-else class="license-table__muted">—</span>
				</v-col>

				<v-col cols="5" md="4">
					<template v-if="license.seeAlso && license.seeAlso.length">
						<v-chip
							v-for="url in license.seeAlso"
							:key="url"
							class="license-table__chip mr-2 my-1"
							small
							pill
							:href="url"
							target="_blank"
							rel="noopener noreferrer"
						>
							{{ extractDomain(url) }}
						</v-chip>
					</template>

					<span v-else class="license-table__muted">—</span>
				</v-col>
			</v-row>
		</template>

		<div v-if="!enrichedLicenses.length" class="license-table__muted">
			No licensing information available.
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'LicenseContent',

	data() {
		return {
			licensesApiData: {},
		};
	},

	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
		}),

		licenses() {
			const rawLicenses = this.tool?.license || [];
			const hiddenNames = ['undefined'];
			return rawLicenses
				.map((item) => ({
					id: item.id,
					name: item.term?.name || null,
					url: item.term?.url || null,
				}))
				.filter((license) => license.name || license.url)
				.filter(
					(license) =>
						!license.name ||
						!hiddenNames.includes(license.name.trim().toLowerCase())
				);
		},

		enrichedLicenses() {
			return this.licenses
				.map((license) => {
					const key = this.licenseKey(license);
					const apiData = this.licensesApiData[key] || {};

					return {
						...license,
						loading: apiData.loading || false,
						displayName: apiData.name || license.name || 'Unknown license',
						reference: apiData.reference || license.url || null,
						isOsiApproved: apiData.isOsiApproved,
						isSpdx: apiData.isSpdx || false,
						seeAlso: apiData.seeAlso || this.getFallbackSeeAlso(license),
					};
				})
				.sort((a, b) => {
					const aHasLink = Boolean(a.reference || a.url);
					const bHasLink = Boolean(b.reference || b.url);
					return Number(bHasLink) - Number(aHasLink);
				});
		},
	},

	watch: {
		licenses: {
			immediate: true,
			deep: true,
			handler() {
				this.fetchLicensesData();
			},
		},
	},

	methods: {
		licenseKey(license) {
			return `${license.name || ''}-${license.url || ''}`;
		},

		async fetchLicensesData() {
			await Promise.all(
				this.licenses.map(async (license) => {
					const key = this.licenseKey(license);

					if (!license.name) {
						this.setUnknownLicenseData(key, license);
						return;
					}

					this.$set(this.licensesApiData, key, {
						loading: true,
						isOsiApproved: null,
						seeAlso: [],
					});

					try {
						const response = await this.$axios.$get(
							`https://observatory.openebench.bsc.es/licenses-mapping/licenses/${encodeURIComponent(
								license.name
							)}`
						);

						if (!response || !response.licenseId) {
							this.setUnknownLicenseData(key, license);
							return;
						}

						this.$set(this.licensesApiData, key, {
							loading: false,
							licenseId: response.licenseId,
							isSpdx: true,
							name: response.name || response.licenseId,
							reference: response.reference || license.url || null,
							isOsiApproved: response.isOsiApproved,
							seeAlso: response.seeAlso || [],
						});
					} catch (error) {
						this.setUnknownLicenseData(key, license);
					}
				})
			);
		},

		setUnknownLicenseData(key, license) {
			this.$set(this.licensesApiData, key, {
				loading: false,
				isSpdx: false,
				name: license.name || 'Unknown license',
				reference: license.url || null,
				isOsiApproved: null,
				seeAlso: this.getFallbackSeeAlso(license),
			});
		},

		getFallbackSeeAlso(license) {
			const urls = [];

			if (license.url) urls.push(license.url);
			if (Array.isArray(license.seeAlso)) urls.push(...license.seeAlso);

			return [...new Set(urls)];
		},

		extractDomain(url) {
			try {
				return new URL(url).hostname.replace(/^www\./, '');
			} catch (_) {
				return url;
			}
		},
	},
};
</script>

<style scoped>
.license-table {
	max-width: 100%;
	margin-left: 5%;
	margin-right: 5%;
	margin-bottom: 3%;
}

.license-table__header {
	font-size: 14px;
	padding-bottom: 0.1em;
	color: rgba(0, 0, 0, 55%);
}

.license-table__row {
	margin-bottom: 0;
	padding-top: 0.5em;
}

.license-table__license {
	justify-content: flex-start;
	background-color: #e0eaf3;
	color: #0b579f;
	width: auto;
	max-width: 100%;
	min-width: 0;
	min-height: 32px;
	height: 32px;
	padding: 0 12px;
	margin-bottom: 0;
	font-weight: 600;
	font-size: 14px;
	letter-spacing: normal;
	text-transform: none;
	border-radius: 6px;
}

.license-table__osi {
	font-size: 13px;
}

.license-table__chip {
	font-size: 12px;
	height: 24px;
	padding: 0 10px;
}

.license-table__license ::v-deep .v-btn__content {
	letter-spacing: normal;
	text-transform: none;
}

.license-table__license--plain {
	display: flex;
	align-items: center;
	font-size: 13px;
}

.license-table__license:hover {
	background-color: #cbdcec;
}

.license-table__license--grey {
	background-color: #f0f0f0;
	color: rgba(0, 0, 0, 70%);
}

.license-table__license--grey:hover {
	background-color: #e6e6e6;
}

.license-table__muted {
	color: rgba(0, 0, 0, 45%);
}

.v-chip {
	background-color: #f5f5f5 !important;
	font-size: 12px;
}

.divider {
	width: 100%;
}
</style>
