<template>
	<div>
		<ViewMetadata />
		<ExportMetadataCardDownload />
		<ExportMetadataCardPull />
	</div>
</template>
<script>
import ExportMetadataCardDownload from '~/components/observatory/evaluation/Export/ExportMetadataCardDownload.vue';
import ExportMetadataCardPull from '~/components/observatory/evaluation/Export/ExportMetadataCardPull.vue';
import ViewMetadata from '~/components/observatory/evaluation/Export/ViewMetadata.vue';

export default {
	name: 'MetadataActions',
	components: {
		ExportMetadataCardDownload,
		ExportMetadataCardPull,
		ViewMetadata,
	},
};
</script>
