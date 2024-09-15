<template>
	<v-row>
		<v-col cols="2">
			<v-combobox
				v-model="selectVocabulary"
				:items="acceptedVocabularies"
				:label="vocabularyLabel"
				outlined
				dense
				class="text-body-2"
			></v-combobox>
		</v-col>

		<v-col v-if="!customVocabulary" cols="4">
			<v-combobox
				v-model="model"
				:items="comboboxItemsFormat"
				label="Data Format"
				outlined
				dense
				class="text-body-2 d-flex"
			></v-combobox>
		</v-col>

		<v-col v-if="!customVocabulary" cols="6">
			<v-text-field
				v-model="modelURI"
				:rules="[urlRule]"
				class="grey--text ml-1 text-body-2"
				label="URI"
				outlined
				dense
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-1" small>mdi-close-circle</v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>

		<v-col v-if="customVocabulary" cols="4">
			<v-text-field
				v-model="model"
				label="Data Format"
				outlined
				dense
				class="grey--text ml-1 text-body-2"
			></v-text-field>
		</v-col>

		<v-col v-if="customVocabulary" cols="6">
			<v-text-field
				v-model="modelURI"
				:rules="[urlRule]"
				class="grey--text ml-1 text-body-2"
				label="URI"
				outlined
				dense
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-2" small>mdi-close</v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { EDAMreversed } from './EDAM_forFE_reversed.js';

export default {
	name: 'CategoryAndTextFieldFormat',
	props: ['item', 'index', 'field', 'vocabularyLabel', 'acceptedVocabularies'],
	data() {
		return {
			model: '',
			modelURI: '',
			selectVocabulary: '',
			EDAMreversed,
			urlRule: (value) => {
				const urlPattern =
					/^(https?:\/\/)?([a-z\d.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/;
				return urlPattern.test(value) || 'Invalid URL';
			},
		};
	},
	computed: {
		...mapGetters({
			vocabulariesItems: 'observatory/evaluation/metadata/getVocabulariesItems',
		}),
		customVocabulary() {
			return !this.acceptedVocabularies.includes(this.selectVocabulary);
		},
		comboboxItemsFormat() {
			if (this.acceptedVocabularies.includes(this.selectVocabulary)) {
				return this.vocabulariesItems[this.selectVocabulary].format || [];
			}
			return [];
		},
	},
	watch: {
		selectVocabulary() {
			this.updateStore();
		},
		model() {
			if (this.selectVocabulary === 'EDAM') {
				this.modelURI = this.EDAMreversed.format[this.model];
			}
			this.updateStore();
		},
		modelURI() {
			this.updateStore();
		},
	},
	mounted() {
		this.initializeData();
	},
	methods: {
		initializeData() {
			this.selectVocabulary = this.item.vocabulary;
			this.model = this.item.term;
			this.modelURI = this.item.uri;
		},
		updateStore() {
			const payload = {
				field: this.field,
				index: this.index,
				value: {
					id: this.index,
					term: {
						term: this.model,
						uri: this.modelURI,
						vocabulary: this.selectVocabulary,
					},
				},
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeEntry',
				payload
			);
		},
	},
};
</script>
