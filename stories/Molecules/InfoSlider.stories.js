import InfoSlider from '~/components/Molecules/InfoSlider';

export default {
	title: 'Molecules/InfoSlider',
};

export const InfoSliderComponent = (_args, { argTypes }) => ({
	components: { InfoSlider },
	props: Object.keys(argTypes),
	template: `
		<info-slider class="mt-10 mb-5"  v-bind="$props">
			<template #header>
				<h1 class="text-h4">Benchmarking Communities</h1>
			</template>
			<p class="text--secondary">
				Unbiased and objective evaluations of bioinformatics resources are
				challenging to set up and can only be effective when built and
				implemented around community driven efforts. Thus, in OpenEBench we
				gather several community initiatives which establish standards and
				automated services to facilitate scientific benchmarking.
			</p>

			<p class="text--secondary">
				These efforts provide a way for software developers to implement more
				efficient methods, tools and web services by comparing their performance
				on previously agreed datasets and metrics with other similar resources
				and, more importantly, help end-users that tend to have difficulties in
				choosing the right tool for the problem at hand, and are not necessarily
				aware of the latest developments in each of the fields of the
				bioinformatics methods they need to use.
			</p>
		</info-slider>`,
});

InfoSliderComponent.args = {
	img: require('~/static/images/illustrations/lab_community.png'),
};
