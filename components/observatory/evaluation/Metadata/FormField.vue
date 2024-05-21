<template>
	<v-row>
		<v-text-field
			v-model="model"
			persistent-placeholder
			dense
			:label="label"
			:class="textClass"
			@input="changeValue"
		>
			<template #append-outer>
				<v-btn v-if="increasable" icon @click="$emit('remove', index)">
					<v-icon color="grey lighten-1" small> mdi-close-circle </v-icon>
				</v-btn>
			</template>
		</v-text-field>
	</v-row>
</template>
<script>
export default {
	name: 'FormField',
	props: {
		item: {
			type: String,
			default: '',
			required: false,
		},
		index: {
			type: Number,
			default: 0,
			required: false,
		},
		id: {
			type: Number,
			default: 0,
			required: false,
		},
		increasable: {
			type: Boolean,
			default: true,
			required: false,
		},
		field: {
			type: String,
			default: '',
			required: false,
		},
		textClass: {
			type: Array,
			default: () => ['text-body-2'],
			required: false,
		},
		label: {
			type: String,
			default: '',
			required: false,
		},
	},
	data() {
		return {
			model: '',
		};
	},
	mounted() {
		this.model = this.item;
	},
	methods: {
		decaulftTextClass() {
			return ['text-body-2'];
		},
		changeValue() {
			const newValue = {
				id: this.id,
				term: this.model,
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
