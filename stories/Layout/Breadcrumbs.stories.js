import BreadcrumbsBar from '~/components/Molecules/BreadcrumbsBar';

export default {
	title: 'Layout/BreadcrumbsBar',
};

export const BreadcrumbsBarComponent = (_args, { argTypes }) => ({
	components: { BreadcrumbsBar },
	props: Object.keys(argTypes),
	template: `
		<breadcrumbs-bar :items="breadcrumbs">`,
});

BreadcrumbsBarComponent.args = {
	breadcrumbs: [
		{
			text: 'Home',
			disabled: false,
			exact: true,
			to: '/',
		},
		{
			text: 'Benchmarking Communities',
			disabled: false,
			exact: true,
			to: '/benchmarking',
		},
		{
			text: 'A Community',
			disabled: true,
			to: 'CID',
		},
	],
};
