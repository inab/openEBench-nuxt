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
				<p class="small">
					Note that the authors are a required field of a CFF file. If you have
					not provided this information, the CFF file will not be generated.
					Additionally, please double-check that the given-names and
					family-names are correct, as this file was created automatically. Make
					any necessary adjustments to ensure accuracy.
				</p>
			</v-row>
		</v-container>

		<v-alert v-if="error" text type="error" class="mx-auto" width="90%">
			{{ error }}
		</v-alert>
		<template v-else>
			<ViewCitation :key="citation" :citation="citation" />
			<ExportCitationCardDownload />
			<ExportContentCardPull :content="citation" type="citation" />
		</template>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import ExportCitationCardDownload from '~/components/observatory/evaluation/Export/ExportCitationCardDownload.vue';
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
			error: 'observatory/evaluation/metadata/getCFFError',
		}),
	},
};
</script>
