<template>
	<v-card id="fixed" class="mt-0 pb-2 pb-1" max-width="500" elevation="0">
		<v-card-title class="pt-0 pb-0 mt-1 mb-0">
			<span class="font-weight-regular text-h6">{{ name }}</span>
		</v-card-title>
		<div class="ml-1">
			<v-chip
				v-for="(item, i) in cleanVersion(version)"
				:key="i"
				color="primary lighten-2"
				x-small
				outlined
				class="pt-2 pb-2 pl-1 pr-1 mt-0 ml-2"
			>
				<span class="text-caption font-weight-bold">{{ item }}</span>
			</v-chip>
		</div>

		<div class="ml-3 mt-2">
			<ChipType :type="type" />
		</div>

		<div class="ml-2 mt-2">
			<LinkChipWImage
				v-for="[key, value] in Object.entries(sourcesLabels)"
				:key="key"
				:link="value"
				:type="key"
				:text="key"
				light
				small
				minimal
				class="ml-1"
			/>
			<LinkChipWIcon
				v-if="webpage"
				:link="webpage[0].term"
				icon="mdi-web"
				class="ml-0"
				minimal
			/>
		</div>
	</v-card>
</template>
<script>
import ChipType from '../Search/Card/ChipType.vue';
import LinkChipWImage from '../Search/Card/LinkChipWImage.vue';
import LinkChipWIcon from '../Search/Card/LinkChipWIcon.vue';

export default {
	name: 'ToolBrief',
	components: {
		ChipType,
		LinkChipWImage,
		LinkChipWIcon,
	},
	props: {
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		version: {
			type: Array,
			required: true,
		},
		sourcesLabels: {
			type: Object,
			required: true,
		},
		webpage: {
			type: Array,
			required: true,
		},
	},
	methods: {
		cleanVersion(version) {
			return version.filter((item) => item);
		},
	},
};
</script>
<style scoped>
.v-card-title {
	font-weight: 300;
}
</style>
