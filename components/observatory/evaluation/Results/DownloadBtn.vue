<template>
	<v-btn color="primary" class="mt-4 ml-4" outlined @click="download()">
		<v-icon left> mdi-download </v-icon>
		{{ btnTitle }}
	</v-btn>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'DownloadBtn',
	props: ['btnTitle'],
	data: () => ({
		title: 'tool_metadata.json',
	}),
	computed: {
		...mapGetters({
			toolMetadata: 'observatory/evaluation/getToolMetadata',
		}),
	},
	methods: {
		download() {
			console.log(this.title);
			const data = JSON.stringify(this.toolMetadata, null, 4);
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
