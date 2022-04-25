import { shallowMount } from '@vue/test-utils';
import Index from './index.vue';
import MockCommunity from '~/test/unit/mockData/Community';
jest.mock('marked', () => ({ marked: jest.fn(() => 'foo') }));

const factory = (mockStore) => {
	return shallowMount(Index, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$route: { params: { project: '1' } },
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

	it('is instantiated', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
	});
});
