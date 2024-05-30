<template>
	<v-container>
		<v-row class="d-flex align-center" justify="start">
			<v-col cols="3">
				<v-combobox
					v-model="modelType"
					label="Type"
					:items="types"
					dense
					outlined
					class="text-body-2"
					@change="changeValue"
				>
				</v-combobox>
			</v-col>
			<v-col cols="8">
				<v-text-field
					v-model="modelName"
					label="Name"
					dense
					class="text-body-2"
					@input="changeValue"
				>
				</v-text-field>
			</v-col>
			<v-col cols="1" class="mr-0 ml-auto">
				<v-tooltip bottom color="grey">
					<template #activator="{ on, attrs }">
						<v-btn icon v-bind="attrs" @click="$emit('remove')" v-on="on">
							<v-icon color="grey" small> mdi-close-circle </v-icon>
						</v-btn>
					</template>
					<span class="text-caption">Remove entry</span>
				</v-tooltip>
			</v-col>
		</v-row>
		<v-row class="d-flex align-center">
			<v-col cols="3"> </v-col>
			<v-col cols="5">
				<v-text-field
					v-model="modelEmail"
					label="Email"
					:rules="[rules.email]"
					dense
					class="text-body-2"
					@input="changeValue"
				>
				</v-text-field>
			</v-col>
			<v-col cols="1"></v-col>
			<v-col cols="2">
				<v-checkbox
					v-model="modelMaintainer"
					label="Maintainer"
					color="primary"
					@change="changeValue"
				>
					<template #label>
						<span class="text-body-2 black--text">Maintainer</span>
					</template>
				</v-checkbox>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'TextFieldsAuthors',
	props: ['item', 'field', 'index', 'id'],
	data() {
		return {
			modelName: '',
			modelEmail: '',
			modelType: '',
			modelMaintainer: false,
			types: ['person', 'organization'],
			rules: {
				required: (value) => !!value || 'Required.',
				email: (value) => {
					const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
					return pattern.test(value) || 'Invalid e-mail.';
				},
			},
		};
	},
	mounted() {
		this.modelName = this.item.name;
		this.modelEmail = this.item.email;
		this.modelType = this.item.type;
		this.modelMaintainer = this.item.maintainer;
	},
	methods: {
		changeValue() {
			const payload = {
				field: this.field,
				value: {
					term: {
						name: this.modelName,
						type: this.modelType, // 'person' or 'organization
						email: this.modelEmail,
						mantainer: this.modelMaintainer,
					},
					id: this.id,
				},
				index: this.index,
			};
			this.$store.dispatch(
				'observatory/evaluation/metadata/changeEntry',
				payload
			);
		},
	},
};
</script>
