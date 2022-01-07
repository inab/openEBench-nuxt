import { mount } from '@vue/test-utils';
import AnimatedNumber from './AnimatedNumber.vue';

const factory = (propsData) => {
	return mount(AnimatedNumber, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData,
	});
};

describe('AnimatedNumber', () => {
	beforeEach(() => {
		// IntersectionObserver isn't available in test environment
		const mockIntersectionObserver = jest.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
	});

	it('is instantiated', () => {
		const wrapper = factory({
			value: 0,
		});
		expect(wrapper).toBeTruthy();
	});

	it('should show a progress spinner if value == 0', () => {
		const wrapper = factory({
			value: 0,
		});
		expect(wrapper.find('.v-progress-circular').exists()).toBe(true);
	});

	it('should show the number if value > 0', () => {
		const wrapper = factory({
			value: 999,
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should update the local props @visibility change accordingly', () => {
		const wrapper = factory({
			value: 10,
		});
		expect(wrapper.vm.inputValue).toBe(0);
		expect(wrapper.vm.isVisible).toBe(false);

		wrapper.vm.visibilityChanged(true);

		expect(wrapper.vm.inputValue).toBe(10);
		expect(wrapper.vm.isVisible).toBe(true);

		wrapper.vm.visibilityChanged(false);

		expect(wrapper.vm.inputValue).toBe(0);
		expect(wrapper.vm.isVisible).toBe(false);
	});
});
