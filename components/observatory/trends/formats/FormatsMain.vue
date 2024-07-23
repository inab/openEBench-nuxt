<template>
	<v-card outlined elevation="2" class="pr-8 pb-6">
		<v-row class="mb-0 pb-0" justify="center">
			<v-col md="11" lg="11" sm="10" xs="12" class="ml-8 mt-6 mb-pd-0">
				<h6 class="text-center mt-4 mb-2">Input and output formats</h6>
				<p class="text--secondary text-center card-content mb-4">
					Using standard input and output formats is crucial for a software's
					<span class="highlight">Interoperability</span>.
				</p>
			</v-col>
		</v-row>
		<v-row class="mt-0 pt-0" justify="space-around" align="center">
			<v-col md="11" lg="11" sm="12" xs="12" class="pt-0">
				<v-skeleton-loader
					v-if="$store.state.observatory.trends._unLoaded.licensesSunburst"
					class="mb-5 ml-10 mr-10"
					type="card-avatar"
				/>
				<PlotFormatsParallel v-else />
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import PlotFormatsParallel from './PlotFormatsParallel.vue';

export default {
	name: 'FormatsMain',
	components: {
		PlotFormatsParallel,
	},
};
</script>
