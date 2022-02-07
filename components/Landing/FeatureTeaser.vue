<template>
	<v-container>
		<h2 class="text-h4 mb-15">Learn more about OpenEBench</h2>
		<v-row>
			<v-col align="center" cols="12" md="4">
				<feature-card to="scientific">
					<template #icon>
						<v-icon dark>$vuetify.icons.values.benchmark</v-icon>
					</template>
					<template #title> Benchmarks </template>
					<template #description
						>Explore benchmarks of the scientific performance of bioinformatics
						methods</template
					>
				</feature-card>
			</v-col>
			<v-col align="center" cols="12" md="4" class="mt-10 mt-md-0">
				<feature-card to="tool">
					<template #icon>
						<v-icon large dark>mdi-clipboard-list-outline</v-icon>
					</template>
					<template #title> Tools & Metrics </template>
					<template #description
						>Individually browse metrics of bioinformatics tools, server and
						workflows</template
					>
				</feature-card>
			</v-col>
			<v-col align="center" cols="12" md="4" class="mt-10 mt-md-0">
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
