<template>
	<div>
		This software is available in
		<a href="https://bioconductor.org/" target="_black">Bioconductor</a>. To
		install it, start R and enter:
		<Code-block :code="code"></Code-block>

		Detailed installation instructions can be found
		<a :href="biocUrl" target="_blank">here</a>. <br /><br />
		Instructions on how to install Bioconductor can be found
		<a href="https://bioconductor.org/install/" target="_blank">here</a>.
	</div>
</template>
<script>
import CodeBlock from './CodeBlock.vue';

export default {
	name: 'BioconductorInstall',
	components: {
		CodeBlock,
	},
	props: {
		name: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			code: `if (!require("BiocManager", quietly = TRUE)) \n \t install.packages("BiocManager"\n\nBiocManager::install(c("${this.name}"))`,
			biocUrl: `https://bioconductor.org/packages/release/bioc/html/${this.name}.html`,
		};
	},
};
</script>
