<template>
	<div>
		<v-img :src="illustration" contain max-height="300" />
		<h2 class="mt-10 text-h4 text--secondary text-center">
			No benchmarking results yet...
		</h2>
		<h3 class="mt-5 text-h5 text--secondary text-center">
			Come back soon to see some benchmarking results.
		</h3>
	</div>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			illustration: require('~/static/images/illustrations/empty-state.svg'),
		};
	},
};
</script>
