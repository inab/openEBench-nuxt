import { shallowMount } from '@vue/test-utils';
import CommunityClassificationTable from './CommunityClassificationTable.vue';
import MockEvent from '~/test/unit/mockData/Event';

const factory = (mockStore) => {
	return shallowMount(CommunityClassificationTable, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { event: MockEvent },
	});
};

describe('CommunityClassificationTable', () => {
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
		const wrapper = factory(MockEvent, mockStore);
		expect(wrapper).toBeTruthy();
	});
});
