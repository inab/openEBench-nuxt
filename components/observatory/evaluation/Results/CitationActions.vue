<template>
	<div>
		<v-container :style="{ width: '90%' }" class="mb-4">
			<v-row>
				<h4 class="mb-3">What is a Citation File?</h4>
				<p>
					A citation file helps ensure that your software gets proper citation
					when used in research. By including a citation file in your
					repository, users can easily reference your work. For more
					information, see the
					<a href="https://citation-file-format.github.io/" target="_blank"
						>Citation File Format CFF specification</a
					>.
				</p>
				<p>
					A CFF file has been generated based on the metadata provided in the
					previous step. Below, you have several options to preview, download,
					or directly integrate this file into your GitHub repository.
				</p>
			</v-row>
		</v-container>

		<ViewCitation :key="citation" :citation="citation" />
		<ExportCitationCardDownload />
		<ExportContentCardPull :content="citation" type="citation" />
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import ExportCitationCardDownload from '~/components/observatory/evaluation/Export/ExportMetadataCardDownload.vue';
import ExportContentCardPull from '~/components/observatory/evaluation/Export/ExportContentCardPull.vue';
import ViewCitation from '~/components/observatory/evaluation/Export/ViewCitation.vue';

export default {
	name: 'CitationActions',
	components: {
		ExportCitationCardDownload,
		ExportContentCardPull,
		ViewCitation,
	},
	computed: {
		...mapGetters({
			citation: 'observatory/evaluation/metadata/getToolMetadataCFF',
		}),
	},
};
</script>
