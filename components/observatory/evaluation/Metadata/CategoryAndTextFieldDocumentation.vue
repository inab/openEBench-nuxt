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
				@change="changeValue"
			></v-combobox>
		</v-col>
		<v-col cols="8">
			<v-text-field
				v-model="model"
				:label="textLabel"
				dense
				class="text-body-2"
				:error-messages="urlErrorMessage"
				@input="onInputChange"
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
			urlErrorMessage: '',
		};
	},
	mounted() {
		this.selectCategory = this.item.type;
		this.model = this.item.url;
	},
	methods: {
		// Method to validate if the input is a valid URL
		validateUrl(url) {
			const urlPattern =
				/^(https?:\/\/)?([a-z\d.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/;
			return urlPattern.test(url);
		},
		onInputChange() {
			if (this.validateUrl(this.model)) {
				this.urlErrorMessage = ''; // Clear the error if URL is valid
				this.changeValue();
			} else {
				this.urlErrorMessage = 'Please enter a valid URL';
			}
		},
		changeValue() {
			const newValue = {
				id: this.id,
				term: {
					type: this.selectCategory, // Type updates when selectCategory changes
					url: this.model, // URL updates when model changes
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
