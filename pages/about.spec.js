import { mount } from '@vue/test-utils';
import About from './about.vue';

const factory = () => {
	return mount(About, {
		...createComponentMocks({}),
	});
};

describe('About', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
