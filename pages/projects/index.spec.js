import { shallowMount } from '@vue/test-utils';
import Index from './index.vue';

const factory = (mockStore) => {
	return shallowMount(Index, {
		...createComponentMocks({ store: mockStore }),
	});
};

describe('Index.vue', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockStore = {
		communities: {
			getters: {
				communitiesList: () => {
					return [];
				},
				communitiesFilteredByProjects: () => {
					return [];
				},
			},
			actions: {
				getCommunities: jest.fn(),
			},
			state: () => {
				return { loading: false, list: [] };
			},
		},
	};

	it('is instantiated', () => {
		const wrapper = factory(mockStore);
		expect(wrapper).toBeTruthy();
	});

	it('should call store actions', () => {
		factory(mockStore);
		expect(mockStore.communities.actions.getCommunities).toHaveBeenCalled();
	});

	it.todo('should just render communities with project flag');
});
