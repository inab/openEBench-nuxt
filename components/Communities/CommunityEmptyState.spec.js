import { mount } from '@vue/test-utils';
import CommunityEmptyState from './CommunityEmptyState.vue';

const factory = () => {
	return mount(CommunityEmptyState, {
		...createComponentMocks({}),
		mocks: {},
	});
};

describe('CommunityEmptyState', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
