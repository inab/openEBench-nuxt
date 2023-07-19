<template>
	<v-card class="m-1 pa-2 rounded-lg" outlined elevation="1">
		<v-card-title class="mb-0 pb-0">
			<h3 class="text-subtitle-1"><a id="title">trimAl</a></h3>
			<v-spacer></v-spacer>
			<v-chip small label text-color="black" outlined>CMD</v-chip>
		</v-card-title>

		<v-card-text class="mb-0 mt-0 pt-1">
			<p class="text-caption mb-2">
				TrimAl is a bioinformatic tool that cleans multiple protein or
				nucleotide sequence alignment. The clean alignment (as a result of the
				TrimAl cleaning process) is used for phylogenetic reconstruction. TrimAl
				improves the quality of the reconstructed trees.
			</p>
			<div justify="center" class="mt-1">
				<span class="text-caption text-center subtitle">Topics: </span>
				<v-chip
					v-for="(item, i) in topics"
					:key="i"
					label
					small
					light
					color="grey lighten-3"
					class="mr-1 mt-1"
				>
					{{ item }}
				</v-chip>
			</div>
			<div justify="center" class="mt-2">
				<span class="text-caption text-center subtitle">Links: </span>
				<LinkChipWImage
					v-for="[key, value] in Object.entries(sources_labels)"
					:key="key"
					:link="value"
					:type="key"
					:text="key"
					light
					small
					class="mr-1"
				/>

				<LinkChipWIcon
					link="https://bio.tools/protk"
					icon="mdi-text-box-outline"
					text="Publication"
					color="grey darken-1"
					class="mr-1"
				/>

				<LinkChipWIcon
					link="https://bio.tools/protk"
					icon="mdi-web"
					text="Homepage"
					color="grey darken-1"
					class="mr-1"
				/>
			</div>
		</v-card-text>
	</v-card>
</template>
<script>
import LinkChipWImage from '~/components/Tools/Search/Card/LinkChipWImage.vue';
import LinkChipWIcon from '~/components/Tools/Search/Card/LinkChipWIcon.vue';

export default {
	name: 'ToolCard',
	components: {
		LinkChipWImage,
		LinkChipWIcon,
	},
	data() {
		return {
			sources_labels: {
				bioconda:
					'https://anaconda.org/bioconda/protk/1.4.4a/download/linux-64/protk-1.4.4a-hc9114bc_1.tar.bz2',
				biotools: 'https://bio.tools/protk',
				github:
					'https://github.com/iracooke/protk/archive/32669e1bcbcf72fe75212f95cfe9f149f4df19cc.tar.gz',
			},
			items: [
				{
					label: 'Homepage',
					uri: '',
					icon: 'mdi-home',
				},
				{
					label: 'Publication',
					uri: '',
					icon: 'mdi-file-outline',
				},
			],
			topics: [
				'Sequence analysis',
				'Sequencing',
				'Sequence sites, features and motifs',
			],
		};
	},
};
</script>
<style>
#title {
	font-weight: 700 !important;
}

.subtitle {
	font-weight: 700 !important;
}
</style>
