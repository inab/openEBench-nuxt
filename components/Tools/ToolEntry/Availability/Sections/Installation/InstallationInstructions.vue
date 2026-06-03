<template>
	<v-row v-if="hasAnyInstallation" class="mt-2 pt-0 mb-2">
		<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
			<span class="text-subtitle d-flex align-center">
				<div class="title-label">Installation</div>
			</span>
		</v-col>
		<v-col
			cols="12"
			class="mt-0 pt-1 pb-0 mb-2 pl-4 d-flex justify-left text-body-2"
		>
			<v-tabs v-model="tabInstall" fixed-tabs color="#283593">
				<v-tab v-if="isThereBioconda()" class="tab">Bioconda</v-tab>
				<v-tab v-if="isThereBioconductor()" class="tab">Bioconductor</v-tab>
				<v-tab v-if="isThereSourceCode()" class="tab">Source Code</v-tab>
				<v-tab v-if="isThereDownload()" class="tab">Download</v-tab>
			</v-tabs>
		</v-col>
		<v-col cols="12" class="mt-1 pt-1 pb-0 mb-0 pl-8">
			<v-tabs-items v-model="tabInstall" class="text-body-2 ma-3 ml-8">
				<v-tab-item v-if="isThereBioconda()"
					><BiocondaInstall :name="tool.name"
				/></v-tab-item>
				<v-tab-item v-if="isThereBioconductor()"
					><BioconductorInstall :name="tool.name"
				/></v-tab-item>
				<v-tab-item v-if="isThereSourceCode()"
					><SourceCode
						:repositories="tool.repository"
						:sources-labels="tool.sources_labels"
				/></v-tab-item>
				<v-tab-item v-if="isThereDownload()">
					<DownloadBlock :packages="tool.download" />
				</v-tab-item>
			</v-tabs-items>
		</v-col>
	</v-row>
</template>
<script>
import { mapGetters } from 'vuex';
import BiocondaInstall from './BiocondaInstall.vue';
import BioconductorInstall from './BioconductorInstall.vue';
import SourceCode from './SourceCode.vue';
import DownloadBlock from './DownloadBlock.vue';

export default {
	name: 'InstallationInstructions',
	components: {
		BiocondaInstall,
		BioconductorInstall,
		SourceCode,
		DownloadBlock,
	},
	data() {
		return {
			tabInstall: 0,
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
		hasAnyInstallation() {
			return (
				this.isThereBioconda() ||
				this.isThereBioconductor() ||
				this.isThereSourceCode() ||
				this.isThereDownload()
			);
		},
	},

	methods: {
		isThereBioconda() {
			// return whether bioconda is key in sources_labels
			return Object.keys(this.tool.sources_labels).includes('bioconda');
		},
		isThereBioconductor() {
			// return whether bioconductor is key in sources_labels
			return Object.keys(this.tool.sources_labels).includes('bioconductor');
		},
		isThereSourceCode() {
			// return whether a repository in tool
			return this.tool.repository.length > 0;
		},
		isThereDownload() {
			// return whether a download link is available
			return this.tool.download.length > 0;
		},
	},
};
</script>
<style scoped>
.title-label {
	font-size: 1.2rem !important;
	color: rgba(0, 0, 0, 50%);
	font-weight: 500;
	margin-bottom: 8px;
}

::v-deep .v-tab {
	text-transform: none !important;
	font-size: 1rem !important;
	letter-spacing: normal !important;
	color: rgb(180, 175, 175) !important;
}
</style>
