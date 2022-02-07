<template>
	<v-container>
		<h2 class="text-h4 mb-15">What does OpenEBench offer?</h2>

		<v-row>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon dark>$vuetify.icons.values.benchmark</v-icon>
				</v-avatar>
				<h2 class="text-h6">Benchmarks</h2>
				<p class="body-1">
					Explore benchmarks of the scientific performance of bioinformatics
					methods
				</p>
				<v-btn text color="primary" to="/scientific"> Learn More </v-btn>
			</v-col>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon large dark>mdi-clipboard-list-outline</v-icon>
				</v-avatar>
				<h2 class="text-h6">Tools & Metrics</h2>
				<p class="body-1">
					Individually browse metrics of bioinformatics tools, server and
					workflows
				</p>
				<v-btn text color="primary" to="/tool"> Learn More </v-btn>
			</v-col>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon dark>$vuetify.icons.values.observatory</v-icon>
				</v-avatar>
				<h2 class="text-h6">Software Observatory</h2>
				<p class="body-1">
					Quantitative monitoring of the technical quality of software in Life
					Sciences
				</p>
				<v-btn text color="primary" to="/observatory"> Learn More </v-btn>
			</v-col>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<v-avatar color="primary" size="62" class="mb-10">
					<v-icon dark>$vuetify.icons.values.projects</v-icon>
				</v-avatar>
				<h2 class="text-h6">Project Spaces</h2>
				<p class="body-1">
					Community spaces for projects to collaborate on software in Life
					Sciences
				</p>
				<v-btn text color="primary" to="/"> Learn More </v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'FeatureTeaser',
};
</script>
