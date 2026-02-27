<template>
	<div class="fixed">
		<v-app-bar color="white" dense flat outlined>
			<v-container fluid>
				<v-row align="center" justify="space-between">
					<div class="d-flex align-left">
						<div>
							<v-toolbar-title class="ml-5 mr-5 mt-1">
								{{ name }}
							</v-toolbar-title>
						</div>
						<div class="mt-1">
							<v-chip
								v-for="(item, i) in cleanVersion(version)"
								:key="i"
								color="primary lighten-2"
								small
								outlined
								class="pa-2 mt-0 mr-1"
							>
								<span class="font-weight-bold caption">{{ item }}</span>
							</v-chip>
						</div>
					</div>
					<div class="d-flex align-left">
						<div>
							<LinkChipWIcon
								v-if="webpage"
								:link="webpage[0].term"
								text=""
								icon="mdi-web"
								class="ml-1"
								big
								minimal
							/>
							<LinkChipWImage
								v-for="[key, value] in Object.entries(sourcesLabels)"
								:key="key"
								:link="value"
								:type="key"
								text=""
								light
								class="ml-1 mr-2"
								big
								minimal
							/>
						</div>
						<div class="ml-3">
							<ChipType
								v-for="item in type"
								:key="item"
								:type="item"
								class="mr-1 mt-2 font-weight-bold"
							/>
						</div>
					</div>
				</v-row>
			</v-container>
		</v-app-bar>
		<v-divider></v-divider>
	</div>
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
.fixed {
	position: fixed;
	width: 100%;
	z-index: 100;
}
</style>
