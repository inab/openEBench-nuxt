<template>
	<div class="fixed">
		<v-app-bar color="white" dense flat outlined style="height: 56px">
			<v-row align="center" class="position-bar">
				<div class="d-flex align-left">
					<div>
						<v-toolbar-title class="text-h5 pl-1 mr-5 mt-1">
							<!-- Barra desplazada -->
							{{ name }}
						</v-toolbar-title>
					</div>
				</div>
				<div class="d-flex align-left ml-5">
					<div>
						<LinkChipWIcon
							v-if="webpage && webpage.length > 0 && webpage[0].term"
							:link="webpage[0].term"
							text=""
							icon="mdi-web"
							class="mx-0"
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
							class="mx-1"
							big
							minimal
						/>
					</div>
					<div class="ml-3 mr-1">
						<ChipType
							v-for="item in type"
							:key="item"
							:type="item"
							class="mr-1 mt-2 font-weight-bold"
						/>
					</div>
				</div>
			</v-row>
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
			type: [String, Array],
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
/* En ToolBrief.vue, eliminar esto: */
.fixed {
	position: fixed;
	top: 64px;
	left: 0; /* que empiece desde el borde izquierdo real */
	width: 100%;
	z-index: 100;
}

.position-bar {
	margin-left: 64px;
}

@media (min-width: 1450px) {
	.position-bar {
		margin-left: calc(50% - 702px);
	}
}
</style>
