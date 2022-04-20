import { mount } from '@vue/test-utils';
import EventIndexPage from './events.vue';
import MockCommunity from '~/test/unit/mockData/Community';
import MockEvents from '~/test/unit/mockData/Events';

const factory = (mockStore, route) => {
	return mount(EventIndexPage, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: route,
			$router: { push: jest.fn() },
		},
	});
};

describe('Event Index Page', () => {
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
					return {};
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
					return () => {};
				},
				communityReferences: () => {
					return () => [];
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
	};

	const routeWithEventQueryDifferentCommmunityId = {
		params: { community: 'someCommunityID' },
		query: { event: 'testEventID' },
	};

	const routeWithOutEventQuery = {
		params: { community: 'OEBC005' },
		query: {},
	};

	it('is instantiated', () => {
		const wrapper = factory(mockStore, routeWithOutEventQuery);
		expect(wrapper).toBeTruthy();
	});

	it('calls store actions if community id URL param is not equal community in store', () => {
		const wrapper = factory(
			mockStore,
			routeWithEventQueryDifferentCommmunityId
		);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.query.event).toBe('testEventID');
		expect(wrapper.vm.$route.params.community).toBe('someCommunityID');
		expect(mockStore.community.actions.getCommunity).toHaveBeenCalled();
		expect(mockStore.community.actions.setCurrentEvent).not.toHaveBeenCalled();
	});

	it('does not call store actions if community is already in store', () => {
		const wrapper = factory(mockStore, routeWithOutEventQuery);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.params.community).toBe('OEBC005');
		expect(mockStore.community.actions.setCurrentEvent).not.toHaveBeenCalled();
		expect(mockStore.community.actions.getCommunity).not.toHaveBeenCalled();
	});

	it('does display a list of events and clicking an event pushes to community route', () => {
		const wrapper = factory(mockStore, routeWithOutEventQuery);
		expect(wrapper).toBeTruthy();

		const eventElements = wrapper.findAll("[data-test='event']");
		expect(eventElements.length).toEqual(MockEvents.length);

		eventElements.at(0).trigger('click');

		expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
			name: 'benchmarking-community',
			params: {
				community: MockCommunity._id,
			},
			query: {
				event: MockEvents[0]._id,
			},
		});
	});
});
