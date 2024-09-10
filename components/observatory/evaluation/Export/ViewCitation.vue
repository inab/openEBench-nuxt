<template>
	<v-container>
		<v-row justify="center">
			<v-alert
				color="grey lighten-1"
				elevation="0"
				outlined
				prominent
				:icon="alert.icon"
				width="90%"
				class="pl-6 pr-5 mb-6"
			>
				<v-row class="ml-1" align="center">
					<v-col>
						<span class="text-subtitle-2 black--text">
							{{ alert.title }}
						</span>
						<v-divider class="my-3" style="opacity: 0.5"></v-divider>
					</v-col>
				</v-row>
				<v-row class="ml-1 mt-0">
					<v-col class="grow">
						<span class="text-body-2 black--text" v-html="alert.description">
						</span>
					</v-col>
					<v-col class="shrink">
						<v-btn class="mb-4" color="primary" @click="openDialog()">
							{{ alert.iconText }}
						</v-btn>
					</v-col>
				</v-row>
			</v-alert>
		</v-row>
		<v-dialog v-model="dialog" persistent max-width="60%">
			<v-card>
				<v-card-title>
					<span class="headline">Preview and Edit</span>
				</v-card-title>
				<v-card-text>
					<v-textarea
						v-model="yamlContent"
						label="YAML Content"
						rows="15"
						outlined
						style="line-height: 0.9; font-size: 0.75rem; font-family: monospace"
					></v-textarea>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="discardChanges"
						>Discard Changes</v-btn
					>
					<v-btn color="green darken-1" text @click="saveYaml"
						>Save and Close</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import yaml from 'js-yaml';

export default {
	name: 'ViewCitation',
	props: {
		citation: Object,
	},
	data() {
		return {
			dialog: false,
			alert: {
				title: 'Preview and Edit',
				id: 'preview',
				icon: 'mdi-eye-check-outline',
				description:
					'You can review and make changes to the metadata before saving. Click "Preview" to see the current metadata in CFF format.',
				iconText: 'Preview',
			},
			yamlContent: '',
		};
	},
	created() {
		this.yamlContent = this.citation;
	},

	methods: {
		openDialog() {
			this.dialog = true;
		},
		discardChanges() {
			this.yamlContent = this.citation;
			this.dialog = false;
		},
		saveYaml() {
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateToolMetadataCFF',
				yaml.load(this.yamlContent)
			);
			this.dialog = false;
		},
	},
};
</script>
