import { mount } from '@vue/test-utils';
import Communities from './communities.vue';

const factory = () => {
	return mount(Communities, {
		...createComponentMocks({}),
	});
};

describe('Communities', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('sets the iframe url according to env variable', () => {
		const wrapper = factory();
		expect(wrapper.vm.hostName).toBe('https://jest-openebench.bsc.es/');
		expect(wrapper.find('iframe').attributes('src')).toBe(
			'https://jest-openebench.bsc.es/scientific'
		);
	});
});
