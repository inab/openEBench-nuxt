import { mount } from '@vue/test-utils';
import Observatory from './observatory.vue';

const factory = () => {
	return mount(Observatory, {
		...createComponentMocks({}),
	});
};

describe('Observatory', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('sets the iframe url according to env variable', () => {
		const wrapper = factory();
		expect(wrapper.find('iframe').attributes('src')).toBe(
			'https://jest.observatory.openebench.bsc.es'
		);
	});
});
