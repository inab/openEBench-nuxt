<template>
	<v-row>
		<v-col cols="7">
			<v-card outlined style="border: 0.8px solid #0b579f" class="pl-2 pb-2">
				<v-card-title style="font-size: 1rem; color: #0b579f">
					<a :href="licenseUrl" target="_blank">{{ licenseName }}</a>
				</v-card-title>
				<div class="d-flex">
					<v-chip
						v-if="isOsiApproved"
						color="green lighten-5"
						text-color="green darken-3"
						class="ml-4 mb-3 text-body font-weight-medium"
						small
						>OSI Approved</v-chip
					>
					<v-chip
						v-if="spdx"
						outlined
						text-color="grey darken-2"
						class="ml-4 mb-3 text-body-2"
						small
						><v-img :src="spdxLogo" height="15" max-width="60" contain></v-img
					></v-chip>
				</div>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'LicenseRow',
	props: {
		/*
		 * The license name
		 */
		name: {
			type: String,
			default: '',
		},
		/*
		 * The license url
		 */
		url: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isOsiApproved: null,
			licenseName: this.name,
			licenseUrl: this.url,
			spdx: false,
			spdxLogo: require('@/static/images/spdx_logo.jpeg'),
		};
	},
	mounted() {
		// make request to check if license is OSI approved
		this.fetchMapping();
	},
	methods: {
		async fetchMapping() {
			const url = `https://observatory.openebench.bsc.es/licenses-mapping/map?q=${this.name}`;
			console.log('URL: ' + url);
			const result = await this.$axios.$post(url);
			if (result) {
				this.spdx = true;
			}
			if (result.isOsiApproved) {
				this.isOsiApproved = result.isOsiApproved;
			}
			if (result.name) {
				this.licenseName = result.name;
			}
			if (result.reference && !this.url) {
				this.licenseUrl = result.reference;
			}
		},
		osiText() {
			if (this.isOsiApproved) {
				return 'Yes';
			}
			return 'No';
		},
		osiColor() {
			if (this.isOsiApproved) {
				return 'green lighten-5';
			}
			return 'grey lighten-5';
		},
		osiTextColor() {
			if (this.isOsiApproved) {
				return 'green darken-2';
			}
			return 'grey darken-2';
		},
	},
};
</script>
