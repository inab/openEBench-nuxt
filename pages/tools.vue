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
	layout: 'embedIframe',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			query: this.$route.query.search ? this.$route.query.search : '',
		};
	},
};
</script>
