import WelcomeSection from '~/components/Landing/WelcomeSection.vue';
import HeroSearchbar from '~/components/Landing/HeroSearchbar';
import KeyFeatures from '~/components/Landing/KeyFeatures';
import FeatureTeaser from '~/components/Landing/FeatureTeaser';
import HeroNumbers from '~/components/Landing/HeroNumbers';
import NewsCards from '~/components/Landing/NewsCards';
import LogoSlider from '~/components/Landing/LogoSlider';
import TwitterCard from '~/components/Landing/TwitterCard';

export default {
	title: 'Molecules/Landing Page',
};

export const Welcome = () => ({
	components: { WelcomeSection },
	template: '<welcome-section />',
});

export const ToolSearchbar = () => ({
	components: { HeroSearchbar },
	template: '<hero-searchbar />',
});

export const KeyFeaturesOverview = () => ({
	components: { KeyFeatures },
	template: '<key-features />',
});

export const FeatureOverview = () => ({
	components: { FeatureTeaser },
	template: '<feature-teaser />',
});

export const NumbersSection = () => ({
	components: { HeroNumbers },
	template: `
			<div>
				<h1 class="text-h3">Hero Component Numbers</h1>
				<h2 class="text-h4 mt-5 mb-5">With Numbers</h2>
				<hero-numbers :resources-count=9999 :community-count=8 :tools-count=1234 />
				<h2 class="text-h4 mt-10 mb-5">Loading State</h2>
				<hero-numbers :resources-count=0 :community-count=0 :tools-count=0 />
			</div>
		`,
});

export const News = () => ({
	components: { NewsCards },
	template: '<news-cards />',
});

export const Logos = () => ({
	components: { LogoSlider },
	template: '<logo-slider />',
});

export const TwitterNewsCard = () => ({
	components: { TwitterCard },
	template: '<twitter-card />',
});
