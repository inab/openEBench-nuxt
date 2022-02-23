import { shallowMount } from '@vue/test-utils';
import Community from './index.vue';
import MockCommunity from '~/test/unit/mockData/Community';
import MockEvent from '~/test/unit/mockData/Event';
import MockEvents from '~/test/unit/mockData/Events';

const factory = (mockStore) => {
	return shallowMount(Community, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: { params: { id: 'TESTID' } },
		},
	});
};

describe('Community', () => {
	const mockStore = {
		community: {
			getters: {
				events: () => {
					return MockEvents;
				},
				currentEvent: () => {
					return MockEvent;
				},
				datasets: () => {
					return [];
				},
				tools: () => {
					return [];
				},
				community: () => {
					return MockCommunity;
				},
				getEventById: () => {
					return MockEvent;
				},
			},
			actions: {
				setCurrentEvent: jest.fn(),
				getTools: jest.fn(),
				getDatasets: jest.fn(),
				getBenchmarkingEvents: jest.fn(),
				getCommunity: jest.fn(),
			},
			mutations: {
				setCommunity: jest.fn(),
				setEvents: jest.fn(),
				setCurrentEvent: jest.fn(),
				setDatasets: jest.fn(),
				setTools: jest.fn(),
				setLoading: jest.fn(),
			},
			state: () => {
				return {
					loading: {
						events: false,
						tools: false,
						datasets: false,
						community: false,
					},
					community: MockCommunity,
				};
			},
		},
	};

	it('is instantiated', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
	});

	it('calls setCurrentEvent if url param with event id is set', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();

		expect(mockStore.communities.actions.setCurrentEvent).toHaveBeenCalled();
	});
});
