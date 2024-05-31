<template>
	<v-col cols="12">
		<v-row class="d-flex align-center mt-2">
			<HeaderAvatar
				field="license"
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
			<CategoryAndTextFieldLicense
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
import HeaderAvatar from './HeaderAvatar.vue';
import CategoryAndTextFieldLicense from './CategoryAndTextFieldLicense.vue';

export default {
	name: 'MetaFieldLicense',
	components: {
		HeaderAvatar,
		CategoryAndTextFieldLicense,
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
		value: {
			type: Array,
			required: true,
		},
		increasable: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		addEntry() {
			const payload = {
				field: this.field,
				value: {
					name: '',
					url: '',
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
