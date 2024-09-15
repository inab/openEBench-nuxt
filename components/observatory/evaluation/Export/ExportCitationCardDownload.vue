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
						<v-btn class="mb-4" color="primary" @click="download()">
							{{ alert.iconText }}
						</v-btn>
					</v-col>
				</v-row>
			</v-alert>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import jsyaml from 'js-yaml';

export default {
	name: 'ExportCitationCardDownload',
	data() {
		return {
			file_name: 'tool_citation.cff',
			alert: {
				title: 'Download Citation',
				id: 'download',
				icon: 'mdi-download',
				description:
					'Click "Download" to save the metadata file in JSON-LD format to your device.',
				iconText: 'Download',
			},
		};
	},
	computed: {
		...mapGetters({
			toolMetadataCFF: 'observatory/evaluation/metadata/getToolCitationCFF',
		}),
	},
	methods: {
		download() {
			const yaml = jsyaml.dump(this.toolMetadataCFF);
			const url = window.URL.createObjectURL(
				new Blob([yaml], { type: 'text/yaml' })
			);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', this.file_name);
			document.body.appendChild(link);
			link.click();
		},
	},
};
</script>
