<template>
	<div>
		<v-img :src="illustration" contain max-height="150" />
		<h3 class="api-error-msg">
			Looks like the server is taking to long to respond, please try again
			later.
		</h3>
	</div>
</template>
<script>
export default {
	name: 'ApiError',
	data() {
		return {
			illustration: require('~/static/images/illustrations/error.png'),
		};
	},
};
</script>
<style scoped>
.api-error-msg {
	padding-top: 40px;
	text-align: center;
}
</style>
