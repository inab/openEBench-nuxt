<template>
	<v-container>
		<v-tabs v-model="tab" fixed-tabs>
			<v-tabs-slider></v-tabs-slider>
			<v-tab v-for="(item, index) in items" :key="index">
				<v-icon left>{{ item.icon }}</v-icon>
				{{ item.text }}
			</v-tab>

			<v-tabs-items v-model="tab">
				<v-tab-item v-for="(item, index) in items" :key="index">
					<v-card flat class="pt-6">
						<component :is="item.component"></component>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
		<DialogParseMetadata />
		<ErrorDialogParseMetadata />
	</v-container>
</template>
<script>
import MetadataFileUpload from './MetadataFileUpload.vue';
import MetadataFileURL from './MetadataFileURL.vue';
import ErrorDialogParseMetadata from './ErrorDialogParseMetadata.vue';
import DialogParseMetadata from '~/components/observatory/evaluation/MetadataFile/DialogParseMetadata.vue';

export default {
	name: 'MetadataFileInput',
	components: {
		MetadataFileUpload,
		MetadataFileURL,
		DialogParseMetadata,
		ErrorDialogParseMetadata,
	},
	data: () => ({
		tab: 'Upload File',
		items: [
			{
				text: 'Upload File',
				component: 'MetadataFileUpload',
				icon: 'mdi-upload',
			},
			{
				text: 'Enter URL',
				component: 'MetadataFileURL',
				icon: 'mdi-link',
			},
		],
		text: 'Tab 1',
	}),
};
</script>
