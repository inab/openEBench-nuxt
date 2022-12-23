import Error from '~/layouts/error.vue';

export default {
	title: 'Layout/ErrorPage',
};

export const ErrorPage = (_args, { argTypes }) => ({
	components: { Error },
	props: Object.keys(argTypes),
	template: '<error v-bind="$props"/>',
});

ErrorPage.args = {
	error: {
		statusCode: 404,
		message: 'This page could not be found',
	},
};
