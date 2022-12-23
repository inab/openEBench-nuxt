<template>
	<v-container>
		<h2 class="text-h4">Our partners</h2>
		<v-slide-group
			ref="slideGroup"
			v-observe-visibility="visibilityChanged"
			class="pa-4"
			show-arrows="always"
		>
			<v-slide-item
				v-for="(image, index) in shuffledImages"
				:key="`logoslider_` + index"
				disabled
			>
				<a
					:href="image.href"
					target="_blank"
					class="d-flex"
					:aria-label="image.title"
				>
					<v-img
						contain
						class="ma-5 pa-2"
						max-height="120"
						max-width="200"
						width="200"
						:src="image.src"
					>
					</v-img>
				</a>
			</v-slide-item>
		</v-slide-group>
	</v-container>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility';

export default {
	name: 'LogoSlider',
	directives: {
		ObserveVisibility,
	},
	data() {
		return {
			images: [
				{
					title: 'Elixir',
					href: 'https://elixir-europe.org/',
					src: require('~/static/images/partners/elixir.png'),
				},
				{
					title: 'Eucan Image',
					href: 'https://eucanimage.eu/',
					src: require('~/static/images/partners/eucanimage.svg'),
				},
				{
					title: 'EUCANcan',
					href: 'https://eucancan.com/',
					src: require('~/static/images/partners/eucancan.png'),
				},
				{
					title: 'PerMedCoE',
					href: 'https://permedcoe.eu/',
					src: require('~/static/images/partners/permedcoe.png'),
				},
				{
					title: 'IPC',
					href: 'https://ipc-project.eu/',
					src: require('~/static/images/partners/ipc.png'),
				},
				{
					title: 'decider',
					href: 'https://www.deciderproject.eu/',
					src: require('~/static/images/partners/decider.jpg'),
				},
			],
		};
	},
	computed: {
		shuffledImages() {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			return this.images.sort(() => Math.random() - 0.5);
		},
	},
	methods: {
		visibilityChanged(isVisible) {
			// workaround for a bug https://github.com/vuetifyjs/vuetify/issues/14195
			if (isVisible) {
				setTimeout(
					function () {
						this.$refs.slideGroup.setWidths();
					}.bind(this),
					500
				);
			}
		},
	},
};
</script>
