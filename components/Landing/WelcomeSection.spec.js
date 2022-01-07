import Vuetify from 'vuetify';

import { createLocalVue, mount } from '@vue/test-utils';
import WelcomeSection from './WelcomeSection.vue';

const factory = (vuetify, localVue) => {
	return mount(WelcomeSection, {
		localVue,
		vuetify,
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		stubs: ['router-link', 'router-view'],
	});
};

describe('WelcomeSection', () => {
	const localVue = createLocalVue();
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it('is instantiated', () => {
		const wrapper = factory(vuetify, localVue);
		expect(wrapper).toBeTruthy();
	});

	it('contains illustration image on large devices and hides it on small devices', async () => {
		const wrapper = factory(vuetify, localVue);

		wrapper.vm.$vuetify.breakpoint.mdAndUp = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.v-image').exists()).toBe(true);

		wrapper.vm.$vuetify.breakpoint.mdAndUp = false;
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.v-image').exists()).toBe(false);
	});
});
