import { mount } from '@vue/test-utils';
import TwitterCard from './TwitterCard.vue';

const factory = () => {
	return mount(TwitterCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('TwitterCard', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
