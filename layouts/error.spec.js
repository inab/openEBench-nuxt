import { shallowMount } from '@vue/test-utils';
import ErrorPage from './error.vue';

const factory = (ErrorObject) => {
	return shallowMount(ErrorPage, {
		...createComponentMocks({}),
		propsData: { error: ErrorObject },
	});
};

const ErrorObject404 = {
	statusCode: 404,
	message: 'This page could not be found',
};

describe('ErrorPage', () => {
	it('is instantiated', () => {
		const wrapper = factory(ErrorObject404);
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory(ErrorObject404);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
