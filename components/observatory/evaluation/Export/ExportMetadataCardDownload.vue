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

export default {
	name: 'ExportMetadataCardDownload',
	data() {
		return {
			file_name: 'tool_metadata.json',
			alert: {
				title: 'Download Metadata',
				id: 'download',
				icon: 'mdi-download',
				description: 'Download the metadata in JSON-LD format.',
				iconText: 'Download',
			},
		};
	},
	computed: {
		...mapGetters({
			toolMetadataJSONLD:
				'observatory/evaluation/metadata/getToolMetadataJSONLD',
		}),
	},
	methods: {
		download() {
			const data = JSON.stringify(this.toolMetadataJSONLD, null, 4);
			const url = window.URL.createObjectURL(
				new Blob([data], { type: 'application/json' })
			);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', this.title);
			document.body.appendChild(link);
			link.click();
		},
	},
};
</script>
