<template>
	<iframe :src="URI" width="100%" height="100%" frameborder="0"> </iframe>
</template>

<script>
export default {
	name: 'ToolsObservatoryPage',
	layout: 'embedIframeFullWidth',
	data() {
		return {
			URI: this.$config.OBSERVATORY_URI,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Observatory',
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
