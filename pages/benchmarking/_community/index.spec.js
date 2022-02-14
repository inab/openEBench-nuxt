import { mount } from '@vue/test-utils';
import Community from './index.vue';

const factory = () => {
	return mount(Community, {
		...createComponentMocks({}),
		mocks: {},
	});
};

describe('Community', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
