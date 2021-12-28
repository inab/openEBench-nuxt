<template>
	<fragment>
		<v-container>
			<v-row column align="center" class="mt-10">
				<v-col align="left" xs="12" sm="8" offset-sm="2" offset-md="0" md="7">
					<h1 class="text-h4 mb-4">Welcome to OpenEBench</h1>
					<h2 class="text-subtitle-1 mb-5">
						The ELIXIR Technical Monitoring gateway to benchmarking communities,
						tools monitoring, and quality metrics.
					</h2>
					<v-row class="mt-10" align="end">
						<v-col align="center">
							<v-avatar color="primary" size="62" class="mb-10">
								<v-icon large dark>mdi-chart-bar</v-icon>
							</v-avatar>
							<p>
								As a Researcher I want to search for benchmarking communities
								and results
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
							<v-avatar color="secondary" size="62" class="mb-10">
								<v-icon large dark>mdi-binoculars</v-icon>
							</v-avatar>
							<p>
								As a Developer I want to learn how to develop sustainable
								research tools
							</p>
							<v-btn
								color="secondary"
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
					<v-img :src="require('~/static/images/stats.png')" contain />
				</v-col>
			</v-row>
		</v-container>
		<v-parallax
			class="mt-16 mb-16"
			height="250"
			dark
			src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
		>
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
		</v-parallax>
		<featureTeaser class="mt-16 mb-16" />
		<v-parallax
			height="150"
			class="mt-16 mb-16"
			src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
		>
			<v-container>
				<v-row align="center" justify="center" class="root">
					<v-col align="center" md="4">
						<div class="counter-item">
							<span class="icon ion-leaf" />
							<div class="text">
								<h4 class="text-h3">
									<animated-number :value="communityCount" />
								</h4>
								<h6 class="title">Communities</h6>
							</div>
						</div>
					</v-col>
					<v-col align="center" md="4">
						<div class="counter-item">
							<span class="icon ion-ios-lightbulb-outline" />
							<div class="text">
								<h4 class="text-h3">
									<animated-number :value="toolCount" />
								</h4>
								<h6 class="title">Tools</h6>
							</div>
						</div>
					</v-col>
					<v-col align="center" md="4">
						<div class="counter-item">
							<span class="icon ion-ios-world-outline" />
							<div class="text">
								<h4 class="text-h3 font-weight-normal">
									<animated-number :value="resourcesCount" />
								</h4>
								<h6 class="title">Resources</h6>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-parallax>
		<news-cards />
	</fragment>
</template>

<script>
import FeatureTeaser from '~/components/Landing/FeatureTeaser';
import AnimatedNumber from '~/components/Landing/AnimatedNumber';
import NewsCards from '~/components/Landing/NewsCards';

export default {
	name: 'IndexPage',
	components: { FeatureTeaser, AnimatedNumber, NewsCards },
	data() {
		return {
			communityCount: 8,
			toolCount: 21236,
			resourcesCount: 41184,
		};
	},
};
</script>
