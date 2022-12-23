import { shallowMount } from '@vue/test-utils';
import Disclaimer from './disclaimer.vue';

const factory = () => {
	return shallowMount(Disclaimer, {
		...createComponentMocks({}),
	});
};

describe('Disclaimer', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
