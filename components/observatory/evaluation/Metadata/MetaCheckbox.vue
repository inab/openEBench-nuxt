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
			:label="label"
			:color="color"
			:value="item"
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
	props: ['item', 'field', 'label', 'title', 'n_cols', 'color'],
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
