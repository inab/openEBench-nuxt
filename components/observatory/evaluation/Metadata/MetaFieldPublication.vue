<template>
	<v-col :cols="n_cols">
		<v-row class="d-flex align-center mt-2">
			<HeaderAvatar
				field="publication"
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
			<v-row>
				<v-col cols="11">
					<PublicationField
						:id="item.id"
						:item="item.term"
						:index="index"
						field="publication"
					/>
				</v-col>
				<v-col cols="1" class="mb-auto pt-0">
					<v-tooltip bottom color="grey">
						<template #activator="{ on, attrs }">
							<v-btn icon v-bind="attrs" v-on="on" @click="removeEntry(index)">
								<v-icon color="grey" small> mdi-close-circle </v-icon>
							</v-btn>
						</template>
						<span class="text-caption">Remove entry</span>
					</v-tooltip>
				</v-col>
			</v-row>
		</v-row>
	</v-col>
</template>
<script>
import PublicationField from './PublicationField.vue';
import HeaderAvatar from './HeaderAvatar.vue';

export default {
	name: 'MetaFieldPublication',
	components: {
		PublicationField,
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
		value: {
			type: Array,
			required: true,
		},
		increasable: {
			type: Boolean,
			default: true,
			required: false,
		},
	},
	methods: {
		addEntry() {
			// addedvalue is the value of the input field, which is always empty
			// sometimes it is an object, sometimes it is an array
			const payload = {
				field: 'publication',
				value: {
					title: '',
					journal: '',
					year: null,
					doi: '',
					pmid: '',
					pmcid: '',
				},
			};
			this.$store.dispatch('observatory/evaluation/metadata/addEntry', payload);
			this.$forceUpdate();
		},
		removeEntry(index) {
			const payload = {
				field: 'publication',
				index,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/removeEntry',
				payload
			);
			this.$forceUpdate();
		},
		changeEntry(index, newItem) {
			const payload = {
				field: 'publication',
				index,
				newItem,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/clearEntry',
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
