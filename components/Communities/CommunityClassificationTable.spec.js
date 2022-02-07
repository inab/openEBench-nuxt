import { shallowMount } from '@vue/test-utils';
import CommunityClassificationTable from './CommunityClassificationTable.vue';

const factory = () => {
	return shallowMount(CommunityClassificationTable, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: {},
	});
};

describe('CommunityClassificationTable', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
