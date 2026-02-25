<!-- MetaFieldURLField.vue -->
<template>
	<v-col :cols="n_cols">
		<v-row class="d-flex align-center mt-2 mb-2">
			<HeaderAvatar
				:field="field"
				:field_name="title"
				:disabled_tooltip="true"
			/>

			<span id="title" class="text-body">
				{{ title }}
			</span>

			<v-btn v-if="increasable" icon @click="addEntry">
				<v-icon small color="grey lighten-1"> mdi-plus-circle </v-icon>
			</v-btn>
		</v-row>

		<!-- Iterate through the entries and pass them to URLForm component -->
		<URLForm
			v-for="(entry, index) in localValue"
			:key="entry.id || index"
			:value="extractURL(entry)"
			:index="index"
			:id="entry.id"
			:field="field"
			:label="label"
			@update="updateEntry"
			@remove="removeEntry"
		/>
	</v-col>
</template>

<script>
import HeaderAvatar from './HeaderAvatar.vue';
import URLForm from './URLForm.vue';

export default {
	name: 'MetaFieldURLField',
	components: {
		HeaderAvatar,
		URLForm,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		n_cols: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			required: true,
		},
		valueType: {
			type: String,
			required: true,
		},
		increasable: {
			type: Boolean,
			default: true,
			required: false,
		},
		value: {
			type: Array,
			default: () => [],
		},
		label: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			localValue: [],
		};
	},
	watch: {
		value: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.localValue = Array.isArray(newValue)
					? JSON.parse(JSON.stringify(newValue))
					: [];
			},
		},
	},
	methods: {
		// Extrae la URL de cada entry
		extractURL(entry) {
			if (!entry) return '';
			if (typeof entry.term === 'string') return entry.term;
			if (entry.term && typeof entry.term === 'object' && entry.term.url)
				return entry.term.url;
			return '';
		},
		addEntry() {
			console.log(this.field);
			const payload = {
				field: this.field,
				value: '',
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
		// Maneja la actualización desde URLForm
		updateEntry({ index, value }) {
			const entry = this.localValue[index];
			if (!entry) return;

			// Si term es objeto, solo actualizamos url
			if (entry.term && typeof entry.term === 'object') {
				entry.term.url = value;
			} else {
				entry.term = value;
			}

			const payload = {
				field: this.field,
				index,
				value: entry.term, // lo que se guardará en Vuex
			};

			this.$store.dispatch(
				'observatory/evaluation/metadata/changeEntry',
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
