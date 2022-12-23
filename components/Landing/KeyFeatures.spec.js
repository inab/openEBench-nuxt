import { mount } from '@vue/test-utils';
import KeyFeatures from './KeyFeatures.vue';

const factory = () => {
	return mount(KeyFeatures, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('KeyFeatures', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
