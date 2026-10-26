<template>
	<v-container>
		<v-row column align="end">
			<v-col align="left" sm="12" offset-md="0" md="7">
				<h1 class="text-h3 mb-4 primary--text">Welcome to OpenEBench</h1>
				<h2 class="text-subtitle-1 mb-5">
					The ELIXIR gateway to benchmarking communities, software monitoring,
					and quality metrics for life sciences tools and workflows.
				</h2>
				<v-row class="mt-0 mt-lg-10" align="end">
					<v-col align="center">
						<v-avatar color="primary" size="62" class="mb-10">
							<v-icon dark>$vuetify.icons.values.benchmark</v-icon>
						</v-avatar>
						<p class="body-1">
							I want to search for benchmarking communities and results
						</p>
						<v-btn color="primary" class="mt-10" large block to="/benchmarking">
							Scientific Benchmarking
						</v-btn>
					</v-col>
					<v-col align="center" class="mt-10 mt-sm-0">
						<v-avatar color="accent" size="62" class="mb-10">
							<v-icon dark>$vuetify.icons.values.observatory</v-icon>
						</v-avatar>
						<p class="body-1">
							I want to see how to develop sustainable research tools
						</p>
						<v-btn color="accent" class="mt-10" large block to="/observatory">
							Tools Observatory
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col v-if="$vuetify.breakpoint.mdAndUp" md="5">
				<v-img :src="illustration" contain max-height="350" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'WelcomeSection',
	data() {
		return {
			illustration: require('~/static/images/illustrations/chart-person.svg'),
		};
	},
};
</script>
