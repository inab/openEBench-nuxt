<template>
	<div>
		<v-container :style="{ width: '90%' }" class="mb-4">
			<v-row>
				<h4 class="mb-3">About the Metadata</h4>
				<p>
					The metadata provided here is based on the information provided in the
					previous step. It is in JSON-LD format and incorporates
					<a href="https://schema.org/" target="_blank">Schema.org</a>,
					<a href="https://bioschemas.org/" target="_blank">Bioschemas</a>, and
					<a href="" target="_blank">maSMP</a>
					entities. This ensures your metadata is highly interoperable on the
					internet, making it easy to be understood and utilized by a wide range
					of systems and services.
				</p>
				<p>
					Below, you have several options to preview, download, or directly
					integrate this file into your GitHub repository.
				</p>
			</v-row>
		</v-container>

		<ViewMetadata :key="metadata" :metadata="metadata" />
		<ExportMetadataCardDownload />
		<ExportContentCardPull :content="metadata" type="metadata" />
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import ExportMetadataCardDownload from '~/components/observatory/evaluation/Export/ExportMetadataCardDownload.vue';
import ExportContentCardPull from '~/components/observatory/evaluation/Export/ExportContentCardPull.vue';
import ViewMetadata from '~/components/observatory/evaluation/Export/ViewMetadata.vue';

export default {
	name: 'MetadataActions',
	components: {
		ExportMetadataCardDownload,
		ExportContentCardPull,
		ViewMetadata,
	},
	computed: {
		...mapGetters({
			metadata: 'observatory/evaluation/metadata/getToolMetadataJSONLD',
		}),
	},
};
</script>
