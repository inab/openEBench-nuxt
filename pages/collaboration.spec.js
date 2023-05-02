import { mount } from '@vue/test-utils';
import About from './collaboration.vue';

const factory = () => {
	return mount(About, {
		...createComponentMocks({}),
	});
};

describe('Collaboration', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
