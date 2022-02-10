<template>
	<iframe
		:src="hostName + `about`"
		width="100%"
		height="100%"
		frameborder="0"
	/>
</template>

<script>
export default {
	name: 'AboutPage',
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
					text: 'About',
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
