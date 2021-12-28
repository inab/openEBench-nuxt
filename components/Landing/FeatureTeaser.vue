<template>
	<v-container>
		<h2 class="text-h4 mb-15">What does OpenEBench offer?</h2>

		<v-row>
			<v-col align="center" md="4">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon large dark>mdi-chart-bar</v-icon>
				</v-avatar>
				<h2 class="text-h6">Benchmarking</h2>
				<p class="body-1">
					Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
					consectetur.
				</p>
				<v-btn text color="primary" to="/scientificBenchmarking">
					Learn More
				</v-btn>
			</v-col>
			<v-col align="center" md="4">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon large dark>mdi-clipboard-list-outline</v-icon>
				</v-avatar>
				<h2 class="text-h6">Tool Metrics</h2>
				<p class="body-1">
					Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
					consectetur.
				</p>
				<v-btn text color="primary" to="/toolsMonitoring"> Learn More </v-btn>
			</v-col>
			<v-col align="center" md="4">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon large dark>mdi-binoculars</v-icon>
				</v-avatar>
				<h2 class="text-h6">Tool Observatory</h2>
				<p class="body-1">
					Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
					consectetur.
				</p>
				<v-btn text color="primary" to="/toolsObservatory"> Learn More </v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'FeatureTeaser',
};
</script>
