import { mount } from '@vue/test-utils';
import TheFooter from './TheFooter.vue';

const factory = () => {
	return mount(TheFooter, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('TheFooter', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should have computed prop isMobile true on small devices', async () => {
		const wrapper = factory();

		wrapper.vm.$vuetify.breakpoint.smAndDown = true;
		wrapper.vm.$vuetify.breakpoint.mdAndUp = false;

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isMobile).toBe(true);
		expect(wrapper.vm.isDesktop).toBe(false);
	});

	it('should have computed prop isDesktop true on small devices', async () => {
		const wrapper = factory();

		wrapper.vm.$vuetify.breakpoint.smAndDown = false;
		wrapper.vm.$vuetify.breakpoint.mdAndUp = true;

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isDesktop).toBe(true);
		expect(wrapper.vm.isMobile).toBe(false);
	});
});
