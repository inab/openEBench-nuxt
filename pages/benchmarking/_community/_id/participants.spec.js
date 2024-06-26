import { mount } from '@vue/test-utils';
import Challenge from './index.vue';
import MockCommunity from '~/test/unit/mockData/Community';
import MockEvent from '~/test/unit/mockData/Event';
import MockEvents from '~/test/unit/mockData/Events';
import MockChallenge from '~/test/unit/mockData/Challenge';
/*
import ChartBarplotVisualizerWrapper from '~/components/Widgets/ChartBarplotVisualizerWrapper';
import ChartScatterVisualizerWrapper from '~/components/Widgets/ChartScatterVisualizerWrapper';
*/

const factory = (mockStore) => {
	return mount(Challenge, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: { params: { community: 'TESTCOMMUNITY', id: 'TESTID' } },
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
				participants: () => {
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
				setParticipants: jest.fn(),
				setTools: jest.fn(),
				setLoading: jest.fn(),
			},
			state: () => {
				return {
					loading: {
						events: false,
						tools: false,
						participants: false,
						community: false,
					},
					community: MockCommunity,
				};
			},
		},
		challenge: {
			getters: {
				participantsList: () => {
					return [];
				},
				challenge: () => {
					return {};
				},
			},
			actions: {
				getChallenge: jest.fn(),
				getParticipants: jest.fn(),
			},
			mutations: {
				setParticipants: jest.fn(),
				setChallenge: jest.fn(),
				setLoading: jest.fn(),
			},
			state: () => {
				return {
					loading: {
						challenge: false,
						participants: false,
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

	/*
	it('renders the bar-plot component with the right ID and JSON data structure for rendering', () => {
		mockStore.challenge.getters.datasetsList = () => {
			return MockChallengeDatasetsBarplot;
		};
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
		const barplot = wrapper.findComponent(ChartBarplotVisualizerWrapper); // => finds Bar by `name`
		expect(barplot.exists()).toBe(true);
		expect(barplot.props().id).toBe(MockChallengeDatasetsBarplot[0]._id);
		expect(barplot.props().data).toBe(
			MockChallengeDatasetsBarplot[0].graphData
		);
	});

	it('renders the scatter-plot component with the right ID', () => {
		mockStore.challenge.getters.datasetsList = () => {
			return MockChallengeDatasetsScatter;
		};
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
		const scatter = wrapper.findComponent(ChartScatterVisualizerWrapper); // => finds Bar by `name`
		expect(scatter.exists()).toBe(true);
		expect(scatter.props().id).toBe(MockChallengeDatasetsScatter[0]._id);
	});
	*/
});
