import { shallowMount } from '@vue/test-utils';
import MemberCard from './MemberCard.vue';

const factory = () => {
	return shallowMount(MemberCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: {
			member: '{}}',
			isMobile: 'someroute',
			items: 'someroute',
			institutionMapping: 'someroute',
		},
	});
};

describe('MemberCard', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
