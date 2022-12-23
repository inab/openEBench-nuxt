import { shallowMount } from '@vue/test-utils';
import Index from './index.vue';

const factory = (mockStore) => {
	return shallowMount(Index, {
		...createComponentMocks({ store: mockStore }),
		stubs: ['fragment'],
	});
};

describe('Index.vue', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockStore = {
		dashboard: {
			getters: {
				resourcesCount: () => {
					return 999;
				},
				toolsCount: () => {
					return 555;
				},
				communitiesCount: () => {
					return 10;
				},
			},
			actions: {
				getCommunitiesCount: jest.fn(),
				getResourcesCount: jest.fn(),
				getToolsCount: jest.fn(),
			},
		},
	};

	it('is instantiated', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
	});

	it('should call store actions', () => {
		factory(mockStore);

		expect(mockStore.dashboard.actions.getCommunitiesCount).toHaveBeenCalled();
		expect(mockStore.dashboard.actions.getResourcesCount).toHaveBeenCalled();
		expect(mockStore.dashboard.actions.getToolsCount).toHaveBeenCalled();
	});
});
