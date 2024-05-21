<template>
	<v-card outlined elevation="2" class="pb-8 pr-4 pl-4 pt-1">
		<h6 class="text-center mt-6">Versioning</h6>
		<p style="line-height: 1.8" class="mb-6 text-center card-content">
			Following a specific set of rules for naming software releases allows its
			inequivocal identification, which increases its
			<span class="highlight">Findability</span>,
			<span class="highlight">Reusability</span> and guarantees the
			<span class="highlight">Reproducibility</span> of research results.
		</p>
		<v-skeleton-loader
			v-if="$store.state.observatory.trends._unLoaded.semanticVersioning"
			class="mb-5 ml-10 mr-10"
			type="card-avatar"
		/>
		<VersioningPlot v-else />
		<p class="mt-2 mb-2 ml-8">
			<span class="highlight"> Instances using semantics versionings</span>
		</p>
		<v-alert
			elevation="0"
			icon="mdi-book-open-variant"
			border="left"
			dense
			color="#0b579f"
			colored-border
			height="38"
			class="mt-8 ml-4 mr-4"
		>
			<span class="alert-text">
				Specification of Semantic Versioning
				<a href="https://github.com/semver/semver">here</a></span
			>
		</v-alert>
	</v-card>
</template>
<script>
import VersioningPlot from './VersioningPlot.vue';

export default {
	name: 'VersioningMain',
	components: {
		VersioningPlot,
	},
};
</script>
<style scoped>
#plot {
	padding: 0%;
	margin: 0%;
}

#plot .modebar {
	display: none !important;
}

.highlight {
	color: #001752f8;
	font-weight: 500;
}
</style>
