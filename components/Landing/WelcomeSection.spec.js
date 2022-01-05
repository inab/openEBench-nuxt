import { shallowMount } from '@vue/test-utils';
import WelcomeSection from './WelcomeSection.vue';

const factory = () => {
	return shallowMount(WelcomeSection, {
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('WelcomeSection', () => {
	it('mounts properly', () => {
		const wrapper = factory();
		expect(wrapper.isVueInstance()).toBeTruthy();
	});
});
