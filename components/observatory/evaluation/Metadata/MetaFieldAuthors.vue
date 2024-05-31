<template>
	<v-col cols="12">
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
			<TextFieldsAuthors
				:id="item.id"
				:item="item.term"
				:index="index"
				:field="field"
				class="mt-2 ml-3"
				@remove="removeEntry(index)"
			/>
		</v-row>
	</v-col>
</template>
<script>
import TextFieldsAuthors from './TextFieldsAuthors.vue';
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaFieldAuthors',
	components: {
		TextFieldsAuthors,
		HeaderAvatar,
	},
	props: {
		field: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		increasable: {
			type: Boolean,
			default: true,
		},
		value: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		addEntry() {
			// addedvalue is the value of the input field, which is always empty
			// sometimes it is an object, sometimes it is an array
			const payload = {
				field: this.field,
				value: {
					name: '',
					email: '',
					type: 'person',
					mantainer: false,
				},
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
