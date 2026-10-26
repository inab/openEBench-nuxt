import { mount } from '@vue/test-utils';
import Challenge from './index.vue';
import MockCommunity from '~/test/unit/mockData/Community';
import MockEvent from '~/test/unit/mockData/Event';
import MockEvents from '~/test/unit/mockData/Events';
import MockChallenge from '~/test/unit/mockData/Challenge';

const factory = (mockStore, routeQuery = {}) => {
	return mount(Challenge, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: {
				params: { community: 'TESTCOMMUNITY', id: 'TESTID' },
				query: routeQuery,
			},
			$config: { OEB_LEGACY_ANGULAR_URI: 'https://jest-openebench.bsc.es/' },
		},
	});
};

describe('Community Participant', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

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
					return () => MockEvent;
				},
			},
			actions: {
				setCurrentEvent: jest.fn(),
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
		challenge: {
			getters: {
				datasetsList: () => {
					return [];
				},
				challenge: () => {
					return {};
				},
			},
			actions: {
				getChallenge: jest.fn(),
				getDatasets: jest.fn(),
			},
			mutations: {
				setDatasets: jest.fn(),
				setChallenge: jest.fn(),
				setLoading: jest.fn(),
			},
			state: () => {
				return {
					loading: {
						challenge: false,
						datasets: false,
					},
					challenge: MockChallenge,
				};
			},
		},
	};

	it('is instantiated', async () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
		await wrapper.vm.$nextTick();
	});

	it('calls store actions on mount', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();

		expect(mockStore.challenge.actions.getChallenge).toHaveBeenCalled();
	});
});
