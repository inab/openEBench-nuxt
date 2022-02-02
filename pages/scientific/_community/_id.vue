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
		};
	},
};
</script>
