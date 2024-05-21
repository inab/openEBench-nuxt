<template>
	<v-card outlined elevation="2" class="pr-8 pb-6">
		<v-row class="mb-0 pb-0" justify="center">
			<v-col md="11" lg="11" sm="10" xs="12" class="ml-8 mt-6 mb-pd-0">
				<h6 class="text-center mt-2">Licensing</h6>
				<p class="text-center card-content mb-0">
					Licensing is one of the most crucial features of a piece of software,
					determining both its <span class="highlight">Accessibility</span> and
					<span class="highlight">Reusability</span>.
				</p>
			</v-col>
		</v-row>

		<v-row class="mt-0 pt-0" justify="space-around" align="center">
			<v-col md="5" lg="5" sm="12" xs="12" class="pt-0">
				<v-skeleton-loader
					v-if="$store.state.observatory.trends._unLoaded.licensesSunburst"
					class="mb-5 ml-10 mr-10"
					type="card-avatar"
				/>
				<PlotLicensesPie v-else />
			</v-col>
			<v-col
				style="position: relative ml-10"
				md="7"
				lg="7"
				sm="12"
				xs="12"
				cols="12"
			>
				<v-skeleton-loader
					v-if="$store.state.observatory.trends._unLoaded.licensesOpenSource"
					class="mb-5 ml-10 mr-10"
					type="actions, card-avatar, list-item"
				/>

				<tabs-plot-info
					v-else
					:plot-component="PlotLicensesBars"
					:info-component="LicensesTable"
					caption="Distribution of main Open Source License families"
				>
				</tabs-plot-info>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import PlotLicensesPie from './PlotLicensesPie.vue';
import PlotLicensesBars from './PlotLicensesBars.vue';
import LicensesTable from './LicensesTable.vue';
import TabsPlotInfo from '~/components/observatory/TabsPlotInfo.vue';

export default {
	name: 'LicensesMain',
	components: {
		PlotLicensesPie,
		TabsPlotInfo,
	},
	data: () => ({
		PlotLicensesBars,
		LicensesTable,
	}),
};
</script>
<style scoped>
.card-content {
	font-size: 0.9em !important;
}
</style>
