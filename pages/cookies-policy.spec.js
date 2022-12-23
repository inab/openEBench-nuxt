import { shallowMount } from '@vue/test-utils';
import Cookies from './cookies-policy.vue';

const factory = () => {
	return shallowMount(Cookies, {
		...createComponentMocks({}),
	});
};

describe('Disclaimer', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
