<template>
	<v-container>
		<h2 class="text-h4">Our partners</h2>
		<v-slide-group class="pa-4" show-arrows="always">
			<v-slide-item
				v-for="(image, index) in images"
				:key="`logoslider` + index"
				disabled
			>
				<a :href="image.href" target="_blank">
					<v-img
						contain
						class="ma-5 pa-2"
						max-height="150"
						max-width="200"
						:src="image.src"
					>
					</v-img>
				</a>
			</v-slide-item>
		</v-slide-group>
	</v-container>
</template>

<script>
export default {
	name: 'LogoSlider',
	data() {
		return {
			images: [
				{
					title: 'Elixir AAI',
					href: 'https://elixir-europe.org/',
					src: require('~/static/images/partners/elixir-aai.png'),
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
};
</script>
