<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-html="markup"></div>
</template>
<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
	name: 'MarkedWrapperComponent',
	props: {
		// eslint-disable-next-line vue/prop-name-casing
		markdown: {
			type: String,
			required: true,
		},
	},
	computed: {
		markup() {
			return DOMPurify.sanitize(marked(this.markdown));
		},
	},
};
</script>
