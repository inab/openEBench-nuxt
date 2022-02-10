<template>
	<iframe :src="hostName + `stats`" width="100%" height="100%" frameborder="0">
	</iframe>
</template>

<script>
export default {
	name: 'ToolsStatisticsPage',
	layout: 'embedIframe',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Statistics',
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
