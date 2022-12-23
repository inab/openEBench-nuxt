import { shallowMount } from '@vue/test-utils';
import Legal from './legal-notice.vue';

const factory = () => {
	return shallowMount(Legal, {
		...createComponentMocks({}),
	});
};

describe('Disclaimer', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
