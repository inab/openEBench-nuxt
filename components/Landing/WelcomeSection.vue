<template>
	<v-container>
		<v-row column align="end">
			<v-col align="left" xs="12" sm="8" offset-sm="2" offset-md="0" md="7">
				<h1 class="text-h3 mb-4 primary--text">Welcome to OpenEBench</h1>
				<h2 class="text-subtitle-1 mb-5">
					The ELIXIR gateway to benchmarking communities, software monitoring,
					and quality metrics for life sciences tools and workflows.
				</h2>
				<v-row class="mt-10" align="end">
					<v-col align="center">
						<v-avatar color="primary" size="62" class="mb-10">
							<v-icon large dark>mdi-chart-bar</v-icon>
						</v-avatar>
						<p>
							As a Researcher I want to search for benchmarking communities and
							results
						</p>
						<v-btn
							color="primary"
							class="mt-10"
							large
							block
							to="scientificBenchmarking"
						>
							Scientific Benchmarking
						</v-btn>
					</v-col>
					<v-col align="center">
						<v-avatar color="accent" size="62" class="mb-10">
							<v-icon large dark>mdi-telescope</v-icon>
						</v-avatar>
						<p>
							As a Developer I want to learn how to develop sustainable research
							tools
						</p>
						<v-btn
							color="accent"
							class="mt-10"
							large
							block
							to="toolsObservatory"
						>
							Tools Observatory
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col v-if="$vuetify.breakpoint.mdAndUp" md="5">
				<v-img
					:src="require('~/static/images/illustrations/chart-person.png')"
					contain
					max-height="350"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default { name: 'WelcomeSection' };
</script>
