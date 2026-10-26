<template>
	<v-parallax class="hero-numbers" :height="containerHeight" :src="material2">
		<v-container class="hero-numbers__container">
			<v-row align="center" justify="center" class="hero-numbers__row">
				<v-col align="center" cols="12" sm="3">
					<div class="hero-numbers__item">
						<span class="hero-numbers__icon ion-leaf" />
						<div class="hero-numbers__text">
							<h4 class="hero-numbers__count text-h3">
								<animated-number :value="communityCount" />
							</h4>
							<h6 class="hero-numbers__title">
								{{ 'Community' | pluralize(communityCount) }}
							</h6>
						</div>
					</div>
				</v-col>
				<v-col align="center" cols="12" sm="3">
					<div class="hero-numbers__item">
						<span class="hero-numbers__icon ion-ios-lightbulb-outline" />
						<div class="hero-numbers__text">
							<h4 class="hero-numbers__count text-h3 font-weight-normal">
								<animated-number :value="toolsCount" />
							</h4>
							<h6 class="hero-numbers__title">
								{{ 'Tool' | pluralize(toolsCount) }}
							</h6>
						</div>
					</div>
				</v-col>
				<v-col align="center" cols="12" sm="3">
					<div class="hero-numbers__item">
						<span class="hero-numbers__icon ion-ios-world-outline" />
						<div class="hero-numbers__text">
							<h4 class="hero-numbers__count text-h3 font-weight-normal">
								<animated-number :value="projectsCount" />
							</h4>
							<h6 class="hero-numbers__title">
								{{ 'Project Space' | pluralize(projectsCount) }}
							</h6>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-parallax>
</template>

<script>
import AnimatedNumber from '~/components/Landing/AnimatedNumber';
import material2 from '~/static/images/material2_parallax.webp';

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
		projectsCount: {
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

<style scoped>
.hero-numbers::v-deep .v-parallax__content {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 0;
}

.hero-numbers__container {
	display: flex;
	align-items: center;
	position: absolute;
	top: 35%;
	left: 50%;
	width: 100%;
	padding-top: 0;
	padding-bottom: 0;
	transform: translate(-50%, -50%);
}

.hero-numbers__row {
	width: 100%;
	margin-top: 0;
	margin-bottom: 0;
	align-items: center;
}

.hero-numbers__item {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 96px;
	color: white;
	text-align: center;
}

.hero-numbers__icon {
	display: inline-flex;
	flex: 0 0 auto;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	margin-bottom: 8px;
	font-size: 2rem;
	line-height: 1;
}

.hero-numbers__text {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.hero-numbers__count,
.hero-numbers__title {
	margin: 0;
	color: white;
	line-height: 1.15;
	letter-spacing: 0;
}

.hero-numbers__title {
	margin-top: 4px;
	font-size: 1.25rem;
	font-weight: 500;
}

@media (max-width: 599px) {
	.hero-numbers::v-deep .v-parallax__content {
		display: flex;
		align-items: center;
	}

	.hero-numbers__container {
		position: static;
		transform: none;
	}

	.hero-numbers__item {
		min-height: 104px;
		padding-top: 8px;
		padding-bottom: 8px;
	}

	.hero-numbers__icon {
		width: 34px;
		height: 34px;
		margin-bottom: 4px;
		font-size: 1.7rem;
	}

	.hero-numbers__count {
		font-size: 2.25rem !important;
	}

	.hero-numbers__title {
		font-size: 1.05rem;
	}
}
</style>
