<template>
	<div class="mt-3 ml-3">
		<h2 class="text-subtitle-2 primary--text">{{ title }}:</h2>

		<v-row class="mt-2 mb-5">
			<v-col md="12" lg="10">
				<pre class="block language-html ml-3 pt-4 pb-4 pr-8 pl-5">{{
					code
				}}</pre>
			</v-col>
			<v-col md="12" lg="2">
				<v-tooltip allow-overflow bottom>
					<template #activator="{ on }">
						<v-btn
							icon
							class="ml-2 mr-auto"
							color="primary"
							v-on="on"
							@click="copyClipboard()"
						>
							<v-icon small> mdi-content-copy </v-icon>
						</v-btn>
					</template>
					{{ tooltipMessage }}
				</v-tooltip>
			</v-col>
		</v-row>
		<v-snackbar v-model="snackbar">
			{{ text }}

			<template #action="{ attrs }">
				<v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
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
		title: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			tooltipMessage: 'Copy to clipboard',
			snackbar: false,
			text: 'Copied to clipboard',
		};
	},
	methods: {
		copyClipboard() {
			navigator.clipboard.writeText(this.code);
			this.snackbar = true;
		},
	},
};
</script>
<style>
.block {
	background-color: #f5f5f5 !important;
	font-size: small !important;
	padding: 10px !important;
	border-radius: 4px !important;
	overflow-x: auto !important;
}
</style>
