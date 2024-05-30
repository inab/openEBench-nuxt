<template>
	<v-row>
		<v-col cols="3">
			<v-combobox
				v-model="selectCategory"
				:items="CategoryItems"
				:label="vocabularyLabel"
				outlined
				dense
				class="text-body-2"
			></v-combobox>
		</v-col>
		<v-col cols="8">
			<v-text-field
				v-model="model"
				:label="textLabel"
				dense
				class="text-body-2"
				@input="changeValue"
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten" small> mdi-close-circle </v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: 'CategoryAndTextFieldDocumentation',
	props: [
		'item',
		'field',
		'id',
		'index',
		'vocabularyLabel',
		'typeLabel',
		'textLabel',
	],
	data() {
		return {
			model: '',
			selectCategory: null,
			CategoryItems: [
				'general',
				'readme',
				'tutorial',
				'FAQs',
				'examples of use cases',
				'installation guide',
				'build instructions',
				'API specification',
				'release policy',
				'contribution policy',
				'other',
			],
			formatItems: {
				null: [],
			},
			standard_format: false,
		};
	},
	mounted() {
		this.selectCategory = this.item.type;
		this.model = this.item.url;
	},
	methods: {
		changeValue() {
			const newValue = {
				id: this.id,
				term: {
					type: this.selectCategory,
					url: this.model,
				},
			};
			const payload = {
				field: this.field,
				index: this.index,
				value: newValue,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeEntry',
				payload
			);
		},
	},
};
</script>
