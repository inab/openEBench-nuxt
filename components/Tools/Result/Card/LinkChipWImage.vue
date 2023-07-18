<template>
	<v-chip
		small
		light
		outlined
		:link="link"
		:color="getColor(type)"
		:text-color="getColor(type)"
		class="pr-2 pl-1"
		@click="openLink(link)"
	>
		<v-img height="20px" width="20px" contain class="ma-0" :src="src"></v-img>
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
		 * Image to display on the chip
		 * */
		src: {
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
			types: {
				biotools: {
					src: '~/static/icons/elixir-logo.png',
					color: 'orange lighten-2',
					text: 'bio.tools',
				},
				bioconda: {
					src: '~/static/icons/bioconda-logo.png',
					color: '#00550099',
					text: 'Bioconda',
				},
				github: {
					src: '~/static/icons/github-logo.png',
					color: 'grey',
					text: 'GitHub',
				},
				bioconductor: {
					src: '~/static/icons/bioconductor-logo.png',
					color: '#2f93ba99',
					text: 'Bioconductor',
				},
				galaxy: {
					src: '~/static/icons/galaxy-logo.png',
					color: '#13479899',
					text: 'Galaxy Eu',
				},
				toolshed: {
					src: '~/static/icons/galaxy-logo.png',
					color: '#13479899',
					text: 'Galaxy Toolshed',
				},
				sourceforge: {
					src: '~/static/icons/sourceforge-logo.png',
					color: '#ff660299',
					text: 'SourceForge',
				},
				bitbucket: {
					src: '~/static/icons/bitbucket-logo.png',
					color: '#005ed999',
					text: 'Bitbucket',
				},
				openebench: {
					src: '~/static/icons/openebench-logo.png',
					color: '#0b579f',
					text: 'OpenEBench',
				},
				other: {
					src: '~/static/icons/other-logo.png',
					color: '#53568299',
					text: 'Homepage',
				},
			},
		};
	},
	methods: {
		getColor(type) {
			return this.types[type].color;
		},
		getSrc(type) {
			return this.types[type].src;
		},
		openLink(link) {
			window.open(link, '_blank');
		},
	},
};
</script>
