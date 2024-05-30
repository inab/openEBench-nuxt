<template>
	<v-row justify="center" class="mb-4">
		<v-col cols="5">
			<v-card elevation="4" rounded="xl" class="pt-2 pb-7 pl-5 pr-5">
				<v-card-title class="text-h4"> Successfull installation </v-card-title>
				<v-row justify="space-between">
					<v-col cols="6" class="d-flex flex-column">
						<v-card-text class="text-subtitle subtitle">
							The
							<b>
								<a
									href="https://github.com/apps/oeb-fairsoft-evaluator"
									target="_blank"
								>
									OEB FAIRsoft Evaluator App
								</a>
							</b>
							can now access your repository's metadata.
						</v-card-text>
						<v-card-text class="text-subtitle subtitle">
							If you were importing metadata at the FAIR4S Evaluator, the
							importation will resume automatically.
						</v-card-text>
						<v-card-text class="text-subtitle subtitle">
							To go to the FAIR4S Evaluator, click the button below.
						</v-card-text>
						<v-btn
							class="align-self-center"
							small
							@click="$router.push({ name: 'home' })"
						>
							Go To FAIR4S Evaluator
						</v-btn>
					</v-col>
					<v-col cols="5">
						<v-img
							class="mt-7 mb-5"
							max-width="90%"
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
<style scoped>
.subtitle {
	font-size: 600 !important;
	font-family: Roboto, sans-serif;
}
</style>
