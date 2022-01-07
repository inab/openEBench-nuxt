import { mount } from '@vue/test-utils';
import LogoSlider from './LogoSlider.vue';

const factory = () => {
	return mount(LogoSlider, {
		...createComponentMocks({
			vuetify: true,
		}),
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

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
