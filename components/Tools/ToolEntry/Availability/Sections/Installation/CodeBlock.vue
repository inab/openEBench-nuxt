<template>
	<div class="mt-4 mb-4 ml-4 pa-3 d-flex justify-space-between align-end code">
		<pre>{{ code }}</pre>
		<v-tooltip allow-overflow bottom>
			<template #activator="{ on }">
				<div>
					<v-icon
						class="mr-0 ml-3"
						small
						color="black"
						v-on="on"
						@click="copyClipboard()"
						@mouseleave="resetMessage()"
					>
						mdi-content-copy
					</v-icon>
				</div>
			</template>
			{{ tooltipMessage }}
		</v-tooltip>
	</div>
</template>
<script>
export default {
	name: 'CodeBlock',
	props: {
		code: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			tooltipMessage: 'Copy to clipboard',
		};
	},
	methods: {
		copyClipboard() {
			navigator.clipboard.writeText(this.code);
			this.tooltipMessage = 'Copied!';
		},
		resetMessage() {
			this.tooltipMessage = 'Copy to clipboard';
		},
	},
};
</script>
<style scoped>
pre {
	margin: 0;
	white-space: pre-wrap;
	word-break: break-all;
}

.code {
	background-color: #f5f5f5;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
	font-family: 'Courier New', Courier, monospace;
	font-size: 0.875rem;
	color: #333;
	display: inline-flex !important;
	min-width: 300px;
}
</style>
