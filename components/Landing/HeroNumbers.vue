<template>
	<v-parallax height="170" :src="material2">
		<v-container>
			<v-row align="center" justify="center" class="root">
				<v-col align="center" md="4">
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
				<v-col align="center" md="4">
					<div class="counter-item">
						<span class="icon ion-ios-lightbulb-outline" />
						<div class="text">
							<h4 class="text-h3">
								<animated-number :value="toolCount" />
							</h4>
							<h6 class="title">Tools</h6>
						</div>
					</div>
				</v-col>
				<v-col align="center" md="4">
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
	data() {
		return {
			material2,
			communityCount: 8,
			toolCount: 21236,
			resourcesCount: 41184,
		};
	},
};
</script>
