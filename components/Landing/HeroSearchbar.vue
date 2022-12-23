<template>
	<section height="100" dark class="primary lighten-1">
		<v-container class="pt-7 pb-7">
			<v-text-field
				v-model="input"
				:prepend-inner-icon="'mdi-magnify'"
				label="Search for individual tools"
				solo
				clearable
				hide-details
				data-testid="input-field"
				@keyup.enter="handleSubmit"
				@click:prepend-inner="handleSubmit"
			></v-text-field>
		</v-container>
	</section>
</template>

<script>
export default {
	name: 'HeroSearchbar',
	data: () => ({
		input: '',
	}),
	methods: {
		handleSubmit() {
			this.$router.push({
				path: '/tool',
				query: { search: this.input },
			});
		},
	},
};
</script>
