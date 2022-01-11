import { mount } from '@vue/test-utils';
import NewsCard from './NewsCard.vue';

const factory = (propsData) => {
	return mount(NewsCard, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData,
	});
};

const propsData = {
	img: 'path',
	title: 'News Title',
	desc: 'News Description',
};

describe('NewsCard', () => {
	it('is instantiated', () => {
		const wrapper = factory(propsData);
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory(propsData);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
