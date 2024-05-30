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
		<v-combobox
			v-model="selectedItem"
			:items="registries"
			label=""
			multiple
			chips
			deletable-chips
			dense
			class="text-body mt-6"
			@change="changeValue"
		>
		</v-combobox>
	</v-col>
</template>
<script>
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaRegistriesCombo',
	components: {
		HeaderAvatar,
	},
	props: ['selected', 'field', 'title', 'n_cols', 'registries'],
	data() {
		return {
			selectedItem: [],
		};
	},
	mounted() {
		this.selectedItem = this.selected;
	},
	methods: {
		changeValue() {
			const payload = {
				field: this.field,
				value: this.selectedItem,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/updateSelectorEntry',
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
