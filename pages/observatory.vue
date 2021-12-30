<template>
	<iframe
		:src="`https://observatory.openebench.bsc.es`"
		width="100%"
		height="100%"
		frameborder="0"
	>
	</iframe>
</template>

<script>
export default {
	name: 'ToolsObservatoryPage',
	layout: 'embedIframeFullWidth',
};
</script>
