<template>
	<v-container>
		<h2 class="text-h4 mb-15">What can you do in OpenEBench?</h2>
		<v-row>
			<v-col align="center" cols="12" md="3">
				<feature-card to="benchmarking">
					<template #icon>
						<v-icon dark>$vuetify.icons.values.benchmark</v-icon>
					</template>
					<template #title> Benchmarks </template>
					<template #description
						>Explore existing community-driven scientific benchmark results for
						Life Sciences software</template
					>
				</feature-card>
			</v-col>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<feature-card to="tool">
					<template #icon>
						<v-icon large dark>mdi-clipboard-list-outline</v-icon>
					</template>
					<template #title> Tools & Metrics </template>
					<template #description
						>Individually browse technical metrics for popular research software
						in Life Sciences</template
					>
				</feature-card>
			</v-col>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<feature-card to="observatory">
					<template #icon>
						<v-icon dark>$vuetify.icons.values.observatory</v-icon>
					</template>
					<template #title> Tools Observatory </template>
					<template #description>
						Quantitative monitoring of the technical quality of software in Life
						Sciences</template
					>
				</feature-card>
			</v-col>
			<v-col align="center" cols="12" md="3" class="mt-10 mt-md-0">
				<feature-card to="projects">
					<template #icon>
						<v-icon dark>$vuetify.icons.values.projects</v-icon>
					</template>
					<template #title> Project Spaces </template>
					<template #description>
						Community spaces for projects to collaborate on software in life
						sciences</template
					>
				</feature-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import FeatureCard from '~/components/Cards/FeatureCard';

export default {
	name: 'FeatureTeaser',
	components: { FeatureCard },
};
</script>
