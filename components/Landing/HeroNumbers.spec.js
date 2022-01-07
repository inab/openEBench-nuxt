import { mount } from '@vue/test-utils';
import HeroNumbers from './HeroNumbers.vue';

const factory = (propsData) => {
	return mount(HeroNumbers, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData,
	});
};

const propsData = {
	toolsCount: 10,
	communityCount: 5,
	resourcesCount: 20,
};

describe('HeroNumbers', () => {
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
		const wrapper = factory(propsData);
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory(propsData);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should have a container height of 350 on small devices', async () => {
		const wrapper = factory(propsData);

		wrapper.vm.$vuetify.breakpoint.xs = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.containerHeight).toBe(350);
	});

	it('should have a container height of 170 on bigger devices', async () => {
		const wrapper = factory(propsData);

		wrapper.vm.$vuetify.breakpoint.mdAndUp = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.containerHeight).toBe(170);
	});
});
