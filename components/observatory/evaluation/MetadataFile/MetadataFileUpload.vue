<template>
	<v-form>
		<v-row justify="space-around" class="mt-1">
			<v-col cols="10">
				<p class="text-body-2">Select a file from your computer to upload:</p>
			</v-col>
		</v-row>
		<v-row justify="space-around" class="mb-0 mt-0 d-flex align-center">
			<v-col cols="10">
				<v-file-input
					v-model="file"
					accept=".json,.jsonld"
					placeholder="Select your metadata file"
					outlined
					:show-size="1000"
					:rules="[rules.required]"
				>
					<template #selection="{ index, text }">
						<v-chip v-if="index < 2" label color="grey lighten-3">
							{{ text }}
						</v-chip>
					</template>
				</v-file-input>
			</v-col>
		</v-row>
		<v-row justify="space-around" class="d-flex mt-0 pt-0">
			<v-col cols="10" class="text-right">
				<v-btn color="primary" :disabled="invalid" @click="submitFile">
					Continue
				</v-btn>
				<v-btn text @click="goBack"> Back </v-btn>

				<span class="error--text">{{ message }}</span>
			</v-col>
		</v-row>
	</v-form>
</template>
<script>
export default {
	name: 'MetadataFileUpload',
	data: () => ({
		file: null,
		data: '',
		rules: {
			required: (value) => !!value || 'Required.',
		},
		message: '',
	}),
	computed: {
		// Check if the file is valid
		invalid() {
			return !this.file;
		},
	},
	methods: {
		goBack() {
			this.$store.dispatch('observatory/evaluation/changeStep', 1);
			this.file = '';
		},
		async submitFile() {
			try {
				await this.$store.dispatch(
					'observatory/evaluation/file/parseMetadataFile',
					this.file
				);
			} catch (error) {
				console.error('Error submitting file:', error);
			}
		},
	},
};
</script>
