<template>
	<v-row>
		<v-col cols="2">
			<!-- This sets the vocabulary used -->
			<v-combobox
				v-model="selectVocabulary"
				:items="acceptedVocabularies"
				:label="vocabularyLabel"
				outlined
				dense
				class="text-body-2"
				@change="changeValue()"
			></v-combobox>
		</v-col>
		<!-- If vocabulary is NOT CUSTOM -->
		<v-col v-if="!customVocabulary" cols="4">
			<v-combobox
				v-model="model"
				:items="comboboxItemsFormat"
				label="Data Format"
				outlined
				dense
				class="text-body-2 d-flex"
				item-color="white"
				@input="changeValue"
			>
				<template #selection="{ item }">
					<span class="d-flex align-center">
						{{ item }}
					</span>
				</template>
				<template #item="{ item }">
					<span class="d-flex align-center text-body-2 black--text">
						<span class="text-body-2"> {{ item }} </span>
					</span>
				</template>
			</v-combobox>
		</v-col>
		<v-col v-if="!customVocabulary" cols="6">
			<v-text-field
				v-model="modelURI"
				class="grey--text ml-1 text-body-2"
				label="URI"
				:disabled="!customVocabulary"
				outlined
				dense
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-1" small> mdi-close-circle </v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>
		<!----------------------------->

		<!-- If vocabulary IS CUSTOM -->
		<!-- Data Format -->
		<v-col v-if="customVocabulary" cols="4">
			<v-text-field
				v-model="model"
				label="Data Format"
				outlined
				dense
				class="grey--text ml-1 text-body-2"
				@input="changeValue"
			>
			</v-text-field>
		</v-col>
		<!-- URI -->
		<v-col v-if="customVocabulary" cols="6">
			<v-text-field
				v-model="modelURICustom"
				class="grey--text ml-1 text-body-2"
				label="URI"
				:disabled="!customVocabulary"
				outlined
				dense
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-2" small> mdi-close </v-icon>
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
	props: [
		'item',
		'field',
		'index',
		'vocabularyLabel',
		'textLabel',
		'acceptedVocabularies',
	],
	data() {
		return {
			model: '',
			modelURICustom: '',
			selectVocabulary: '',
			EDAMreversed,
		};
	},
	mounted() {
		this.selectVocabulary = this.item.vocabulary;
		this.model = this.item.term;
		this.modelURI = this.item.uri;
	},
	computed: {
		...mapGetters({
			vocabulariesItems: 'observatory/evaluation/metadata/getVocabulariesItems',
		}),

		customVocabulary() {
			if (this.acceptedVocabularies.includes(this.selectVocabulary)) {
				return false;
			} else {
				return true;
			}
		},
		comboboxItemsFormat() {
			if (this.acceptedVocabularies.includes(this.selectVocabulary)) {
				return this.vocabulariesItems[this.selectVocabulary].format;
			} else {
				return [];
			}
		},
	},
	methods: {
		closeEntry(index) {
			const payload = {
				field: this.field,
				index,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/removeEntry',
				payload
			);
		},
		changeValue() {
			let newValue;
			if (this.customVocabulary) {
				newValue = {
					id: this.id,
					term: {
						term: this.model,
						uri: this.modelURICustom,
						vocabulary: this.selectVocabulary,
					},
				};
			} else if (this.selectVocabulary === 'EDAM') {
				this.modelURI = this.EDAMreversed.format[this.model];
			} else {
				newValue = {
					id: this.id,
					term: {
						term: this.model,
						uri: this.modelURI,
						vocabulary: this.selectVocabulary,
					},
				};
			}

			this.$emit('changeEntry', this.index, newValue);
			this.$forceUpdate();
		},
	},
};
</script>
