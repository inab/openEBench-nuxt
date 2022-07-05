<template>
	<div>
		<v-avatar color="primary" size="62" class="mb-5 mb-md-10">
			<slot name="icon" />
		</v-avatar>
		<h2 class="text-h6 mb-2"><slot name="title" /></h2>
		<p class="body-1">
			<slot name="description" />
		</p>
		<v-btn class="mt-2" outlined color="primary" :to="to"> Explore </v-btn>
	</div>
</template>

<script>
export default {
	name: 'FeatureCard',
	props: {
		to: {
			type: String,
			required: true,
		},
	},
};
</script>
