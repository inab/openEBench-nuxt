<template>
	<v-col :cols="n_cols">
		<v-row class="d-flex align-center mt-2">
			<HeaderAvatar
				:field="field"
				:field_name="title"
				:disabled_tooltip="true"
			/>
			<span id="title" class="text-body">
				{{ title }}
			</span>
		</v-row>
		<v-checkbox
			v-model="localItem"
			:label="label"
			:color="color"
			class="mt-6"
			@change="changeValue"
		>
			<template #label>
				<span class="text-body-2 black--text">{{ label }}</span>
			</template>
		</v-checkbox>
	</v-col>
</template>

<script>
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaCheckbox',
	components: {
		HeaderAvatar,
	},
	props: {
		item: {
			type: Boolean,
			required: false,
			default: false,
		},
		field: String,
		label: String,
		title: String,
		n_cols: Number,
		color: String,
	},
	data() {
		return {
			localItem: this.item, // Initialize localItem with the prop value
		};
	},
	watch: {
		// Watch for changes in the prop and update the local value accordingly
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
