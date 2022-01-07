import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import * as vueTestUtils from '@vue/test-utils';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuex);

// A helper for creating Vue component mocks
global.createComponentMocks = (vuetify) => {
	// Use a local version of Vue, to avoid polluting the global
	// Vue and thereby affecting other tests.
	// https://vue-test-utils.vuejs.org/api/#createlocalvue
	const localVue = vueTestUtils.createLocalVue();
	const returnOptions = { localVue };

	returnOptions.stubs = ['router-link', 'router-view'];

	if (vuetify) {
		Vue.use(Vuetify);
		returnOptions.vuetify = new Vuetify();
	}
	return returnOptions;
};

export default global.createComponentMocks;
