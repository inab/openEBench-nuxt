<template>
	<v-parallax :height="containerHeight" :src="material2">
		<v-container>
			<v-row align="center" justify="center" class="root">
				<v-col align="center" cols="12" sm="3">
					<div class="counter-item">
						<span class="icon ion-leaf" />
						<div class="text">
							<h4 class="text-h3">
								<animated-number :value="communityCount" />
							</h4>
							<h6 class="title">Communities</h6>
						</div>
					</div>
				</v-col>
				<v-col align="center" cols="12" sm="3">
					<div class="counter-item">
						<span class="icon ion-ios-lightbulb-outline" />
						<div class="text">
							<h4 class="text-h3">
								<animated-number :value="toolsCount" />
							</h4>
							<h6 class="title">Tools</h6>
						</div>
					</div>
				</v-col>
				<v-col align="center" cols="12" sm="3">
					<div class="counter-item">
						<span class="icon ion-ios-world-outline" />
						<div class="text">
							<h4 class="text-h3 font-weight-normal">
								<animated-number :value="resourcesCount" />
							</h4>
							<h6 class="title">Resources</h6>
						</div>
					</div>
				</v-col>
				<v-col align="center" cols="12" sm="3">
					<div class="counter-item">
						<span class="icon ion-ios-world-outline" />
						<div class="text">
							<h4 class="text-h3 font-weight-normal">
								<animated-number :value="1" />
							</h4>
							<h6 class="title">Projects</h6>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-parallax>
</template>

<script>
import AnimatedNumber from '~/components/Landing/AnimatedNumber';
import material2 from '~/static/images/material2_parallax.jpg';

export default {
	name: 'HeroNumbers',
	components: {
		AnimatedNumber,
	},
	props: {
		communityCount: {
			type: Number,
			required: true,
		},
		toolsCount: {
			type: Number,
			required: true,
		},
		resourcesCount: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			material2,
		};
	},
	computed: {
		containerHeight() {
			return this.$vuetify.breakpoint.xs ? 450 : 170;
		},
	},
};
</script>
