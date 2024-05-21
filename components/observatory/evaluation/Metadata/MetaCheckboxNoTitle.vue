<template>
	<v-checkbox
		:label="label"
		:color="color"
		:value="item"
		class="mt-6"
		@change="changeValue"
	>
	</v-checkbox>
</template>
<script>
export default {
	name: 'MetaCheckboxNoTitle',
	props: ['item', 'field', 'label', 'color'],
	methods: {
		changeValue() {
			const payload = {
				field: this.field,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeBooleanEntry',
				payload
			);
		},
	},
};
</script>
<style scoped>
#title {
	font-size: 1rem;
	color: #0b579f;
}
</style>
