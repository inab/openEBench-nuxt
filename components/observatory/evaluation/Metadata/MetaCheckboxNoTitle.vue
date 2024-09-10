<template>
	<v-checkbox
		v-model="localItem"
		:label="label"
		:color="color"
		class="mt-6"
		@change="changeValue"
	>
	</v-checkbox>
</template>

<script>
export default {
	name: 'MetaCheckboxNoTitle',
	props: {
		item: {
			type: Boolean,
			required: true,
		},
		field: String,
		label: String,
		color: String,
	},
	data() {
		return {
			localItem: this.item, // Initialize localItem with the prop value
		};
	},
	watch: {
		// Watch for changes in the item prop and update the localItem accordingly
		item(newVal) {
			this.localItem = newVal;
		},
	},
	methods: {
		changeValue() {
			const payload = {
				field: this.field,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeBooleanEntry',
				payload
			);
			this.$emit('update:item', this.localItem); // Emit event to parent
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
