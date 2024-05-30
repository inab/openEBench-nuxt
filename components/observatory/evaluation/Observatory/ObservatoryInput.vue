<template>
	<v-container>
		<v-row justify="space-around" v-if="loadingStep">
			<v-col cols="10">
				<v-skeleton-loader
					class="mx-auto"
					type="heading, list-item, actions"
				></v-skeleton-loader>
			</v-col>
		</v-row>

		<v-form v-else>
			<v-row justify="space-around">
				<v-col cols="10">
					<p class="text-body-2">
						Select a tool from the Software's Observatory Database:
					</p>
				</v-col>
			</v-row>
			<v-row class="mt-2 d-flex align-center" justify="space-around">
				<v-col cols="10">
					<v-autocomplete
						v-model="value"
						:items="observatoryTools"
						label="Tool"
						outlined
						clearable
						item-text="label"
						:item-value="getValue"
						clear-icon="mdi-close-circle"
						prepend-icon="mdi-database"
						hide-selected
						@click:clear="clearLink"
						@keydown.enter.prevent="sumbitObservatoryTool"
					>
						<template #selection="data">
							<ToolSearchRow :data="data" />
						</template>
						<template #item="data">
							<ToolSearchRow :data="data" />
						</template>
					</v-autocomplete>
				</v-col>
			</v-row>
			<v-row justify="space-around" class="d-flex mt-0 pt-0">
				<v-col cols="10" class="text-right">
					<v-btn
						color="primary"
						:disabled="invalid"
						@click="sumbitObservatoryTool"
					>
						Continue
					</v-btn>
					<v-btn text @click="goBack"> Back </v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-progress-linear
					v-if="loading"
					indeterminate
					color="primary"
					class="mt-3 ml-6 mr-6"
				></v-progress-linear>
			</v-row>
		</v-form>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import ToolSearchRow from './ToolSearchRow.vue';

export default {
	name: 'ObservatoryInput',
	components: {
		ToolSearchRow,
	},
	data: () => ({
		rules: {
			required: (value) => !!value || 'Required.',
			singleValue: (value) => value.length() === 1 || 'Please select one tool.',
		},
		hover: false,
		value: null,
	}),
	computed: {
		...mapGetters({
			observatoryTools:
				'observatory/evaluation/observatory/getObservatoryToolsNameTypeSources',
			loading: 'observatory/evaluation/observatory/getLoading',
			loadingStep: 'observatory/evaluation/observatory/getLoadingAutocomplete',
			step: 'observatory/evaluation/index/getStep',
		}),
		invalid() {
			return this.value === null;
		},
	},
	created() {
		this.$store.dispatch(
			'observatory/evaluation/observatory/getObservatoryToolsNameTypeSources'
		);
	},
	methods: {
		clearLink() {
			this.value = null;
			this.value = null;
		},
		async goBack() {
			await this.$store.dispatch('observatory/evaluation/changeStep', 1);
			await this.$store.dispatch(
				'observatory/evaluation/observatory/updateLoading',
				false
			);
		},
		async sumbitObservatoryTool() {
			const payload = {
				name: this.value.name,
				type: this.value.type,
			};
			await this.$store.dispatch(
				'observatory/evaluation/observatory/fetchToolMetadata',
				payload
			);

			this.$store.dispatch('observatory/evaluation/changeStep', 3);
		},
		getValue(item) {
			return item;
		},
	},
};
</script>
