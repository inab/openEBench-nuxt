<template>
	<div>
		<welcome-section class="mt-13" />
		<hero-searchbar class="mt-10" />
		<key-features class="landing-mt-24 mb-16" />
		<section class="grey lighten-5">
			<feature-teaser id="feature-teaser" class="pt-16 pb-16" />
		</section>
		<hero-numbers
			:community-count="communitiesCount"
			:tools-count="toolsCount"
			:resources-count="resourcesCount"
		/>
		<logo-slider class="landing-mt-24" />
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
.landing-mt-24 {
	margin-top: 98px !important;
}
</style>
