<template>
	<div class="item-not-found">
		<div class="illustration-item" align="center">
			<v-img :src="illustration" contain max-height="300" />
		</div>
		<div class="text-item" align="center">
			{{ text }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'ItemNotFound',
	props: {
		text: { type: String, require: false, default: 'Item not found' },
	},
	data() {
		return {
			illustration: require('~/static/images/illustrations/empty-state.svg'),
		};
	},
};
</script>
<style scoped>
.text-item {
	font-size: 20px;
}
</style>
