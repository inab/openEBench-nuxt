<template>
	<v-card class="mx-auto mb-5 main-card" hover :href="href" target="_blank">
		<div class="image-container">
			<!-- custom styles for ELIXIR STEERS -->
			<v-img
				v-if="title == 'ELIXIR STEERS'"
				:src="src"
				class="responsive-img"
				max-width="65%"
			></v-img>
			<v-img v-else :src="src" class="responsive-img" max-width="80%"></v-img>
		</div>
		<v-divider></v-divider>
		<h3 class="text-center mt-3">{{ title }}</h3>
	</v-card>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		href: {
			type: String,
			required: true,
		},
		src: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
/* Main card styles */
.main-card {
	min-width: 344px; /* Add minimum width */
	max-width: 350px; /* Adjust maximum width */
	min-height: 250px;
}

.image-container {
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.responsive-img {
	max-height: 100%;
	max-width: 75%;
	object-fit: contain;
}

.image-container a {
	text-decoration: none;
	outline: none;
}

.text-center {
	text-align: center;
}
</style>
