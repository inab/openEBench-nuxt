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
				@change="changeValue"
			></v-combobox>
			<!----------------------------------->
		</v-col>
		<!-- If vocabulary is NOT CUSTOM -->
		<v-col v-if="!customVocabulary" cols="4">
			<v-combobox
				v-model="model"
				:items="comboboxItems"
				:label="textLabel"
				outlined
				dense
				class="text-body-2"
				item-color="white"
				@input="changeValue"
				@change="changeValue"
			>
				<template #selection="{ item }">
					<span class="black--text text-body-2">
						{{ item }}
						<span class="grey--text ml-1 text-body-2"> </span>
					</span>
				</template>
				<template #item="{ item }">
					<span class="black--text text-body-2">
						{{ item }}
						<span class="grey--text ml-1 text-body-2"></span>
					</span>
				</template>
			</v-combobox>
		</v-col>
		<v-col v-if="!customVocabulary" cols="6">
			<v-text-field
				v-model="modelURI"
				:error-messages="uriErrorMessage"
				class="grey--text ml-1 text-body-2"
				label="URI"
				outlined
				dense
				@input="onURIChange"
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-1" small> mdi-close-circle </v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>
		<!----------------------------->

		<!-- If vocabulary is CUSTOM -->
		<v-col v-if="customVocabulary" cols="4">
			<v-text-field
				v-model="model"
				:label="textLabel"
				outlined
				dense
				class="text-body-2"
				item-color="white"
				@input="changeValue"
				@change="changeValue"
			/>
		</v-col>
		<v-col v-if="customVocabulary" cols="6">
			<v-text-field
				v-model="modelURI"
				:error-messages="uriErrorMessage"
				class="grey--text ml-1 text-body-2"
				label="URI"
				:disabled="!customVocabulary"
				outlined
				dense
				@input="onURIChange"
			>
				<template #append-outer>
					<v-btn icon @click="$emit('remove')">
						<v-icon color="grey lighten-2" small> mdi-close </v-icon>
					</v-btn>
				</template>
			</v-text-field>
		</v-col>
		<!----------------------------->
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { EDAMreversed } from './EDAM_forFE_reversed.js';

export default {
	name: 'CategoryAndTextField',
	// typeLabel is 'format', 'topic', 'datatype' or 'operation'.
	// It is the kind of term in EDAM
	props: [
		'item',
		'field',
		'index',
		'vocabularyLabel',
		'typeLabel',
		'id',
		'textLabel',
		'acceptedVocabularies',
	],
	data() {
		return {
			model: '',
			selectVocabulary: '',
			modelURICustom: '',
			EDAMreversed,
			uriErrorMessage: '',
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

		comboboxItems() {
			if (this.acceptedVocabularies.includes(this.selectVocabulary)) {
				return this.vocabulariesItems[this.selectVocabulary][this.typeLabel];
			} else {
				return [];
			}
		},
	},

	methods: {
		// URI validation method
		validateURI(uri) {
			// Regular expression to validate URI format
			const uriPattern =
				/^(https?:\/\/)?([a-z\d.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/;
			return uriPattern.test(uri);
		},
		onURIChange() {
			if (this.validateURI(this.modelURI)) {
				this.uriErrorMessage = ''; // Clear error message if URI is valid
				this.changeValue();
			} else {
				this.uriErrorMessage = 'Please enter a valid URI';
			}
		},
		clearTerm() {
			this.model = '';
			this.modelURI = '';
			this.modelURICustom = '';
			this.changeValue();
		},
		changeValue() {
			console.log('changeValue');
			let newValue;

			if (this.customVocabulary) {
				newValue = {
					id: this.id,
					term: {
						term: this.model,
						uri: this.modelURI,
						vocabulary: this.selectVocabulary,
					},
				};
			} else if (this.selectVocabulary === 'EDAM') {
				this.modelURI = this.EDAMreversed[this.typeLabel][this.model];
				newValue = {
					id: this.id,
					term: {
						term: this.model,
						uri: this.modelURI,
						vocabulary: this.selectVocabulary,
					},
				};
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

			if (newValue) {
				this.$emit('change', { index: this.index, value: newValue });
				console.log('emitting change');
				console.log({ index: this.index, value: newValue });
			}

			this.$forceUpdate();
		},
	},
};
</script>
