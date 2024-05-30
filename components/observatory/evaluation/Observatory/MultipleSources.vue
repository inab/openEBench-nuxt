<template>
	<div>
		<v-row :justify="justify">
			<v-col
				v-for="source in avatars_present"
				:key="source.label"
				cols="1"
				class="mr-1 ml-1"
			>
				<SourceAvatar
					:key="source.content"
					:avatar-props="source"
					:sources_labels="itemSources"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import SourceAvatar from './SourceAvatar.vue';

export default {
	name: 'MultipleSources',
	components: {
		SourceAvatar,
	},
	props: ['itemSources', 'justify'],
	data() {
		return {
			avatars: {
				biotools: {
					src: 'elixir-logo.svg',
					color: 'orange lighten-2',
					content: 'bio.tools',
					url: 'bio.tools',
					label: 'biotools',
				},
				bioconda: {
					src: 'bioconda-logo.svg',
					color: '#00550099',
					content: 'bioconda',
					url: '',
					label: 'bioconda',
				},
				github: {
					src: 'github-logo.svg',
					color: 'grey',
					content: 'GitHub',
					url: 'github.org',
					label: 'github',
				},
				bioconductor: {
					src: 'bioconductor-logo.svg',
					color: '#2f93ba99',
					content: 'Bioconductor',
					url: '',
					label: 'bioconductor',
				},
				galaxy: {
					src: 'galaxy-logo.svg',
					color: '#13479899',
					content: 'Galaxy Eu',
					url: '',
					label: 'galaxy',
				},
				toolshed: {
					src: 'galaxy-logo.svg',
					color: '#13479899',
					content: 'Galaxy Toolshed',
					url: '',
					label: 'galaxy',
				},
				sourceforge: {
					src: 'sourceforge-logo.svg',
					color: '#ff660299',
					content: 'SourceForge',
					url: '',
					label: 'sourceforge',
				},
				bitbucket: {
					src: 'bitbucket-logo.svg',
					color: '#005ed999',
					content: 'Bitbucket',
					url: '',
					label: 'bitbucket',
				},
				other: {
					src: 'other-logo.svg',
					color: '#53568299',
					content: 'Homepage',
					url: '',
					label: 'other',
				},
			},
		};
	},

	computed: {
		avatars_present() {
			// remove other since it is not really a source
			delete this.itemSources.other;
			const filtered = Object.keys(this.itemSources).reduce(
				(obj, key) => ({ ...obj, [key]: this.avatars[key] }),
				{}
			);
			return filtered;
		},
	},
};
</script>
