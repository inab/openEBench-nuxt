<template>
	<div class="mt-4" align="center">
		<v-img :src="illustration" contain max-height="300" />
		<h3 class="mt-10 text-h5 text-center">No {{ item }} available.</h3>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			illustration: require('~/static/images/illustrations/empty-state.svg'),
		};
	},
};
</script>
