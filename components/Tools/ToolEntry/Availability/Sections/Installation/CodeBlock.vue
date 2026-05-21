<template>
	<div class="mt-4 mb-4 ml-4 pa-3 d-flex justify-space-between align-end code">
		<pre>{{ code }}</pre>
		<v-tooltip allow-overflow bottom>
			<template #activator="{ on }">
				<div>
					<v-icon
						class="mr-0 ml-auto"
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
