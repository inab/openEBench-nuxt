<template>
	<v-row justify="center" class="mb-8">
		<v-col cols="5">
			<v-card elevation="4" rounded="xl" class="pt-2 pb-7 pl-5 pr-5">
				<v-card-title class="text-h4"> Setup Complete </v-card-title>
				<v-row justify="space-between">
					<v-col cols="6" class="d-flex flex-column">
						<v-card-text>
							The
							<b>
								<a
									href="https://github.com/apps/oeb-fairsoft-evaluator"
									target="_blank"
								>
									FAIR Evaluator GitHub App
								</a>
							</b>
							can now access your repository's metadata
						</v-card-text>
						<v-card-text class="font-weight-medium">
							🚀 You can now import your repository's metadata at the
							<a href="/observatory/Evaluation" target="_blank">
								FAIR Evaluator</a
							>
						</v-card-text>

						<img
							class="mb-0 mt-auto"
							width="8%"
							:src="require('~/static/OEB-minimal-logo-light-blue.svg')"
						/>
					</v-col>
					<v-col cols="5">
						<v-img
							class="mt-7 mb-5"
							max-width="80%"
							:src="
								require('~/static/illustrations/undraw_well_done_re_3hpo.svg')
							"
						>
						</v-img>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
// This will work in both `<script setup>` and `<script>`
export default {
	name: 'PostGitHubAppInstall',
	layout: 'empty',
	data() {
		return {
			illustrationSrc: '~/static/illustrations/undraw_well_done_re_3hpo.svg',
		};
	},
};
</script>
