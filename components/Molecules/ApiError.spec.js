import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import ApiError from '@/components/Molecules/ApiError.vue';

Vue.use(Vuetify);

describe('ApiError.vue', () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it('should render the illustration correctly', () => {
		const wrapper = mount(ApiError, {
			vuetify,
			stubs: {
				'v-img': {
					template: '<img />',
				},
			},
		});

		const img = wrapper.find('img');
		expect(img.exists()).toBe(true);
		expect(img.attributes('src')).toBe(
			require('~/static/images/illustrations/error.png')
		);
	});

	it('should display the error message', () => {
		const wrapper = mount(ApiError, {
			vuetify,
		});

		const errorMsg = wrapper.find('.api-error-msg');
		expect(errorMsg.exists()).toBe(true);
		expect(errorMsg.text())
      .toBe('Looks like the server is taking to long to respond, please try again later.');
	});
});
