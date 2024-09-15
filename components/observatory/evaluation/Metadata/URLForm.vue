<!-- URLForm.vue -->
<template>
	<v-row>
		<v-text-field
			v-model="localValue"
			:label="label"
			class="mt-2 ml-3"
			:error-messages="urlErrorMessage"
			dense
			@input="onURLChange"
		>
			<template #append-outer>
				<v-btn icon @click="$emit('remove', index)">
					<v-icon color="grey lighten-1" small> mdi-close-circle </v-icon>
				</v-btn>
			</template>
		</v-text-field>
	</v-row>
</template>

<script>
export default {
	name: 'URLForm',
	props: {
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: false,
		},
		field: {
			type: String,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
		id: {
			type: Number,
			required: false,
		},
	},
	data() {
		return {
			localValue: this.value, // Local copy of the value prop
			urlErrorMessage: '', // Error message for URL validation
		};
	},

	methods: {
		// Method to validate the URL format
		validateURL(url) {
			const urlPattern =
				/^(https?:\/\/)?([a-z\d.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/;
			return urlPattern.test(url);
		},
		// Handle the input change and validate the URL
		onURLChange() {
			if (this.validateURL(this.localValue)) {
				this.urlErrorMessage = ''; // Clear the error message if valid
				// Emit the validated value to the parent component
				this.$emit('update', {
					index: this.index,
					value: { id: this.id, term: this.localValue },
				});
			} else {
				this.urlErrorMessage = 'Please enter a valid URL'; // Set error message if invalid
			}
		},
	},
};
</script>

<style scoped>
/* Add your styles here */
</style>
