<!-- MetaFieldURLField.vue -->
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

			<v-btn v-if="increasable" icon @click="addEntry">
				<v-icon small color="grey lighten-1"> mdi-plus-circle </v-icon>
			</v-btn>
		</v-row>

		<!-- Iterate through the entries and pass them to URLForm component -->
		<URLForm
			v-for="(entry, index) in localValue"
			:key="entry.id"
			:value="entry.term"
			:index="index"
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
			type: Array, // Assuming value is an array of entries
			required: true,
		},
		label: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			localValue: JSON.parse(JSON.stringify(this.value)), // Local copy of the value prop
		};
	},
	watch: {
		// Watch for changes in the value prop and update localValue accordingly
		value(newValue) {
			this.localValue = JSON.parse(JSON.stringify(newValue));
		},
	},
	methods: {
		addEntry() {
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
		// Handle the update event from URLForm component
		updateEntry({ index, value }) {
			const payload = {
				field: this.field,
				index,
				value,
			};
			this.localValue[index].term = value; // Update local value
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeEntry',
				payload
			); // Update Vuex store
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
