import { shallowMount } from '@vue/test-utils';
import CommunityToolsTable from './CommunityToolsTable.vue';
import Tools from '~/test/unit/mockData/Tools';

const factory = (mockStore) => {
	return shallowMount(CommunityToolsTable, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { tools: Tools },
	});
};

describe('CommunityToolsTable', () => {
	const mockStore = {
		community: {
			state: () => {
				return {
					loading: {
						events: false,
						tools: false,
						datasets: false,
						community: false,
					},
				};
			},
		},
	};
	it('is instantiated', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
	});
});
