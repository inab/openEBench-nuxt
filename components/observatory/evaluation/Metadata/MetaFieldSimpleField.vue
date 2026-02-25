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

			<v-btn v-if="increasable" icon @click="addEntry()">
				<v-icon small color="grey lighten-1"> mdi-plus-circle </v-icon>
			</v-btn>
		</v-row>

		<v-row v-for="(item, index) in value" :key="item.id">
			<FormField
				:id="item.id"
				:item="item.term"
				:index="index"
				:field="field"
				:label="label"
				class="mt-2 ml-3"
				@remove="removeEntry(index)"
			/>
		</v-row>
	</v-col>
</template>
<script>
import FormField from './FormField.vue';
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaFieldSimpleField',
	components: {
		FormField,
		HeaderAvatar,
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
			type: [String, Array, Object],
			required: false,
			default: () => [],
		},

		label: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			model: '',
		};
	},
	methods: {
		addEntry() {
			// addedvalue is the value of the input field, which is always empty
			// sometimes it is an object, sometimes it is an array
			const payload = {
				field: this.field,
				value: '',
			};
			this.$store.dispatch('observatory/evaluation/metadata/addEntry', payload);
			this.$forceUpdate();
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
			this.$forceUpdate();
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
