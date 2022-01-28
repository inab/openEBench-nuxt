import { mount } from '@vue/test-utils';
import NewsCards from './CommunityCard.vue';

const factory = () => {
	return mount(NewsCards, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('CommunityCard', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
