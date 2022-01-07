import Vuetify from 'vuetify';

import { createLocalVue, shallowMount } from '@vue/test-utils';
import WelcomeSection from './WelcomeSection.vue';

const factory = (vuetify, localVue) => {
	return shallowMount(WelcomeSection, {
		localVue,
		vuetify,
		mocks: {
			$vuetify: { breakpoint: {} },
		},
	});
};

describe('WelcomeSection', () => {
	const localVue = createLocalVue();
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it('is instiated', () => {
		const wrapper = factory(vuetify, localVue);
		expect(wrapper).toBeTruthy();
	});
});
