<template>
	<v-row>
		<v-col cols="5">
			<v-combobox
				v-model="selectLicense"
				:items="SPDXLicenses"
				label="License"
				outlined
				dense
				class="text-body-2"
				@input="changeValueName"
			></v-combobox>
		</v-col>
		<v-col cols="6">
			<v-text-field
				v-model="URL"
				label="URL"
				outlined
				dense
				class="text-body-2"
				@input="changeValue"
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-1" small> mdi-close-circle </v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>
	</v-row>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'CategoryAndTextFieldLicense',
	props: ['item', 'field', 'index', 'id'],
	data() {
		return {
			selectLicense: '',
			URL: '',
		};
	},
	mounted() {
		this.selectLicense = this.item.name;
		this.findMatchingLicense(this.item.name);
		this.URL = this.item.url;
	},
	computed: {
		...mapGetters({
			SPDXLicenses: 'observatory/evaluation/metadata/getSPDXLicenses',
		}),
	},
	methods: {
		changeValueName() {
			if (this.SPDXLicenses.includes(this.selectLicense)) {
				this.$observatory
					.get('/spdx/SPDXLicenses/url/' + this.selectLicense)
					.then((response) => {
						// console.log(response.data)
						this.URL = response.data.URL;
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				this.URL = '';
			}

			this.changeValue();
		},
		findMatchingLicense(license) {
			this.$observatory
				.get('/spdx/SPDXLicenses/match/' + license)
				.then((response) => {
					// console.log(response.data)
					if (response.data.match === '') {
						this.selectLicense = license;
					} else {
						this.selectLicense = response.data.match;
						changeValueName();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		changeValue() {
			const newValue = {
				id: this.id,
				term: {
					name: this.selectLicense,
					url: this.URL,
				},
			};
			const payload = {
				field: this.field,
				index: this.index,
				value: newValue,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeEntry',
				payload
			);
			this.$forceUpdate();
		},
	},
};
</script>
