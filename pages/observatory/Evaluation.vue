<template>
	<div class="mt-0 pt-0">
		<v-row justify="center">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<div class="mb-3 text-h5">Welcome to the FAIRsoft Evaluator!</div>

				<p style="line-height: 2" class="mb-0 mt-0">
					Enhance the FAIRness of your software. Here’s how you can use our
					tool:
				</p>

				<ul style="line-height: 2; font-size: 0.9rem">
					<li>
						<strong style="color: #0b579f">Retrieve Metadata:</strong>
						Automatically pull data from either the Software Ecosystem database
						or your project’s GitHub repository.
					</li>
					<li>
						<strong style="color: #0b579f">Refine & Review</strong>: Easily
						adjust and verify the metadata to ensure accuracy.
					</li>
					<li>
						<strong style="color: #0b579f">Evaluate:</strong> Get instant
						FAIRsoft scores and see pass/fail results for each criterion to
						measure your software’s compliance.
					</li>
					<li>
						<strong style="color: #0b579f">Act:</strong> Export the metadata or
						citation for your software or directly improve the project by making
						a pull request on GitHub.
					</li>
				</ul>

				<p></p>

				<h6 class="mt-4">Ready to start?</h6>
				Follow the steps below! 👇

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
