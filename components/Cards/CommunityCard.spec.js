import { shallowMount } from '@vue/test-utils';
import CommunityCard from './CommunityCard.vue';
import MockCommunity from '~/test/unit/mockData/Community';

const factory = (MockCommunity) => {
	return shallowMount(CommunityCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { ...MockCommunity },
	});
};

describe('CommunityCard', () => {
	it('is instantiated', () => {
		const wrapper = factory(MockCommunity);
		expect(wrapper).toBeTruthy();
	});
});
