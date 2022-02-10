import { shallowMount } from '@vue/test-utils';
import CommunityCard from './CommunityCard.vue';
import MockCommunity from '~/test/unit/mockData/Community';

const factory = (MockCommunity, propsData) => {
	return shallowMount(CommunityCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { ...MockCommunity, ...propsData },
	});
};

describe('CommunityCard', () => {
	it('is instantiated', () => {
		const wrapper = factory(MockCommunity);
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot for active community', () => {
		const wrapper = factory(MockCommunity, { status: 'active' });
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should match snapshot for incubating community', () => {
		const wrapper = factory(MockCommunity, { status: 'incubating' });
		expect(wrapper.html()).toMatchSnapshot();
	});
});
