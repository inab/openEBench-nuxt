import { mount } from '@vue/test-utils';
import Publication from './publications.vue';

const factory = () => {
	return mount(Publication, {
		...createComponentMocks({}),
	});
};

describe('Publication', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
