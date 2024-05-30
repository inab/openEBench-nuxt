<template>
	<v-col :xl="n_cols" :lg="n_cols" :md="n_cols">
		<v-row class="d-flex align-center mb-2">
			<HeaderAvatar
				:field="field"
				:field_name="title"
				:disabled_tooltip="true"
			/>
			<span class="text-body title"> {{ title }}</span>
			<v-btn icon @click="addEntry">
				<v-icon small color="grey lighten-1"> mdi-plus-circle </v-icon>
			</v-btn>
		</v-row>

		<v-textarea
			v-for="(item, index) in value"
			:key="item.id"
			:value="item.term"
			outlined
			auto-grow
			clearable
			hide-details
			clear-icon="mdi-close-circle"
			class="text-body-2 mt-3"
		>
			<template #append-outer>
				<v-btn icon @click="closeEntry(index)">
					<v-icon color="grey lighten-1" small> mdi-close-circle </v-icon>
				</v-btn>
			</template>
		</v-textarea>
	</v-col>
</template>

<script>
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaTextArea',
	components: {
		HeaderAvatar,
	},
	props: ['value', 'title', 'field', 'n_cols', 'sm_cols'],
	methods: {
		closeEntry(index) {
			const payload = {
				field: this.field,
				index,
			};
			this.$store.dispatch('evaluation/metadata/removeEntry', payload);
		},
		addEntry() {
			const payload = {
				field: this.field,
				value: '',
			};
			this.$store.dispatch('evaluation/metadata/addEntry', payload);
		},
	},
};
</script>
<style scoped>
.title {
	font-size: 1rem !important;
	color: #0b579f;
	font-weight: 400;
}
</style>
