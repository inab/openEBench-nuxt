import { shallowMount } from '@vue/test-utils';
import CommunityDatasetsTable from './CommunityDatasetsTable.vue';
import Datasets from '~/test/unit/mockData/Datasets';

const factory = (mockStore) => {
	return shallowMount(CommunityDatasetsTable, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { datasets: Datasets },
	});
};

describe('CommunityDatasetsTable', () => {
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
