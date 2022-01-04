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
		};
	},
};
</script>
