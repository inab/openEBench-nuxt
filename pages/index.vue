<template>
	<div>
		<welcome-section class="mt-13" />
		<hero-searchbar class="mt-16" />
		<a
			class="scroll-down mt-5"
			aria-label="Scroll to feature overview"
			href="#"
			@click="$vuetify.goTo('#key-features')"
		/>
		<key-features id="key-features" class="landing-mt mb-16" />
		<section class="grey lighten-5 landing-mt">
			<feature-teaser id="feature-teaser" class="pt-16 pb-16" />
		</section>
		<hero-numbers
			:community-count="communitiesCount"
			:tools-count="toolsCount"
			:resources-count="resourcesCount"
			:projects-count="projectsCount"
		/>
		<logo-slider class="landing-mt landing-mb" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FeatureTeaser from '~/components/Landing/FeatureTeaser';
import LogoSlider from '~/components/Landing/LogoSlider';
import WelcomeSection from '~/components/Landing/WelcomeSection';
import HeroSearchbar from '~/components/Landing/HeroSearchbar';
import HeroNumbers from '~/components/Landing/HeroNumbers';
import KeyFeatures from '~/components/Landing/KeyFeatures';

export default {
	name: 'IndexPage',
	components: {
		FeatureTeaser,
		LogoSlider,
		WelcomeSection,
		HeroSearchbar,
		HeroNumbers,
		KeyFeatures,
	},
	computed: {
		...mapGetters('dashboard', {
			communitiesCount: 'communitiesCount',
			toolsCount: 'toolsCount',
			resourcesCount: 'resourcesCount',
			projectsCount: 'projectsCount',
		}),
	},
	mounted() {
		this.$store.dispatch('dashboard/getToolsCount');
		this.$store.dispatch('dashboard/getResourcesCount');
		this.$store.dispatch('dashboard/getCommunitiesCount');
	},
};
</script>

<style lang="scss" scoped>
.landing-mt {
	margin-top: 128px !important;
}

.landing-mb {
	margin-bottom: 128px !important;
}

.scroll-down {
	height: 50px;
	width: 30px;
	border: 2px solid var(--v-primary-lighten1);
	position: absolute;
	left: 50%;
	border-radius: 50px;
	cursor: pointer;
}
.scroll-down::before,
.scroll-down::after {
	content: '';
	position: absolute;
	top: 20%;
	left: 50%;
	height: 10px;
	width: 10px;
	transform: translate(-50%, -100%) rotate(45deg);
	border: 2px solid var(--v-primary-lighten1);
	border-top: transparent;
	border-left: transparent;
	animation: scroll-down 1s ease-in-out infinite;
}
.scroll-down::before {
	top: 30%;
	animation-delay: 0.3s;
	/* animation: scroll-down 1s ease-in-out infinite; */
}

@keyframes scroll-down {
	0% {
		/* top:20%; */
		opacity: 0;
	}
	30% {
		opacity: 1;
	}
	60% {
		opacity: 1;
	}
	100% {
		top: 90%;
		opacity: 0;
	}
}
</style>
