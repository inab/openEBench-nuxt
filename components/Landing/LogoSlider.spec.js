import { mount } from '@vue/test-utils';
import LogoSlider from './LogoSlider.vue';

const factory = () => {
	return mount(LogoSlider, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('LogoSlider', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
