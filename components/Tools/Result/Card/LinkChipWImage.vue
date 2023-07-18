<template>
	<v-chip
		small
		light
		outlined
		color="grey lighten-3"
		:text-color="colors[type]"
		class="pr-2 pl-1 mt-1"
		@click="openLink(link)"
	>
		<v-img
			height="20px"
			width="20px"
			contain
			class="ma-0"
			:src="icons[type]"
		></v-img>
		{{ text }}
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
	},
	data() {
		return {
			icons: {
				biotools: require('~/static/icons/elixir-logo-color.png'),
				bioconda: require('~/static/icons/bioconda-logo-color.png'),
				github: require('~/static/icons/github-logo-color.png'),
				bioconductor: require('~/static/icons/bioconductor-logo-color.png'),
				galaxy: require('~/static/icons/galaxy-logo-color.png'),
				toolshed: require('~/static/icons/galaxy-logo-color.png'),
				sourceforge: require('~/static/icons/sourceforge-logo-color.png'),
				bitbucket: require('~/static/icons/bitbucket-logo-color.png'),
				openebench: require('~/static/icons/OEB-minimal-logo-blue.png'),
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
		};
	},
	methods: {
		getColor(type) {
			return this.colors[type].color;
		},
		openLink(link) {
			window.open(link, '_blank');
		},
	},
};
</script>
