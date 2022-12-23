import { mount } from '@vue/test-utils';
import HeaderMenu from './HeaderMenu.vue';

const factory = (mockStore) => {
	return mount(HeaderMenu, {
		...createComponentMocks({
			mocks: {
				$vuetify: { breakpoint: {} },
				$auth: { loginWith: jest.fn(), logout: jest.fn() },
			},
			store: mockStore,
		}),
		stubs: ['fragment', 'nuxt-link', 'router-link'],
		propsData: { vreHref: 'somehref' },
	});
};

describe('HeaderMenu', () => {
	const mockStoreLoggedOut = {
		auth: {
			state: () => {
				return {
					loggedIn: false,
				};
			},
		},
	};

	const mockStoreLoggedIn = {
		auth: {
			state: () => {
				return {
					loggedIn: true,
				};
			},
		},
	};

	it('is instantiated', () => {
		const wrapper = factory(mockStoreLoggedOut);
		expect(wrapper).toBeTruthy();
	});

	it('should show the login button, hide the logout button if logged out', () => {
		const wrapper = factory(mockStoreLoggedOut);
		expect(wrapper).toBeTruthy();

		const btnLogin = wrapper.find('[data-testid="btn-login"]');
		expect(btnLogin.exists()).toBe(true);

		const btnLogout = wrapper.find('[data-testid="btn-logout"]');
		expect(btnLogout.exists()).toBe(false);

		btnLogin.trigger('click');
		expect(wrapper.vm.$auth.loginWith).toHaveBeenCalled();
	});

	it('should show the logout button, hide the login button if logged in', () => {
		const wrapper = factory(mockStoreLoggedIn);
		expect(wrapper).toBeTruthy();

		const btnLogin = wrapper.find('[data-testid="btn-login"]');
		expect(btnLogin.exists()).toBe(false);

		const btnLogout = wrapper.find('[data-testid="btn-logout"]');
		expect(btnLogout.exists()).toBe(true);

		btnLogout.trigger('click');
		expect(wrapper.vm.$auth.logout).toHaveBeenCalled();
	});

	it('should toggle the side menu on button click on mobile', async () => {
		const wrapper = factory(mockStoreLoggedOut);
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
		const wrapper = factory(mockStoreLoggedIn);
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
