<template>
	<div>
		<v-row justify="center" class="mb-1">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11" class="pt-0">
				<div class="mb-2 text-h4 text-center">The Software Observatory</div>
				<div class="mb-2 text-body-2 grey--text text-center">
					Trends. Analysis. FAIRness.
				</div>
			</v-col>

			<v-col md="10" sm="10" cols="10" lg="10" xl="10">
				<div class="mb-3 text-body-2 text-center">
					The Software Observatory enables users to analyze trends, evaluate
					software according to FAIR principles, and visualize data, promoting
					better development practices and adherence to FAIR standards.
				</div>
			</v-col>
		</v-row>

		<v-container :style="{ width: '90%' }">
			<v-row justify="space-around" class="mt-0">
				<v-col cols="2" class="d-flex align-start flex-column">
					<div class="text-h5">Get started ✨</div>
					<div class="text-body-2">
						Begin exploring with these essential features
					</div>
				</v-col>
				<v-col cols="3">
					<router-link to="/observatory/Evaluator" class="router-l">
						<v-card
							color="#F3F3F3"
							class="pt-0 pb-6 d-flex flex-column card-hover"
							height="100%"
							rounded="xl"
							elevation="3"
						>
							<v-img
								:src="illustration_evaluator"
								max-height="55%"
								contain
								class="ml-auto mr-auto mb-auto mt-auto pt-3"
							></v-img>
							<v-card-title class="card-title mb-0 pb-0 mt-1 pt-1 mr-0">
								Evaluate your tool
							</v-card-title>
							<v-card-text class="mt-0 pt-0 mb-0 pb-0">
								Assess the quality of your software and plan the next steps to
								make it even better.
							</v-card-text>
						</v-card>
					</router-link>
				</v-col>
				<v-col cols="3">
					<router-link to="/observatory/Trends" class="router-l">
						<v-card
							color="#F3F3F3"
							height="100%"
							class="pt-0 pb-6 d-flex flex-column card-hover"
							rounded="xl"
							elevation="3"
						>
							<v-img
								:src="illustration_collections"
								max-height="45%"
								contain
								class="ml-auto mr-auto mb-auto mt-auto pt-5"
							></v-img>
							<v-card-title class="card-title mt-0 pt-1 mb-0 pb-0">
								Explore Community Trends
							</v-card-title>
							<v-card-text class="mt-0 pt-0 mb-0 pb-0">
								Explore the state of different communities and projects'
								software.
							</v-card-text>
						</v-card>
					</router-link>
				</v-col>
				<v-col cols="3">
					<router-link to="/observatory/Data" class="router-l">
						<v-card
							color="#F3F3F3"
							height="100%"
							class="pt-0 pb-6 d-flex flex-column card-hover"
							rounded="xl"
							elevation="3"
						>
							<v-img
								:src="illustration_data"
								max-height="50%"
								contain
								class="ml-auto mr-auto mb-auto"
							></v-img>
							<v-card-title class="card-title mb-1 pb-0 mt-0 pt-1">
								Understand our data
							</v-card-title>
							<v-card-text class="mt-0 pt-0 mb-0 pb-0">
								Explore the contribution of the different research software
								sources.
							</v-card-text>
						</v-card>
					</router-link>
				</v-col>
			</v-row>
			<v-row class="mt-8">
				<v-tabs color="black" centered>
					<v-tab>Data</v-tab>
					<v-tab>Trends</v-tab>
					<v-tab>FAIR Evaluator</v-tab>
					<v-tab>About</v-tab>
				</v-tabs>
			</v-row>
		</v-container>
	</div>
</template>
<script>
export default {
	name: 'Observatory',
	layout: 'observatory',
	data() {
		return {
			illustration_evaluator: require(`@/static/illustrations/evaluator.svg`),
			illustration_data: require(`@/static/illustrations/data.svg`),
			illustration_collections: require(`@/static/illustrations/collections.svg`),
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
.router-l {
	text-decoration: none;
}

.card-hover {
	transition: transform 0.3s ease;
}

.card-hover:hover {
	transform: scale(1.05);
}

.card-title {
	font-size: 0.9em;
}
</style>
