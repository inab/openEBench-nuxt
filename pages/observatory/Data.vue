<template>
	<div>
		<v-row justify="center" class="mb-4">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<div class="mb-2 text-h5">
					Data integration at the Software Observatory
				</div>
			</v-col>
			<!--v-col cols="6">
				<p style="line-height: 1.9" class="mb-0 mt-0">
					Our system periodically pulls metadata from
					<strong>eight diverse sources</strong>, enriched further with dynamic
					data on repository activity, website availability, and trends in
					publication citations. Each piece of metadata entering our system
					undergoes a harmonization process, ensuring consistency across diverse
					data types and sources. <br /><br />
					On this page, you can <strong>visualize the integration</strong>: dive
					into our database and see firsthand the scope of each source's
					contribution, the comprehensive depth of metadata, and the overlaps
					that characterize our dataset.
				</p>
			</v-col-->

			<!--v-col align="center" cols="5">
				<v-img :src="illustration" contain max-width="400" />
			</v-col-->
		</v-row>
		<v-row>
			<CollectionSelector />
		</v-row>

		<v-row class="mb-5" justify="center">
			<v-col xl="11" lg="11" md="11" sm="11" cols="12">
				<v-card elevation="0" class="mt-4 pb-5 pt-1 card-main">
					<MainCards />
				</v-card>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col xl="11" lg="12" md="12" sm="12" cols="12">
				<v-card
					outlined
					elevation="2"
					class="pt-1 mt-4 mb-3"
					:class="{ 'plot-card': !small, 'plot-card-small': small }"
				>
					<h6 class="text-center mt-6 mb-2">
						Consolidated Research Software (meta)data
					</h6>
					<v-row class="mt-0" justify="center">
						<v-col xl="9" lg="11" md="12" sm="12" cols="12">
							<v-skeleton-loader
								v-if="$store.state.observatory.data._unLoaded.features"
								class="mb-5 ml-10 mr-10"
								type="card"
							/>
							<PlotOverview v-else />
						</v-col>
						<v-col xl="3" lg="10" md="10" sm="10" cols="10" justify-self="left">
							<p class="mb-2">
								<span class="highlight"
									>Features obtained from the different software metadata
									sources and total number of software for which each feature
									exists in the dataset.</span
								>
							</p>
							<p class="mb-6">
								Colored dots indicate the presence of each metadata feature in
								the corresponding source. <br />
								Bars represent the actual number of retrieved metadata records
								per feature. Differences in counts reflect variation in the
								completeness of metadata annotations across sources.
							</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col xl="11" lg="12" md="12" sm="12" cols="12">
				<v-card
					outlined
					elevation="2"
					class="pr-8 pt-1 mb-3"
					:class="{ 'plot-card': !small, 'plot-card-small': small }"
				>
					<h6 class="text-center mt-6 mb-2">Coverage</h6>
					<v-row align="center" class="mt-0" justify="space-around">
						<v-col xl="8" lg="8" md="12" sm="12" cols="12">
							<v-skeleton-loader
								v-if="$store.state.observatory.data._unLoaded.coverageSources"
								class="mb-5 ml-10 mr-10"
								type="card"
							/>

							<PlotSources v-else :small="small" />
						</v-col>
						<v-col xl="4" lg="4" md="11" sm="11" cols="12">
							<p class="mb-2">
								<span class="highlight">
									Cumulative distribution of the number of sources in which
									metadata for individual software are found (yellow).
								</span>
							</p>
							<p class="mb-6">
								The stacked bars show the contribution of each source to the
								total number of software metadata records. Sources used to
								discover software and build the initial metadata collection are
								shown in shades of green, while those used to enrich this
								collection are shown in shades of red. OpenEBench is an
								exception: although it belongs to the latter group, it is also
								displayed in red.
							</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col xl="6" lg="6" md="6" sm="12" cols="12">
				<v-card
					outlined
					elevation="2"
					class="pr-5 pr-6"
					:class="{ 'plot-card': !small, 'plot-card-small': small }"
				>
					<h6 class="text-center mt-6 mb-2">(Meta)data completeness</h6>
					<v-row align="center" class="mt-0 mb-0 pb-0" justify="space-around">
						<v-col xl="12" lg="12" md="12" sm="12" cols="12">
							<v-skeleton-loader
								v-if="$store.state.observatory.data._unLoaded.completeness"
								class="mb-5 ml-10 mr-10"
								type="card"
							/>
							<CompletenessPlot v-else />
						</v-col>

						<v-col xl="12" lg="12" md="12" sm="12" cols="12" class="mb-0 pb-0">
							<p class="mb-2">
								<span class="highlight">
									Distribution of number of features collected on individual
									software.
								</span>
							</p>
							<p class="mb-0 pb-0">
								The higher the number of features for a software, the more
								information gathered about that software.
							</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col xl="6" lg="6" md="6" sm="12" cols="12" align-self="start">
				<v-card
					outlined
					elevation="2"
					class="pr-5 pb-3 ml-4"
					:class="{ 'plot-card': !small, 'plot-card-small': small }"
				>
					<h6 class="text-center mt-6 mb-2">Types of software</h6>
					<v-row align="center" class="mt-0" justify="space-around">
						<v-col xl="12" lg="12" md="12" sm="12" cols="12">
							<v-skeleton-loader
								v-if="$store.state.observatory.data._unLoaded.types"
								class="mb-5 ml-10 mr-10"
								type="card"
							/>
							<PlotTypes v-else />
						</v-col>
						<v-col xl="12" lg="12" md="12" sm="12" cols="12" align-self="start">
							<p class="mb-2">
								<span class="highlight"
									>Distribution of the types of software in the
									collection.</span
								>
							</p>
							<p class="mb-6">
								Research Software may be implemented or accessed in different
								ways via web interface, REST API, command line, workflow, etc.
							</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import CollectionSelector from '~/components/observatory/CollectionSelector';
import MainCards from '~/components/observatory/data/CountCards/MainCards';
import PlotOverview from '~/components/observatory/data/PlotOverview';
import PlotSources from '~/components/observatory/data/PlotSources';
import CompletenessPlot from '~/components/observatory/data/CompletenessPlot';
import PlotTypes from '~/components/observatory/data/PlotTypes';

export default {
	name: 'Data',
	components: {
		CollectionSelector,
		MainCards,
		PlotOverview,
		PlotSources,
		CompletenessPlot,
		PlotTypes,
	},
	layout: 'observatory',
	data() {
		return {
			illustration: require(`@/static/observatory_illustration_5.svg`),
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
	computed: {
		small() {
			return this.$vuetify.breakpoint.smAndDown;
		},
	},
	created() {
		this.$store.dispatch('observatory/data/getCountsPerSource');
		this.$store.dispatch('observatory/data/getTotalCount');
		this.$store.dispatch('observatory/data/getFeatures');
		this.$store.dispatch('observatory/data/getCoverageSources');
		this.$store.dispatch('observatory/data/getCompleteness');
		this.$store.dispatch('observatory/data/getTypes');
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
<style scoped>
.card-main {
	background-color: #fafafa;
	margin: auto;
}

.plot-card {
	padding-left: 3em;
	padding-right: 3em;
	padding-bottom: 3em;
}

.plot-card-small {
	padding-left: 1em;
	padding-right: 1em;
	padding-bottom: 1em;
}
</style>
