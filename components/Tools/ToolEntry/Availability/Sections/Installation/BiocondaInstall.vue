<template>
	<div>
		This software is available in
		<a href="https://bioconda.github.io/" target="_black">Bioconda</a>. Install
		it with:
		<Code-block :code="code"></Code-block>
		Detailed installation instructions and how to set an environment
		<a href="https://mamba.readthedocs.io/en/latest/" target="_blank">here</a>.
	</div>
</template>
<script>
import CodeBlock from './CodeBlock.vue';

export default {
	name: 'BiocondaInstall',
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
			code: `mamba install -c bioconda ${this.name}`,
		};
	},
};
</script>
