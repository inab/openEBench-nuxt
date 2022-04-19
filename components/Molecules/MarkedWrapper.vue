<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div class="markup" v-html="markup"></div>
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
<style lang="scss">
.markup > table {
	display: block;
	width: 100%;
	width: max-content;
	max-width: 100%;
	overflow: auto;
	margin-bottom: 30px;
}

.markup > table {
	border: solid 1px #ddeeee;
	border-collapse: collapse;
	border-spacing: 0;
	font-size: 12px;
}
.markup > table > thead th {
	background-color: var(--v-primary-lighten5);
	border: solid 1px var(--v-primary-lighten5);
	padding: 10px;
}
.markup > table > tbody td {
	border: solid 1px var(--v-primary-lighten5);
	padding: 10px;
}

.markup img {
	max-width: 100%;
}
</style>
