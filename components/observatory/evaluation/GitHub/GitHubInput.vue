<template>
	<v-container>
		<v-form>
			<v-row justify="space-around">
				<v-col cols="10">
					<p class="text-body-2">
						Introduce the URL of the GitHub repository of the software:
					</p>
				</v-col>
			</v-row>
			<v-row justify="space-around" class="mb-0 mt-0 d-flex align-center">
				<v-col cols="10">
					<v-text-field
						v-model="value"
						class="ml-1"
						label="Link to GitHub repository"
						:rules="[rules.required, rules.gitHubURL]"
						outlined
						clearable
						clear-icon="mdi-close-circle"
						prepend-icon="mdi-github"
						@click:clear="clearLink"
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
			<v-row justify="space-around" class="d-flex mt-0 pt-0">
				<v-col cols="10" class="text-right">
					<v-btn color="primary" :disabled="invalid" @click="sumbitGitHubLink">
						Continue
					</v-btn>
					<v-btn text @click="goBack"> Back </v-btn>
				</v-col>
			</v-row>

			<DialogAppInstall
				:initial-dialog-app-install="dialogAppInstall"
				:title="installDialogParameters.title"
				:text="installDialogParameters.text"
				@cancel="cancel"
				@ready="fetchMetadata"
			/>

			<DialogImportMetadata />
		</v-form>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import DialogAppInstall from './DialogAppInstall.vue';
import DialogImportMetadata from './DialogImportMetadata.vue';

export default {
	name: 'GitHubInput',
	components: {
		DialogAppInstall,
		DialogImportMetadata,
	},
	data: () => ({
		value: '',
		rules: {
			required: (value) => !!value || 'Required.',
			gitHubURL: (value) => {
				const pattern =
					/^(https?:\/\/)?(www\.)?github\.[a-z]+\/[^/]+\/[^/]+\/?$/i;
				return (
					pattern.test(value) || 'Please enter a valid GitHub repository link.'
				);
			},
		},
		exampleValues: [
			{
				title: 'oeb-visualizations',
				URL: 'https://github.com/inab/oeb-visualizations',
			},
		],
		installDialogParameters: {
			title: "Unable to access repository's metadata.",
			text: 'Let the FAIRsoft Evaluator access the requested repositories metadata by grantting the <a href="https://github.com/apps/metadata-extractor-for-fairsoft" target="_blank">Metadata Extractor for FAIRsoft GitHub App</a> the necessary permissions.',
		},
	}),
	computed: {
		invalid() {
			if (this.value === '') {
				return true;
			} else {
				return false;
			}
		},
		...mapGetters('observatory/evaluation/github', {
			installationID: 'getExtractorInstallationID',
			repository: 'getRepository',
			dialogAppInstall: 'getDialogAppInstall',
		}),
	},
	methods: {
		clearLink() {
			this.value = '';
		},
		inputExample(URL) {
			this.value = URL;
		},
		goBack() {
			this.$store.dispatch('observatory/evaluation/changeStep', 1);
			this.value = '';
		},
		cancel() {
			this.$store.dispatch('observatory/evaluation/github/cancelImport');
		},
		async fetchMetadata() {
			const payload = {
				installationID: this.installationID,
				repo: this.repository.repo,
				owner: this.repository.owner,
			};
			await this.$store.dispatch(
				'observatory/evaluation/github/fetchGitHubMeta',
				payload
			);
		},
		async sumbitGitHubLink() {
			/*
            This function is called when the user clicks on the "Continue" button.
            It checks if the app is installed in the repository and, if it is, fetches the metadata.
            If it is not installed, it opens a dialog to install it.
            */

			this.$store.dispatch(
				'observatory/evaluation/github/updateDialogImportMetadata',
				true
			);

			const owner = this.value.split('/')[3];
			const repo = this.value.split('/')[4].split('.git')[0];

			// 1. Check if the app is installed
			this.$store.dispatch('observatory/evaluation/github/updateRepository', {
				owner,
				repo,
			});

			// 1.1 Open dialog to show progress
			this.$store.dispatch(
				'observatory/evaluation/github/updateDialogImportMetadata',
				true
			);
			// 1.2 Get installation ID
			await this.$store.dispatch(
				'observatory/evaluation/github/getExtractorInstallationID',
				this.repository
			);

			// 2. If it is installed, fetch metadata
			if (this.installationID) {
				const payload = {
					installationID: this.installationID,
					repo: this.repository.repo,
					owner: this.repository.owner,
				};
				this.$store.dispatch(
					'observatory/evaluation/github/fetchGitHubMeta',
					payload
				);
			} else {
				// 3. If it is not installed, open dialog to install it
				this.$store.dispatch(
					'observatory/evaluation/github/updateDialogImportMetadata',
					false
				);
				this.$store.dispatch(
					'observatory/evaluation/github/updateDialogAppInstall',
					true
				);

				// this.$store.dispatch('evaluation/changeLoading', { github : false}) // close loading dialog
				// this.dialogAppNotInstalled = true // open "app installation" dialog
			}
		},
	},
};
</script>
