<template>
	<iframe
		:src="
			hostName +
			`scientific/` +
			$route.params.community +
			`/` +
			$route.params.id
		"
		width="100%"
		height="100%"
		frameborder="0"
		class="mt-5"
	>
	</iframe>
</template>

<script>
export default {
	name: 'CommunityParticipantPage',
	layout: 'embedIframeFullWidth',
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
					text: 'Benchmarking Communities',
					disabled: false,
					exact: true,
					to: '/scientific',
				},
				{
					text: this.$route.params.community,
					disabled: false,
					exact: true,
					to: './',
				},
				{
					text: this.$route.params.id,
					disabled: true,
					to: this.$route.params.id,
				},
			],
		};
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
	},
};
</script>
