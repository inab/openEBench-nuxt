import { shallowMount } from '@vue/test-utils';
import CommunityEventSelector from './CommunityEventSelector.vue';
import MockEvent from '~/test/unit/mockData/Event';
import MockEvents from '~/test/unit/mockData/Events';

const factory = (mockStore) => {
	return shallowMount(CommunityEventSelector, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { currentEvent: MockEvent, events: MockEvents },
	});
};

describe('CommunityEventSelector', () => {
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
