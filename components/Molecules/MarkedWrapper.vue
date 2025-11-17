<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<v-container class="markup" v-html="markup"></v-container>
</template>
<script>
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
	name: 'MarkedWrapperComponent',
	props: {
		// eslint-disable-next-line vue/prop-name-casing
		markdown: {
			// eslint-disable-next-line vue/require-prop-type-constructor
			type: String,
			required: true,
		},
	},
	methods: {
		// Replace (#item1) → <a id="item1"></a>
		convertAnchors(md) {
			// Match all (#something) patterns that are *not part of a markdown link*
			// Negative lookbehind avoids touching [text](#itemX)
			return md.replace(
				/(?<!\[.*?)\(#([\w-]+)\)(?!\))/g,
				(_match, id) => `<a id="${id}"></a>`
			);
		},
	},
	computed: {
		markup() {
			const processed = this.convertAnchors(this.markdown);
			const html = marked(processed);
			return DOMPurify.sanitize(html);
		},
	},
};
</script>
<style lang="scss">
.markup {
	h2,
	h3 {
		margin-bottom: 8px;
	}

	p,
	ul {
		font-size: 0.875rem !important;
		font-weight: 400;
		line-height: 1.25rem;
		letter-spacing: 0.0178571429em !important;
	}

	ul {
		margin-bottom: 16px;
	}

	img {
		max-height: 80vh;
		max-width: 100%;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	table {
		display: block;
		width: 100%;
		width: max-content;
		max-width: 100%;
		overflow: auto;
		margin-bottom: 30px;
		border: solid 1px #ddeeee;
		border-collapse: collapse;
		border-spacing: 0;
		font-size: 12px;

		tbody td {
			border: solid 1px var(--v-primary-lighten5);
			padding: 10px;
		}
		thead th {
			background-color: var(--v-primary-lighten5);
			border: solid 1px var(--v-primary-lighten5);
			padding: 10px;
		}
	}
}
</style>
