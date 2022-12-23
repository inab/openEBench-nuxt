import { mount } from '@vue/test-utils';
import FeatureTeaser from './FeatureTeaser.vue';

const factory = () => {
	return mount(FeatureTeaser, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('FeatureTeaser', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
