<template>
	<v-container>
		<v-row justify="center">
			<v-alert
				color="grey lighten-1"
				elevation="0"
				outlined
				prominent
				:icon="getFromBoxStatic('icon')"
				width="90%"
				class="pl-6 pr-5 mb-6"
			>
				<v-row class="ml-1" align="center">
					<v-col class="mb-0 pb-0">
						<span class="text-subtitle-2 black--text">
							{{ getFromBoxStatic('title') }}
						</span>
						<v-divider class="my-3" style="opacity: 0.5"></v-divider>
					</v-col>
				</v-row>
				<v-row class="mt-0">
					<v-col class="pt-0">
						<v-expansion-panels flat>
							<v-expansion-panel>
								<v-expansion-panel-header class="mr-0 pl-4 pb-0">
									<span
										class="text-caption grey--text"
										v-html="getFromBoxStatic('description')"
									></span>
									<template #actions>
										<v-icon class="ml-4" size="35" color="primary">
											mdi-chevron-down
										</v-icon>
									</template>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-row justify="end" class="pl-0 mr-3">
										<v-col cols="12" class="pl-1">
											<v-card-text class="mt-0 mb-0 pb-0 ml-0 pl-0">
												Enter details:
											</v-card-text>
										</v-col>
										<v-col cols="3" class="mt-0 pt-2">
											<v-text-field
												v-model="owner"
												:rules="[rules.required]"
												outlined
												dense
												hide-details
												label="Owner"
												class="text-body-2"
											>
											</v-text-field>
										</v-col>
										<v-col cols="3" class="mt-0 pt-2">
											<v-text-field
												v-model="repo"
												:rules="[rules.required]"
												outlined
												dense
												hide-details
												label="Repository"
												class="text-body-2"
											>
											</v-text-field>
										</v-col>
										<v-col cols="2" class="mt-0 pt-2">
											<v-text-field
												v-model="branch"
												:rules="[rules.required]"
												outlined
												dense
												hide-details
												label="Target branch"
												class="text-body-2"
											>
											</v-text-field>
										</v-col>
										<v-col cols="4" class="mt-0 pt-2">
											<v-text-field
												v-model="filename"
												:rules="[rules.required]"
												outlined
												dense
												hide-details
												label="File name"
												class="text-body-2"
											>
											</v-text-field>
										</v-col>
									</v-row>
									<v-spacer></v-spacer>
									<v-row justify="end" class="mt-5 mr-5">
										<v-btn
											color="success"
											:disabled="invalid"
											@click="makeRequest"
										>
											Make request
										</v-btn>
									</v-row>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</v-row>
			</v-alert>
		</v-row>

		<DialogAppInstall
			:initial-dialog-app-install="dialogAppInstall"
			:title="installDialogParameters.title"
			:text="installDialogParameters.text"
			:installation-url="installDialogParameters.installationURL"
			@cancel="cancel"
		/>

		<DialogPR />

		<DialogPRok />

		<DialogPRfail />
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import DialogAppInstall from '../GitHub/DialogAppInstall.vue';
import DialogPR from './DialogPR.vue';
import DialogPRok from './DialogPRok.vue';
import DialogPRfail from './DialogPRfail.vue';

export default {
	name: 'ExportCitationCardPull',
	components: {
		DialogAppInstall,
		DialogPR,
		DialogPRok,
		DialogPRfail,
	},
	props: {
		content: Object,
		type: {
			type: String,
			default: 'metadata',
		},
	},
	data() {
		return {
			boxStatic: {
				citation: {
					title: 'Make Pull Request in GitHub Repository',
					icon: 'mdi-source-pull',
					description:
						'<span class="text-body-2 black--text">Make a pull request to add the citation file in the repository of the software.</span><br> A new branch will be created from the target branch and the citation file (in CFF format) will be added to it. This new branch will be called "evaluator-1". If this branch already exists, the new branch will be called "evaluator-2", "evaluator-3", and so on. A pull request will be made to merge the new branch with the target branch.',
					iconText: 'Make Request',
				},
				metadata: {
					title: 'Make Pull Request in GitHub Repository',
					icon: 'mdi-source-pull',
					description:
						'<span class="text-body-2 black--text">Make a pull request to add the metadata in the repository of the software.</span><br> A new branch will be created from the target branch and the metadata file (in JSON-LD format) will be added to it. This new branch will be called "evaluator-1". If this branch already exists, the new branch will be called "evaluator-2", "evaluator-3", and so on. A pull request will be made to merge the new branch with the target branch.',
					iconText: 'Make Request',
				},
			},
			dialog: true,
			owner: '',
			repo: '',
			branch: 'main',
			filename: '',
			rules: {
				required: (value) => !!value || 'Required.',
				gitHubURL: (value) => {
					const pattern =
						/^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/(.*)+\/(.*)+\/?$/i;
					return (
						pattern.test(value) ||
						'Please enter a valid GitHub repository link.'
					);
				},
			},
			installDialogParameters: {
				installationURL:
					'https://github.com/apps/metadata-updater-for-fairsoft/installations/select_target',
				title: 'Unable to create a pull request',
				text: 'Let the FAIRsoft Evaluator create a branch, create a citation file and make a pull request in the repository by grantting the <a href="https://github.com/apps/metadata-updater-for-fairsoft" target="_blank">Metadata Updater for FAIRsoft GitHub App</a> the necessary permissions.',
			},
		};
	},
	computed: {
		...mapGetters('observatory', {
			initial_repository: 'evaluation/github/getRepository',
			installationID: 'evaluation/github/getUpdaterInstallationID',
			dialogAppInstall: 'evaluation/export/getDialogAppInstall',
			name: 'evaluation/metadata/getToolName',
		}),
		invalid() {
			if (this.owner === '' || this.repo === '') {
				return true;
			} else {
				return false;
			}
		},
		pullRequest() {
			return {
				citation: {
					title: `Citation for ${this.name}`,
					message: `Citation (\`${this.filename}\`) generated by [Metadata Updater for FAIRsoft](https://github.com/apps/metadata-updater-for-fairsoft) added.`,
				},
				metadata: {
					title: `Description of ${this.name}`,
					message: `Metadata (\`${this.filename}\`) generated by [Metadata Updater for FAIRsoft](https://github.com/apps/metadata-updater-for-fairsoft) added.`,
				},
			};
		},
	},
	mounted() {
		this.repo = this.initial_repository.repo;
		this.owner = this.initial_repository.owner;
		if (this.type === 'metadata') {
			this.filename = this.name + '.metadata.json';
		} else if (this.type === 'citation') {
			this.filename = 'CITATION.cff';
		}
	},
	methods: {
		getFromBoxStatic(param) {
			return this.boxStatic[this.type][param];
		},
		clickBtn(itemID) {
			if (itemID === 'download') {
				this.dialogInput = false;
				// this.$store.commit('setDialogImportMetadata', true)
			}
		},
		buildRepositoryURL() {
			return `https://github.com/${this.owner}/${this.repo}`;
		},

		cancel() {
			this.$store.dispatch('observatory/evaluation/export/cancelRequest');
		},

		toString(object) {
			/*
			Transform a JSON object to a base64 string
			*/
			if (this.type === 'metadata') {
				return JSON.stringify(object, null, 2);
			} else {
				return object;
			}
		},
		async makeRequest() {
			/*
            This function is called when the user clicks on the "Make request" button.
            It checks if the app is installed in the repository and if so,
            it makes a request to the backend to pull the data from the repository.
            If it is not installed, it opens a dialog to install it.
            */

			// 1. Check if the app is installed in the repository
			// 1.1 Open dialog to show progress
			this.$store.dispatch(
				'observatory/evaluation/export/updateDialogPR',
				true
			);
			// 1.2 Get installation ID
			const repository = {
				owner: this.owner,
				repo: this.repo,
			};
			await this.$store.dispatch(
				'observatory/evaluation/github/getUpdaterInstallationID',
				repository
			);

			// 2. If the app is installed, make the request
			if (this.installationID) {
				// 2.1 Make request to backend
				console.log(this.content);
				const payload = {
					owner: this.owner,
					repo: this.repo,
					branch: this.branch,
					filename: this.filename,
					content: this.toString(this.content),
					title: this.pullRequest[this.type].title,
					message: this.pullRequest[this.type].message,
					installationID: this.installationID,
				};

				await this.$store.dispatch(
					'observatory/evaluation/export/makePullRequest',
					payload
				);
			} else {
				// 3. If the app is not installed, open dialog to install it
				this.$store.dispatch(
					'observatory/evaluation/export/updateDialogAppInstall',
					true
				);
				this.$store.dispatch(
					'observatory/evaluation/export/updateDialogPR',
					false
				);
			}
		},
	},
};
</script>
