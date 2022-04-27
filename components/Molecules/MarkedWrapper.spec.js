import { shallowMount } from '@vue/test-utils';
import MarkedWrapper from './MarkedWrapper.vue';
import markdown from '~/static/markdown/projects/sample.md';
const factory = (markdown) => {
	return shallowMount(MarkedWrapper, {
		...createComponentMocks({}),
		propsData: { markdown },
	});
};

describe('MarkedWrapper', () => {
	it('is instantiated', () => {
		const wrapper = factory(markdown);
		expect(wrapper).toBeTruthy();
	});

	it('renders some markdown', () => {
		const wrapper = factory(markdown);
		expect(wrapper).toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('sanitizes the output', () => {
		const dirty =
			'This is test <a style="opacity: 0.1" href="javascript:void(0)">Link</a>';
		const wrapper = factory(dirty);
		expect(wrapper).toBeTruthy();
		expect(wrapper.html()).toMatchSnapshot();
	});
});
