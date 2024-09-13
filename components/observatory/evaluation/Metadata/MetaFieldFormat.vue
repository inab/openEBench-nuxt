<template>
	<v-col :cols="n_cols">
		<v-row class="d-flex align-center mt-2">
			<HeaderAvatar
				:field="field"
				:field_name="title"
				:disabled_tooltip="true"
			/>
			<span id="title" class="text-body">{{ title }}</span>
			<v-btn v-if="increasable" icon @click="addEntry">
				<v-icon small color="grey lighten-1">mdi-plus-circle</v-icon>
			</v-btn>
		</v-row>

		<v-row v-for="(item, index) in value" :key="item.id">
			<CategoryAndTextFieldFormat
				:id="item.id"
				:item="item.term"
				:field="field"
				:index="index"
				:accepted-vocabularies="acceptedVocabularies"
				class="mt-2 ml-3"
				@remove="removeEntry(index)"
			/>
		</v-row>
	</v-col>
</template>

<script>
import CategoryAndTextFieldFormat from './CategoryAndTextFieldFormat.vue';
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaFieldFormat',
	components: {
		CategoryAndTextFieldFormat,
		HeaderAvatar,
	},
	props: {
		title: { type: String, required: true },
		n_cols: { type: String, required: true },
		field: { type: String, required: true },
		value: { type: Array, required: true },
		increasable: { type: Boolean, default: true },
		acceptedVocabularies: { type: Array, default: () => ['EDAM'] },
	},
	methods: {
		addEntry() {
			const payload = {
				field: this.field,
				value: {
					term: ' ',
					uri: '',
					vocabulary: 'EDAM',
				},
			};
			this.$store.dispatch('observatory/evaluation/metadata/addEntry', payload);
		},
		removeEntry(index) {
			const payload = {
				field: this.field,
				index,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/removeEntry',
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
