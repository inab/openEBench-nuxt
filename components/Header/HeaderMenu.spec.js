import { mount } from '@vue/test-utils';
import HeaderMenu from './HeaderMenu.vue';

const factory = () => {
	return mount(HeaderMenu, {
		...createComponentMocks({
			mocks: {
				$vuetify: { breakpoint: {} },
			},
		}),
		stubs: ['fragment', 'nuxt-link', 'router-link'],
		propsData: { vreHref: 'somehref' },
	});
};

describe('HeaderMenu', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should toggle the side menu on button click on mobile', async () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();

		wrapper.vm.$vuetify.breakpoint.smAndDown = false;
		wrapper.vm.$vuetify.breakpoint.mdAndUp = true;
		await wrapper.vm.$nextTick();

		let btnToggleMenu = wrapper.find('[data-testid="btn-toggle-menu"]');
		expect(btnToggleMenu.exists()).toBe(false);

		wrapper.vm.$vuetify.breakpoint.smAndDown = true;
		wrapper.vm.$vuetify.breakpoint.mdAndUp = false;
		await wrapper.vm.$nextTick();

		btnToggleMenu = wrapper.find('[data-testid="btn-toggle-menu"]');
		expect(btnToggleMenu.exists()).toBe(true);

		await btnToggleMenu.trigger('click');
		expect(wrapper.vm.openNavMobile).toBe(true);
		await btnToggleMenu.trigger('click');
		expect(wrapper.vm.openNavMobile).toBe(false);
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
});
