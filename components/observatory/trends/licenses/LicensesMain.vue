<template>
	<v-card outlined elevation="2" class="pr-8 pb-6">
		<PlotWOptions class="copy-icon" :items="dialogItems" />
		<v-row class="mt-2 pt-0" justify="center">
			<v-col md="11" lg="11" sm="10" xs="12" class="mt-0 pt-1">
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
				<PlotLicensesPie
					v-else
					:labels="sunburstLabels"
					:parents="sunburstParents"
					:values="sunburstValues"
					:text="sunburstText"
				/>
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

				<PlotLicensesBars
					v-else
					:counts_permissive="countsPermissive"
					:licenses_permissive="licensesPermissive"
					:counts_copyleft="countsCopyleft"
					:licenses_copyleft="licensesCopyleft"
					:counts_data="countsData"
					:licenses_data="licensesData"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import PlotLicensesPie from './PlotLicensesPie.vue';
import PlotLicensesBars from './PlotLicensesBars.vue';
import PlotWOptions from '~/components/observatory/PlotWOptions.vue';
import { embedCodes } from '~/components/observatory/visualizations/embedCodes.js'; // Import the embed codes

export default {
	name: 'LicensesMain',
	components: {
		PlotWOptions,
		PlotLicensesPie,
		PlotLicensesBars,
	},
	data: () => ({
		dialogItems: [embedCodes.licensesPie, embedCodes.licensesBar],
	}),
	computed: {
		...mapGetters('observatory/trends', {
			data_licenses_sunburst: 'LicensesSunburst',
			data_licenses_open: 'LicensesOpenSource',
		}),
		// Sunburst data
		sunburstLabels() {
			return this.data_licenses_sunburst.ids;
		},
		sunburstParents() {
			return this.data_licenses_sunburst.parents;
		},
		sunburstValues() {
			return this.data_licenses_sunburst.v;
		},
		sunburstText() {
			return this.data_licenses_sunburst.text;
		},

		// Bar data
		countsPermissive() {
			return this.data_licenses_open.counts_permissive;
		},
		licensesPermissive() {
			return this.data_licenses_open.licenses_permissive;
		},
		countsCopyleft() {
			return this.data_licenses_open.counts_copyleft;
		},
		licensesCopyleft() {
			return this.data_licenses_open.licenses_copyleft;
		},
		countsData() {
			return this.data_licenses_open.counts_data;
		},
		licensesData() {
			return this.data_licenses_open.licenses_data;
		},
	},
};
</script>
<style scoped>
.card-content {
	font-size: 0.9em !important;
}

.copy-icon {
	position: absolute;
	top: 5px;
	right: 10px;
}
</style>
