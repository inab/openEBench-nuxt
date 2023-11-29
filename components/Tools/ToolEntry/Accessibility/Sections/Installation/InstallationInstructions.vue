<template>
	<v-row class="mt-0 pt-0 mb-2">
		<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
			<span class="text-subtitle d-flex align-center">
				<v-icon small color="black" class="mr-1"> mdi-tools </v-icon>
				Installation
			</span>
		</v-col>
		<v-col
			cols="12"
			class="mt-0 pt-1 pb-0 mb-0 pl-8 d-flex justify-left text-body-2"
		>
			<v-tabs v-model="tabInstall">
				<v-tab v-if="isThereBioconda()" class="tab">Bioconda</v-tab>
				<v-tab v-if="isThereBioconductor()" class="tab">Bioconductor</v-tab>
				<v-tab class="tab">Source Code</v-tab>
			</v-tabs>
		</v-col>
		<v-col cols="12" class="mt-2 pt-1 pb-0 mb-0 pl-8 d-flex justify-left">
			<v-tabs-items v-model="tabInstall" class="text-body-2 ma-3 ml-8">
				<v-tab-item v-if="isThereBioconda()"
					><BiocondaInstall :name="tool.name"
				/></v-tab-item>
				<v-tab-item v-if="isThereBioconductor()"
					><BioconductorInstall :name="tool.name"
				/></v-tab-item>
				<v-tab-item v-if="isThereSourceCode()"><SourceCode /></v-tab-item>
			</v-tabs-items>
		</v-col>
	</v-row>
</template>
<script>
import { mapGetters } from 'vuex';
import BiocondaInstall from './BiocondaInstall.vue';
import BioconductorInstall from './BioconductorInstall.vue';
import SourceCode from './SourceCode.vue';

export default {
	mame: 'InstallationInstructions',
	components: {
		BiocondaInstall,
		BioconductorInstall,
		SourceCode,
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
	},

	methods: {
		isThereBioconda() {
			// return whether bioconda is key in sources_labels
			return Object.keys(this.tool.sources_labels).includes('bioconda');
		},
		isThereBioconductor() {
			// return whether bioconductor is key in sources_labels
			return true;
			// return Object.keys(this.tool.sources_labels).includes('bioconductor');
		},
		isThereSourceCode() {
			// return whether a repository in tool
			return this.tool.repository.length > 0;
		},
	},
};
</script>
