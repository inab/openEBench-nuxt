import { shallowMount } from '@vue/test-utils';
import CommunityToolsTable from './CommunityToolsTable.vue';

const factory = () => {
	return shallowMount(CommunityToolsTable, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: {},
	});
};

describe('CommunityToolsTable', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});