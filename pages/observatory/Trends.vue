<template>
	<div class="mt-0 pt-0">
		<v-row justify="center">
			<v-col md="11" sm="11" cols="11" lg="11" xl="11">
				<div class="mb-3 text-h5">FAIRness Trends Analysis</div>
				<p style="line-height: 1.9" class="mb-2 mt-0">
					Explore trends in key aspects to the FAIRness of research software.
				</p>
			</v-col>
		</v-row>
		<v-row>
			<CollectionSelector />
		</v-row>
		<v-row class="mb-2" justify="center">
			<v-col md="12" sm="12" xs="12" lg="12" xl="12">
				<LicensesMain />
			</v-col>
		</v-row>
		<v-row justify="space-around">
			<v-col class="mr-2" md="6" sm="12" xs="12" lg="5" xl="5">
				<VersioningMain />
			</v-col>
			<v-col class="ml-2" md="6" sm="12" xs="12" lg="6" xl="6">
				<VersionControl />
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col class="mt-2" md="12" sm="12" xs="12" lg="11" xl="11">
				<PublicationsMain />
			</v-col>
		</v-row>
	</div>
</template>
<script>
import LicensesMain from '~/components/observatory/trends/licenses/LicensesMain.vue';
import VersioningMain from '~/components/observatory/trends/versioning/VersioningMain.vue';
import VersionControl from '~/components/observatory/trends/versionControl/VersionControl.vue';
import PublicationsMain from '~/components/observatory/trends/publications/PublicationsMain.vue';
import CollectionSelector from '~/components/observatory/CollectionSelector.vue';

export default {
	name: 'Trends',
	components: {
		LicensesMain,
		VersioningMain,
		VersionControl,
		PublicationsMain,
		CollectionSelector,
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
					disabled: false,
					exact: true,
					to: '/observatory',
				},
			],
		};
	},

	created() {
		this.$store.dispatch('observatory/trends/getLicensesSunburst', 'tools');
		this.$store.dispatch('observatory/trends/getLicensesOpenSource');
		this.$store.dispatch('observatory/trends/getSemanticVersioning');
		this.$store.dispatch('observatory/trends/getVersionControlCount');
		this.$store.dispatch('observatory/trends/getVersionControlRepositories');
		this.$store.dispatch('observatory/trends/getPublications');
	},

	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
