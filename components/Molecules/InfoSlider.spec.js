import { shallowMount } from '@vue/test-utils';
import InfoSlider from './InfoSlider.vue';

const factory = () => {
	return shallowMount(InfoSlider, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { img: 'someimage' },
	});
};

describe('InfoSlider', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
