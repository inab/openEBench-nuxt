<template>
	<fragment>
		<welcome-section class="mt-13" />
		<hero-searchbar class="mt-16" />
		<feature-teaser id="feature-teaser" class="landing-mt-24" />
		<hero-numbers class="mt-16" />
		<news-cards class="landing-mt-24" />
		<logo-slider class="landing-mt-24" />
	</fragment>
</template>

<script>
import FeatureTeaser from '~/components/Landing/FeatureTeaser';
import NewsCards from '~/components/Landing/NewsCards';
import LogoSlider from '~/components/Landing/LogoSlider';
import WelcomeSection from '~/components/Landing/WelcomeSection';
import HeroSearchbar from '~/components/Landing/HeroSearchbar';
import HeroNumbers from '~/components/Landing/HeroNumbers';

export default {
	name: 'IndexPage',
	components: {
		FeatureTeaser,
		NewsCards,
		LogoSlider,
		WelcomeSection,
		HeroSearchbar,
		HeroNumbers,
	},
};
</script>

<style lang="scss" scoped>
.landing-mt-24 {
	margin-top: 98px !important;
}
</style>
