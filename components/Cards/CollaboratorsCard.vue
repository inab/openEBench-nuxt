<template>
	<v-card
		class="mx-auto mb-5"
		hover
		:href="href"
		target="_blank"
		max-width="344"
		min-height="250"
		max-height="350"
	>
		<div class="image-container">
			<v-img
				v-if="title == 'ELIXIR STEERS'"
				:src="src"
				class="responsive-img"
				max-width="65%"
			></v-img>
			<v-img
				v-else-if="title == 'DataTools4Heart'"
				:src="src"
				class="responsive-img"
				height="45px"
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
