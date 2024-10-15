<template>
	<v-form>
		<v-row justify="space-around" class="mt-1">
			<v-col cols="10">
				<p class="text-body-2">Enter the URL of the metadata file:</p>
			</v-col>
		</v-row>
		<v-row justify="space-around" class="mb-0 mt-0 d-flex align-center">
			<v-col cols="10">
				<v-text-field
					v-model="URL"
					class="ml-1 text-body-2"
					label="Link to metadata file"
					:rules="[rules.required]"
					outlined
					clearable
					clear-icon="mdi-close-circle"
					prepend-icon="mdi-link-variant"
				>
				</v-text-field>
				<span class="mt-0 pt-0 ml-8 pl-2 text-body-2 grey--text font-italic">
					Examples:
					<span v-for="(item, i) in exampleValues" :key="i">
						<a @click="inputExample(item.URL)">
							{{ item.title }}
						</a>
						<span v-if="i < exampleValues.length - 1">, </span>
					</span>
				</span>
			</v-col>
		</v-row>
		<v-row justify="space-around" class="d-flex mt-2 pt-0">
			<v-col cols="10" class="text-right">
				<v-btn color="primary" :disabled="invalid" @click="submitURL">
					Continue
				</v-btn>
				<v-btn text @click="goBack"> Back </v-btn>
			</v-col>
		</v-row>

		<DialogAppInstall
			:dialog-app-install="
				$store.getters['observatory/evaluation/file/getDialogInstallApp']
			"
			:title="installDialogParameters.title"
			:text="installDialogParameters.text"
			@cancel="cancel"
			@ready="submitURL"
		/>
	</v-form>
</template>
<script>
import { mapGetters } from 'vuex';
import DialogAppInstall from '~/components/observatory/evaluation/GitHub/DialogAppInstall.vue';

export default {
	name: 'MetadataFileURL',
	components: {
		DialogAppInstall,
	},
	computed: {
		// This is not working for some unknown reason
		...mapGetters({
			dialogInstallApp: 'observatory/evaluation/file/getDialogInstallApp',
			test: 'observatory/evaluation/file/getTest',
			installationID: 'observatory/evaluation/github/getInstallationID',
		}),

		// Check if the file is valid
		invalid() {
			return !this.URL;
		},
	},
	data: () => ({
		URL: '',
		rules: {
			required: (value) => !!value || 'Required.',
		},
		payload: {
			owner: '',
			repo: '',
			branch: '',
			path: '',
		},
		exampleValues: [
			{
				title: 'oeb-visualizations',
				URL: 'https://raw.githubusercontent.com/inab/oeb-visualizations/refs/heads/main/metadata.jsonld',
			},
		],
		installDialogParameters: {
			title: 'Unable to access the file.',
			text: 'Let the FAIRsoft Evaluator access the requested repositories content by grantting the <a>OpenEBench FAIRsoft Evaluator GitHub App</a> the necessary permissions.',
		},
	}),

	methods: {
		submitURL() {
			this.$store.dispatch('observatory/evaluation/file/downloadFile', {
				url: this.URL,
			});

			this.$store.dispatch('observatory/evaluation/changeStep', 3);
		},
		cancel() {
			this.$store.dispatch(
				'observatory/evaluation/file/updateDialogInstallApp',
				false
			);
			this.$store.dispatch(
				'observatory/evaluation/file/updateDialogParseMetadata',
				false
			);
		},

		goBack() {
			this.$store.dispatch('observatory/evaluation/changeStep', 1);
			this.value = '';
		},
		inputExample(URL) {
			this.URL = URL;
		},
	},
};
</script>
