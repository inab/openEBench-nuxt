import { shallowMount } from '@vue/test-utils';
import BreadcrumbsBar from './BreadcrumbsBar.vue';

const factory = () => {
	return shallowMount(BreadcrumbsBar, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: {},
	});
};

describe('BreadcrumbsBar', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
