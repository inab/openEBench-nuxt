<template>
	<v-parallax height="250" dark :src="gradient">
		<v-container>
			<v-row align="center" justify="center">
				<v-col class="text-center" cols="12">
					<h2 class="text-h4 font-weight-thin mb-3 mt-4">
						Browse Tools and Metrics
					</h2>
					<h3 class="text-subtitle-2">
						Essential scientific information, github statistics, and metrics
						about tools, databases and services for bioinformatics and the life
						sciences.
					</h3>
				</v-col>
				<v-col cols="12" sm="8">
					<v-text-field
						label="Search for Tools"
						outlined
						clearable
						dark
					></v-text-field>
				</v-col>
			</v-row>
		</v-container>
	</v-parallax>
</template>

<script>
import gradient from '~/static/images/gradient_parallax.jpg';

export default {
	name: 'HeroSearchbar',
	data: () => ({
		gradient,
	}),
};
</script>
