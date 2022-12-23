import { shallowMount } from '@vue/test-utils';
import CommunityPage from './index.vue';
import MockCommunity from '~/test/unit/mockData/Community';
import MockEvent from '~/test/unit/mockData/Event';
import MockEvents from '~/test/unit/mockData/Events';

const factory = (mockStore, route) => {
	return shallowMount(CommunityPage, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: route,
			$router: [],
		},
	});
};

describe('CommunityPage', () => {
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
	};

	const routeWithEventQuery = {
		params: { community: 'OEBC005' },
		query: { event: 'testEventID' },
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

	it('calls setCurrentEvent, and no other store actions with event ID if url param with event id is set and community is already in store', () => {
		const wrapper = factory(mockStore, routeWithEventQuery);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.query.event).toBe('testEventID');
		expect(wrapper.vm.$route.params.community).toBe('OEBC005');
		expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
			'community/setCurrentEvent',
			MockEvent
		);
		expect(mockStore.community.actions.getCommunity).not.toHaveBeenCalled();
	});

	it('does not call store actions if no url param with event id and community is already in store', () => {
		const wrapper = factory(mockStore, routeWithOutEventQuery);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.query.event).toBe(undefined);
		expect(wrapper.vm.$route.params.community).toBe('OEBC005');
		expect(mockStore.community.actions.setCurrentEvent).not.toHaveBeenCalled();
		expect(mockStore.community.actions.getCommunity).not.toHaveBeenCalled();
	});

	it('triggers store action setCurrentEvent when handleEventSelection is called', () => {
		const wrapper = factory(mockStore, routeWithOutEventQuery);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.query.event).toBe(undefined);
		expect(wrapper.vm.$route.params.community).toBe('OEBC005');
		expect(wrapper.vm.$store.commit).not.toHaveBeenCalled();
		wrapper.vm.handleEventSelection(MockEvent);

		expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
			'community/setCurrentEvent',
			MockEvent
		);
	});

	it('triggers url update in route object when current event watcher is called', () => {
		const wrapper = factory(mockStore, routeWithOutEventQuery);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.query.event).toBe(undefined);

		expect(wrapper.vm.$router).toEqual([]);
		wrapper.vm.$options.watch.currentEvent.call(wrapper.vm);
		expect(wrapper.vm.$router[0].query.event).toBe('OEBE0020000000');
	});

	it('dispatches setCurrentEvent action when events watcher is called', () => {
		const wrapper = factory(mockStore, routeWithEventQuery);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.query.event).toBe('testEventID');

		expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
			'community/setCurrentEvent',
			MockEvent
		);
		wrapper.vm.$store.commit.mockClear();
		wrapper.vm.$options.watch.events.call(wrapper.vm);
		expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
			'community/setCurrentEvent',
			MockEvent
		);
	});
});
