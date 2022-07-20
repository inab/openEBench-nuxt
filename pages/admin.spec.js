import { mount } from '@vue/test-utils';
import Admin from './admin.vue';

const factory = () => {
	return mount(Admin, {
		...createComponentMocks({}),
	});
};

describe('Admin', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
