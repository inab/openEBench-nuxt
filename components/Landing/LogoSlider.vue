<template>
	<v-container class="mt-15">
		<h2 class="text-h4">Our partners</h2>
		<v-slide-group class="pa-4" show-arrows>
			<v-slide-item
				v-for="(image, index) in images"
				:key="`logoslider` + index"
				disabled
			>
				<v-img
					contain
					class="ma-5 pa-2"
					max-height="150"
					max-width="200"
					:src="image.src"
				>
				</v-img>
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
					link: '/',
					src: require('~/static/images/partners/elixir-aai.png'),
				},
				{
					title: 'Eucan Image',
					link: '/',
					src: require('~/static/images/partners/eucanimage.svg'),
				},
				{
					title: 'EUCANcan',
					link: '/',
					src: require('~/static/images/partners/eucancan.png'),
				},
				{
					title: 'PerMedCoE',
					link: '/',
					src: require('~/static/images/partners/permedcoe.png'),
				},
				{
					title: 'IPC',
					link: '/',
					src: require('~/static/images/partners/ipc.png'),
				},
				{
					title: 'decider',
					link: '/',
					src: require('~/static/images/partners/decider.jpg'),
				},
			],
		};
	},
};
</script>
