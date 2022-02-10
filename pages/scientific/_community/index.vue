<template>
	<v-container fluid class="fill-height fill-width">
		<iframe
			:src="hostName + `scientific/` + $route.params.community"
			width="100%"
			height="100%"
			frameborder="0"
		/>
	</v-container>
</template>

<script>
export default {
	name: 'CommunityPage',
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
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
