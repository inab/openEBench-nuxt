import { shallowMount } from '@vue/test-utils';
import AlumniCard from './AlumniCard.vue';

const factory = () => {
	return shallowMount(AlumniCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData: { alumni: 'someroute' },
	});
};

describe('AlumniCard', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
