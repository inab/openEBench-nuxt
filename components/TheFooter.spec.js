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

	it('should show the cookie hint, and hide on button click', async () => {
		const wrapper = factory();
		let cookieBanner = wrapper.find('.Cookie');
		expect(cookieBanner.exists()).toBe(true);

		const cookieAcceptButton = wrapper.find('.Cookie__button');
		expect(cookieAcceptButton.exists()).toBe(true);

		cookieAcceptButton.trigger('click');
		await wrapper.vm.$nextTick();

		cookieBanner = wrapper.find('.Cookie');
		expect(cookieBanner.exists()).toBe(false);
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
