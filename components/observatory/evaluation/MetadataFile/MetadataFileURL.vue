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
				title: 'FAIRsoft-indicators',
				URL: 'https://raw.githubusercontent.com/EvaMart/FAIRsoft-indicators/master/FAIRsoft-indicators.metadata.jsonld',
			},
		],
		installDialogParameters: {
			title: 'Unable to access the file.',
			text: 'Let the FAIRsoft Evaluator access the requested repositories content by grantting the <a>OpenEBench FAIRsoft Evaluator GitHub App</a> the necessary permissions.',
		},
	}),

	methods: {
		submitURL() {
			this.payload = this.ParseGitHubURL(this.URL);
			if (this.payload) {
				this.submitGitHubLink();
			} else {
				this.$store.dispatch(
					'observatory/evaluation/file/parseFromURL',
					this.URL
				);
			}

			this.$store.dispatch('observatory/evaluation/changeStep', 3);
		},
		ParseGitHubURL(url) {
			/*
            Check if the URL is a raw GitHub URL:
                raw.githubusercontent.com/${user}/${repo}/${branch}/${path}
            If it is, return the payload to fetch the file content.
            Else, return null.
            */
			const pattern = /^(http(s?):\/\/)?raw\.githubusercontent\.com\/(.*)$/i;
			if (pattern.test(url)) {
				const payload = {
					repo: url.split('/')[4],
					owner: url.split('/')[3],
					branch: url.split('/')[5],
					path: url.split('/').slice(6).join('/'),
				};

				return payload;
			} else {
				return null;
			}
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

		async submitGitHubLink() {
			/*
            This function is called when the URL introduced by the user is a github one.
            It checks if the app is installed in the repository and, if it is, fetches the metadata.
            If it is not installed, it opens a dialog to install it.
            */

			// 1.1 Open dialog to show progress

			this.$store.dispatch('observatory/evaluation/github/updateRepository', {
				owner: this.payload.owner,
				repo: this.payload.repo,
			});

			this.$store.dispatch(
				'observatory/evaluation/file/updateDialogParseMetadata',
				true
			);
			console.log('open dialog');

			// 1.2 Get installation ID
			console.log('Get installation ID');
			await this.$store.dispatch(
				'observatory/evaluation/github/getInstallationID',
				{
					owner: this.payload.owner,
					repo: this.payload.repo,
				}
			);

			const installationID =
				this.$store.getters['observatory/evaluation/github/getInstallationID'];
			console.log('installation ID: ' + installationID);

			// 2. If it is installed, fetch file content
			if (installationID) {
				const payload = {
					installationID,
					repo: this.payload.repo,
					owner: this.payload.owner,
					path: this.payload.path,
				};

				this.$store.dispatch(
					'observatory/evaluation/file/parseFromGitHubURL',
					payload
				);
			} else {
				// 3. If it is not installed, open dialog to install it
				this.$store.dispatch(
					'observatory/evaluation/file/updateDialogParseMetadata',
					false
				);
				this.$store.dispatch(
					'observatory/evaluation/file/updateDialogInstallApp',
					true
				);

				// this.$store.dispatch('evaluation/changeLoading', { github : false}) // close loading dialog
				// this.dialogAppNotInstalled = true // open "app installation" dialog
			}
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
