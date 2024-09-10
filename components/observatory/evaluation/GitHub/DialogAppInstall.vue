<template>
	<v-dialog v-model="dialogAppInstall" persistent max-width="350">
		<v-card class="pt-3 pb-3 pl-2 pr-2">
			<v-card-title class="mt-0 pt-0 text-h6">
				{{ title }}
			</v-card-title>
			<v-card-text> <span v-html="text"></span></v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="success" class="ml-1 mr-5" @click="openGitHubAppLink">
					Give Permissions
					<v-icon class="ml-1"> mdi-open-in-new </v-icon>
				</v-btn>

				<v-btn text @click="cancelInstall"> close </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DialogAppInstall',
	props: ['title', 'text', 'initialDialogAppInstall'],
	computed: {
		...mapGetters('observatory/evaluation/github/', {
			importProgressText: 'getImportProgressText',
			repository: 'getRepository',
		}),
	},
	data() {
		return {
			installationID: null,
			socket: null,
			dialogAppInstall: this.initialDialogAppInstall,
		};
	},
	watch: {
		// Optional: React to future changes in prop value
		initialDialogAppInstall(newValue) {
			this.dialogAppInstall = newValue;
		},
	},
	methods: {
		cancelInstall() {
			this.$emit('cancel');
		},
		openGitHubAppLink() {
			/*
            This function is called when the user clicks on the "Install App" button in the dialog.
            It does two things:
            1. [NOT FOR NOW IN PRODUCTION] Opens a socket to listen for the installation ID. This socket:
                - Emits a "installation-requested" event to the server with the repo name and owner
                - Listens for a "new-installation" event from the server with the installation ID.
                  This event is triggered by the server when the installation is complete.
                - When the event is received, it stores the installation ID in the store and
                  triggers the metadata import.

            2. Opens the GitHub App installation page in a new window.
            */

			// 1. Open socket to listen for installation ID
			/*
            this.socket = this.$nuxtSocket({
                name: 'main'
            })
            */

			// 1.1. Emit event to server for it to listen for the installation ID
			// this.socket.emit('installation-requested', this.repository)

			// 1.2. When server sends the installation ID, store it in the store
			/*
            this.socket.on('new-installation', (installation_id) => {
                this.$store.dispatch('evaluation/github/updateInstallationID', installation_id)

                this.$store.dispatch('evaluation/github/updateDialogAppInstall', false) // close "app installation" dialog
                this.$store.dispatch('evaluation/github/updateDialogImportMetadata', true)  // open "import metadata" dialog
                */
			// 1.3. Emit event to parent component to trigger metadata import or PR creation
			// this.$emit('ready')

			// })

			// 2. Open App installation in new window
			window.open(
				'https://github.com/apps/metadata-extractor-for-fairsoft/installations/new',
				'_blank'
			);
		},
	},
};
</script>
