<template>
	<v-container>
		<h1 class="text--h3">OpenEBench Collaboration</h1>
	</v-container>
</template>

<script>
export default {
	name: 'AboutPage',
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
					text: 'Collaboration',
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
