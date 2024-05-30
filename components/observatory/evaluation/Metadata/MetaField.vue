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

			<v-btn v-if="increasable" icon @click="addEntry(valueType)">
				<v-icon small color="grey lighten-1"> mdi-plus-circle </v-icon>
			</v-btn>
		</v-row>

		<slot name="inputField" @removeEntry="removeEntry(index, field)"></slot>
	</v-col>
</template>
<script>
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaField',
	components: {
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
	},
	data() {
		return {
			model: '',
		};
	},
	methods: {
		addEntry(addedValue) {
			// addedvalue is the value of the input field, which is always empty
			// sometimes it is an object, sometimes it is an array
			const payload = {
				field: this.field,
				value: addedValue,
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
