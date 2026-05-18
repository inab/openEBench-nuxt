<template>
	<div class="license-table">
		<v-row class="license-table__header">
			<v-col cols="12" md="6"></v-col>
			<v-col cols="6" md="2">OSI approved</v-col>
			<v-col cols="6" md="4">See also</v-col>
		</v-row>

		<v-row
			v-for="license in enrichedLicenses"
			:key="licenseKey(license)"
			class="license-table__row"
			align="center"
		>
			<v-col cols="12" md="6">
				<v-btn
					v-if="license.reference || license.url"
					:href="license.reference || license.url"
					target="_blank"
					rel="noopener noreferrer"
					text
					class="license-table__license"
				>
					{{ license.displayName }}
				</v-btn>

				<div
					v-else
					class="license-table__license license-table__license--plain"
				>
					{{ license.displayName }}
				</div>
			</v-col>

			<v-col cols="6" md="2" class="license-table__osi">
				<span v-if="license.loading">Checking...</span>
				<span v-else-if="license.isOsiApproved === true"
					><v-chip color="green" outlined>Yes</v-chip></span
				>
				<span v-else-if="license.isOsiApproved === false"
					><v-chip color="orange" outlined>No</v-chip></span
				>
				<span v-else class="license-table__muted"
					><v-chip color="grey" outlined>Unknown</v-chip></span
				>
			</v-col>

			<v-col cols="6" md="4">
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
			return rawLicenses
				.map((item) => ({
					id: item.id,
					name: item.term?.name || null,
					url: item.term?.url || null,
				}))
				.filter((license) => license.name || license.url);
		},

		enrichedLicenses() {
			return this.licenses.map((license) => {
				const key = this.licenseKey(license);
				const apiData = this.licensesApiData[key] || {};

				return {
					...license,
					loading: apiData.loading || false,
					displayName: apiData.name || license.name || 'Unknown license',
					reference: apiData.reference || license.url || null,
					isOsiApproved: apiData.isOsiApproved,
					seeAlso: apiData.seeAlso || this.getFallbackSeeAlso(license),
				};
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
	max-width: 90%;
	margin-left: 5%;
	margin-right: 5%;
	margin-bottom: 3%;
}

.license-table__header {
	font-size: 20px;
	color: rgba(0, 0, 0, 65%);
}

.license-table__row {
	margin-bottom: 12px;
}

.license-table__license {
	justify-content: flex-start;
	background-color: #eef4fb;
	color: #005aa8;
	width: auto;
	max-width: 100%;
	min-width: 420px;
	min-height: 48px;
	padding: 0 22px;
	font-weight: 600;
	font-size: 16px;
	letter-spacing: normal;
	text-transform: none;
	border-radius: 6px;
}

.license-table__osi {
	font-size: 16px;
}

.license-table__chip {
	font-size: 18px;
	height: 34px;
	padding: 0 14px;
}

.license-table__license ::v-deep .v-btn__content {
	letter-spacing: normal;
	text-transform: none;
}

.license-table__license--plain {
	display: flex;
	align-items: center;
}

.license-table__license:hover {
	background-color: #e3edf8;
}

.license-table__muted {
	color: rgba(0, 0, 0, 45%);
}

.v-chip {
	background-color: #f5f5f5 !important;
	font-size: 15px;
}
</style>
