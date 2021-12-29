<template>
	<fragment>
		<welcome-section class="mt-13" />
		<hero-searchbar class="mt-16" />
		<feature-teaser class="mt-16" />
		<hero-numbers class="mt-16" />
		<news-cards class="mt-16" />
		<logo-slider class="mt-16" />
		<Footer class="mt-16" />
	</fragment>
</template>

<script>
import FeatureTeaser from '~/components/Landing/FeatureTeaser';
import NewsCards from '~/components/Landing/NewsCards';
import LogoSlider from '~/components/Landing/LogoSlider';
import Footer from '~/components/TheFooter';
import WelcomeSection from '~/components/Landing/WelcomeSection';
import HeroSearchbar from '~/components/Landing/HeroSearchbar';
import HeroNumbers from '~/components/Landing/HeroNumbers';

export default {
	name: 'IndexPage',
	components: {
		FeatureTeaser,
		NewsCards,
		LogoSlider,
		Footer,
		WelcomeSection,
		HeroSearchbar,
		HeroNumbers,
	},
};
</script>
