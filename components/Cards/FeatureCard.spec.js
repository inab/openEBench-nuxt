import { shallowMount } from '@vue/test-utils';
import FeatureCard from './FeatureCard.vue';

const factory = () => {
	return shallowMount(FeatureCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { to: 'someroute' },
	});
};

describe('FeatureCard', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
