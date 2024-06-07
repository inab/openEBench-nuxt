import { shallowMount } from '@vue/test-utils';
import CollaboratorsCard from './CollaboratorsCard.vue';

const factory = (propsData) => {
	return shallowMount(CollaboratorsCard, {
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: {
			title: 'Project Name',
			href: 'https://projectname.com',
			src: 'https://via.placeholder.com/150',
			...propsData,
		},
	});
};

describe('CollaboratorsCard', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
