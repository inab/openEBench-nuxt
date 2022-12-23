import { shallowMount } from '@vue/test-utils';
import CommunityClassificationTable from './CommunityClassificationTable.vue';
import mockEvent from '~/test/unit/mockData/Event';
import mockEvents from '~/test/unit/mockData/Events';

const factory = (mockEvent, mockStore) => {
	return shallowMount(CommunityClassificationTable, {
		...createComponentMocks({ store: mockStore }),
		propsData: { event: mockEvent },
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
		const wrapper = factory(mockEvent, mockStore);
		expect(wrapper).toBeTruthy();
	});
	it('maps selected objects IDs to a plain string array with IDs', () => {
		const localThis = { selected: mockEvents };

		expect(
			CommunityClassificationTable.computed.selectedIds.call(localThis)
		).toStrictEqual(['OEBE0020000000', 'OEBE0020000002', 'OEBE0020000001']);
	});
});
