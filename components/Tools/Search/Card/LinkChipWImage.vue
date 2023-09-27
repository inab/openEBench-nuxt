<template>
	<v-chip
		v-if="type != 'other'"
		small
		light
		color="grey lighten-4"
		class="pl-1 mt-1"
		:class="style()"
		@click="openLink(link)"
	>
		<v-img
			height="20px"
			width="20px"
			contain
			class="ma-0"
			:src="icons[type]"
		></v-img>
		<span v-if="!minimal">{{ labels[text] }}</span>
	</v-chip>
</template>
<script>
export default {
	name: 'LinkChipWImage',
	props: {
		/**
		 * Link to redirect to when clicking on the chip
		 * */
		link: {
			type: String,
			required: true,
		},
		/**
		 * Type of chip. It will change the color and the image
		 * */
		type: {
			type: String,
			required: true,
		},
		/**
		 * Text to display on the chip
		 * */
		text: {
			type: String,
			required: true,
		},
		minimal: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	data() {
		return {
			icons: {
				biotools: require('~/static/icons/elixir-logo-black.png'),
				bioconda: require('~/static/icons/bioconda-logo-black.png'),
				github: require('~/static/icons/github-logo-black.png'),
				bioconductor: require('~/static/icons/bioconductor-logo-black.png'),
				galaxy: require('~/static/icons/galaxy-logo-black.png'),
				toolshed: require('~/static/icons/galaxy-logo-black.png'),
				sourceforge: require('~/static/icons/sourceforge-logo-black.png'),
				bitbucket: require('~/static/icons/bitbucket-logo-black.png'),
				openebench: require('~/static/icons/OEB-minimal-logo-black.png'),
				other: '',
			},
			colors: {
				biotools: 'orange lighten-2',
				bioconda: '#00550099',
				github: 'grey darken-1',
				bioconductor: '#2f93ba99',
				galaxy: '#13479899',
				toolshed: '#13479899',
				sourceforge: '#ff660299',
				bitbucket: '#005ed999',
				openebench: '#0b579f',
				other: '#53568299',
			},
			labels: {
				biotools: 'bio.tools',
				bioconda: 'Bioconda',
				github: 'GitHub',
				bioconductor: 'Bioconductor',
				galaxy: 'GalaxyEU',
				toolshed: 'Toolshed',
				sourceforge: 'Sourceforge',
				bitbucket: 'Bitbucket',
				openebench: 'OpenEBench',
				other: 'link',
			},
		};
	},
	methods: {
		getColor(type) {
			return this.colors[type].color;
		},
		openLink(link) {
			window.open(link, '_blank');
		},
		style() {
			if (this.minimal) {
				return 'pr-1';
			} else {
				return 'pr-2';
			}
		},
	},
};
</script>
