import { shallowMount } from '@vue/test-utils';
import Index from './index.vue';
import MockCommunity from '~/test/unit/mockData/Community';
jest.mock('marked', () => ({ marked: jest.fn(() => 'foo') }));

const factory = (mockStore, route) => {
	return shallowMount(Index, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: route,
			$router: [],
		},
	});
};

describe('Index.vue', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockStore = {
		community: {
			getters: {
				currentCommunity: () => {
					return {};
				},
				community: () => {
					return MockCommunity;
				},
			},
			actions: { getCommunity: jest.fn() },
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

	const routeWithProjectId = {
		params: { project: 'sample' },
	};

	it('is instantiated', () => {
		const wrapper = factory(mockStore, routeWithProjectId);
		expect(wrapper).toBeTruthy();
	});

	it('calls store actions if community id URL param is not equal community in store', () => {
		const wrapper = factory(mockStore, routeWithProjectId);
		expect(wrapper).toBeTruthy();

		expect(wrapper.vm.$route.params.project).toBe('sample');
		expect(mockStore.community.actions.getCommunity).toHaveBeenCalled();
	});
});
