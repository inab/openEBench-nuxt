<template>
	<v-container>
		<h2 class="text-h4 mb-15">What does OpenEBench offer?</h2>
		<v-row column>
			<v-col v-if="$vuetify.breakpoint.mdAndUp" md="6">
				<v-img :src="illustration" contain max-height="350" />
			</v-col>
			<v-col
				class="d-flex flex-column justify-center"
				sm="12"
				offset-md="0"
				md="6"
			>
				<div class="text-h5 d-flex align-center">
					<v-icon color="accent" class="mr-3" x-large>mdi-check-circle</v-icon>
					Supporting community-driven benchmarking
				</div>
				<div class="text-h5 d-flex align-center mt-10">
					<v-icon color="accent" class="mr-3" x-large>mdi-check-circle</v-icon
					>Monitoring of software quality in life sciences
				</div>
				<div class="text-h5 d-flex align-center mt-10">
					<v-icon color="accent" class="mr-3" x-large>mdi-check-circle</v-icon
					>Contributing towards the adoption of best practices for research
					software development
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'WelcomeSection',
	data() {
		return {
			illustration: require('~/static/images/illustrations/404.svg'),
		};
	},
};
</script>
