<template>
	<v-container fluid class="fill-height fill-width">
		<breadcrumbs-bar :items="breadcrumbs" />
		<iframe
			:src="hostName + `scientific/` + $route.params.community"
			width="100%"
			height="100%"
			frameborder="0"
			class="mt-5"
		/>
	</v-container>
</template>

<script>
import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';

export default {
	name: 'CommunityPage',
	components: {
		BreadcrumbsBar,
	},
	layout: 'embedIframeFullWidth',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			breadcrumbs: [
				{
					text: 'Dashboard',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Benchmarking Communities',
					disabled: false,
					exact: true,
					to: '/scientific',
				},
				{
					text: this.$route.params.community,
					disabled: true,
					to: this.$route.params.community,
				},
			],
		};
	},
};
</script>
