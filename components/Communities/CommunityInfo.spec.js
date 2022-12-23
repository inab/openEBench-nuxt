import { shallowMount } from '@vue/test-utils';
import CommunityInfo from './CommunityInfo.vue';
import MockCommunity from '~/test/unit/mockData/Community';

const factory = (mockStore) => {
	return shallowMount(CommunityInfo, {
		...createComponentMocks({ store: mockStore }),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { community: MockCommunity },
	});
};

describe('CommunityInfo', () => {
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
