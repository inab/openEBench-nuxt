<template>
	<div class="mt-0 pt-0 about-wrap">
		<v-row justify="center">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<div class="mb-3 text-h4">FAIRsoft Evaluator</div>

				<p class="text-body-1 mb-5">
					Assess the FAIRness of a software tool from its metadata. Load
					metadata from the Software Observatory, a GitHub repository, or a
					metadata file, then review it and compute FAIRsoft indicators.
				</p>

				<EvaluationStepper class="mt-5" />
			</v-col>
		</v-row>
	</div>
</template>
<script>
import EvaluationStepper from '~/components/observatory/evaluation/EvaluationStepper.vue';
export default {
	name: 'Evaluation',
	components: {
		EvaluationStepper,
	},
	layout: 'observatory',
	data() {
		return {
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: 'https://openebench.bsc.es/',
				},
				{
					text: 'Observatory',
					disabled: true,
					exact: true,
					to: '/observatory',
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>

<style scoped>
.about-wrap {
	max-width: 1080px !important;
}
</style>
