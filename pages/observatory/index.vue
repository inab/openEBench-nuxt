<template>
	<div>
		<!-- Shared content width wrapper -->
		<v-container class="overview-wrap">
			<!-- Header -->
			<v-row class="mb-2">
				<v-col cols="12" class="pt-0">
					<div class="text-h4 title-overview mb-3">
						The Software Observatory
					</div>

					<div class="text-body-1 mb-6">
						The Software Observatory aggregates and analyses research software
						metadata across the Life Sciences. It integrates records from
						multiple registries and repositories, resolves duplicates, enriches
						metadata where possible, and computes
						<span class="font-weight-bold">FAIRsoft</span> indicators to support
						trends analysis and software FAIRness assessment.
					</div>
				</v-col>
			</v-row>

			<!-- Get started -->
			<div class="text-h6">Get started ✨</div>
			<div class="text-body-2 mb-4">
				Begin exploring with these essential features
			</div>

			<v-row class="mt-1" dense>
				<!-- Evaluator -->
				<v-col cols="12" sm="6" md="3">
					<router-link to="/observatory/Evaluator" class="router-l">
						<v-card
							height="100%"
							class="pt-2 pb-4 d-flex flex-column card-hover"
							outlined
							rounded="lg"
							elevation="0"
						>
							<div class="icon-wrap">
								<v-icon large class="icon">mdi-flask-outline</v-icon>
							</div>

							<v-card-title class="card-title mb-0 pb-0 mt-1 pt-1">
								FAIRsoft Evaluator
							</v-card-title>
							<v-card-text class="mt-1 pt-0 mb-0 pb-0">
								Assess an individual tool, review its metadata, and export
								improvements in standard formats.
							</v-card-text>

							<div class="mt-auto pt-3 px-4">
								<span class="linkish">
									Open Evaluator <v-icon small>mdi-arrow-right</v-icon>
								</span>
							</div>
						</v-card>
					</router-link>
				</v-col>

				<!-- Trends -->
				<v-col cols="12" sm="6" md="3">
					<router-link to="/observatory/Trends" class="router-l">
						<v-card
							height="100%"
							class="pt-2 pb-4 d-flex flex-column card-hover"
							outlined
							rounded="lg"
							elevation="0"
						>
							<div class="icon-wrap">
								<v-icon large class="icon">mdi-trending-up</v-icon>
							</div>

							<v-card-title class="card-title mt-1 pt-1 mb-0 pb-0">
								Trends
							</v-card-title>
							<v-card-text class="mt-1 pt-0 mb-0 pb-0">
								Explore ecosystem and community practices over time: licensing,
								repositories, documentation, and more.
							</v-card-text>

							<div class="mt-auto pt-3 px-4">
								<span class="linkish">
									Go to Trends <v-icon small>mdi-arrow-right</v-icon>
								</span>
							</div>
						</v-card>
					</router-link>
				</v-col>

				<!-- Scoreboard -->
				<v-col cols="12" sm="6" md="3">
					<router-link to="/observatory/Scoreboard" class="router-l">
						<v-card
							height="100%"
							class="pt-2 pb-4 d-flex flex-column card-hover"
							outlined
							rounded="lg"
							elevation="0"
						>
							<div class="icon-wrap">
								<v-icon large class="icon">mdi-chart-box-outline</v-icon>
							</div>

							<v-card-title class="card-title mt-1 pt-1 mb-0 pb-0">
								FAIRness Scoreboard
							</v-card-title>
							<v-card-text class="mt-1 pt-0 mb-0 pb-0">
								See how collections perform across FAIRsoft indicators. Filter,
								compare, and share charts.
							</v-card-text>

							<div class="mt-auto pt-3 px-4">
								<span class="linkish">
									Open Scoreboard <v-icon small>mdi-arrow-right</v-icon>
								</span>
							</div>
						</v-card>
					</router-link>
				</v-col>

				<!-- Data -->
				<v-col cols="12" sm="6" md="3">
					<router-link to="/observatory/Data" class="router-l">
						<v-card
							height="100%"
							class="pt-2 pb-4 d-flex flex-column card-hover"
							outlined
							rounded="lg"
							elevation="0"
						>
							<div class="icon-wrap">
								<v-icon large class="icon">mdi-database-outline</v-icon>
							</div>

							<v-card-title class="card-title mb-0 pb-0 mt-1 pt-1">
								Data
							</v-card-title>
							<v-card-text class="mt-1 pt-0 mb-0 pb-0">
								Inspect metadata completeness, source coverage, and statistics
								across the integrated dataset.
							</v-card-text>

							<div class="mt-auto pt-3 px-4">
								<span class="linkish">
									Go to Data <v-icon small>mdi-arrow-right</v-icon>
								</span>
							</div>
						</v-card>
					</router-link>
				</v-col>
			</v-row>

			<v-divider class="my-8" />

			<div class="text-body-2">
				Learn more about the Observatory methodology, data sources, FAIRsoft
				indicators, and developer resources on the

				<router-link to="/observatory/About" class="linkish">
					About page </router-link
				>.
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'Overview',
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
/* Controls the “narrowness” + fixes the floating alignment feeling */
.overview-wrap {
	max-width: 1180px;
}

/* keep your title styling */
.title-overview {
	color: #0b579f;
}

.router-l {
	text-decoration: none;
}

/* soften hover to match OEB more */
.card-hover {
	transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card-hover:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 14px rgba(0, 0, 0, 8%);
}

.card-title {
	font-size: 0.95rem;
	font-weight: 600;
}

.icon-wrap {
	display: flex;
	align-items: center;
	padding: 16px 16px 0;
}

.icon {
	color: #0b579f;
}

.linkish {
	color: #0b579f;
	font-weight: 600;
	opacity: 0.95;
}
</style>
