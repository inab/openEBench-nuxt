<template>
	<iframe
		:src="hostName + `/scientific`"
		width="100%"
		height="100%"
		frameborder="0"
	>
	</iframe>
</template>

<script>
export default {
	name: 'ScientificBenchmarkingPage',
	layout: 'embedIframe',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
		};
	},
};
</script>
