<template>
	<iframe :src="hostName + `/tool`" width="100%" height="100%" frameborder="0">
	</iframe>
</template>

<script>
export default {
	name: 'ToolsMonitoringPage',
	layout: 'embedIframe',
	data() {
		return {
			hostName: 'http://' + window.location.hostname + ':4200',
		};
	},
};
</script>
