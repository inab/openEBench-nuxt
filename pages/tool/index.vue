<template>
	<iframe
		:src="hostName + `tool?search=` + query"
		width="100%"
		height="100%"
		frameborder="0"
	>
	</iframe>
</template>

<script>
export default {
	name: 'ToolsMonitoringPage',
	layout: 'embedIframeFullWidth',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			query: this.$route.query.search ? this.$route.query.search : '',
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Tools',
					disabled: true,
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
