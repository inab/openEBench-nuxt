import { mount } from '@vue/test-utils';
import WelcomeSection from './WelcomeSection.vue';

const factory = () => {
	return mount(WelcomeSection, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('WelcomeSection', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('contains illustration image on large devices and hides it on small devices', async () => {
		const wrapper = factory();

		wrapper.vm.$vuetify.breakpoint.mdAndUp = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.v-image').exists()).toBe(true);

		wrapper.vm.$vuetify.breakpoint.mdAndUp = false;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.v-image').exists()).toBe(false);
	});
});
