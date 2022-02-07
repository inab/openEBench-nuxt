import { shallowMount } from '@vue/test-utils';
import CommunityDatasetsTable from './CommunityDatasetsTable.vue';

const factory = () => {
	return shallowMount(CommunityDatasetsTable, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: {},
	});
};

describe('CommunityDatasetsTable', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
