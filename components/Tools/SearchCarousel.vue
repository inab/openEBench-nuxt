<template>
	<v-carousel cycle height="500" hide-delimiter-background show-arrows-on-hover>
		<v-carousel-item v-for="(slide, i) in slides" :key="i">
			<v-sheet color="gery lighten-3" height="100%">
				<v-row class="fill-height" align="center" justify="center">
					<div class="text-h5 text-center">
						🚧 {{ slide }} slide 🚧
						<br />
						<br />
						Sample content
					</div>
				</v-row>
			</v-sheet>
		</v-carousel-item>
	</v-carousel>
</template>

<script>
export default {
	name: 'SearchCarousel',
	data() {
		return {
			slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
		};
	},
};
</script>
