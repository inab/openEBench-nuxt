import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import * as vueTestUtils from '@vue/test-utils';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuex);

// Set env vars for testing
const mockEnv = {
	OEB_LEGACY_ANGULAR_URI: 'https://jest-openebench.bsc.es/',
	VRE_URI: 'https://jest-openebench.bsc.es/vre/home/',
	OBSERVATORY_URI: 'https://jest.observatory.openebench.bsc.es',
	REST_API_URL: 'https://jest-openebench.bsc.es/monitor/rest/',
	SCIENTIFIC_SERVICE_URL: 'https://jest-openebench.bsc.es/api/scientific',
};

global.IntersectionObserver = class IntersectionObserver {
	disconnect() {
		return null;
	}

	observe() {
		return null;
	}

	unobserve() {
		return null;
	}
};

// A helper for creating Vue component mocks
global.createComponentMocks = ({ mocks, store }) => {
	// Use a local version of Vue, to avoid polluting the global
	// Vue and thereby affecting other tests.
	// https://vue-test-utils.vuejs.org/api/#createlocalvue
	const localVue = vueTestUtils.createLocalVue();
	const returnOptions = { localVue };

	if (store) {
		localVue.use(Vuex);
		const storeModules = store || {};

		returnOptions.store = new Vuex.Store({
			modules: Object.entries(storeModules)
				.map(([moduleName, storeModule]) => {
					return {
						[moduleName]: {
							state: storeModule.state || {},
							getters: storeModule.getters || {},
							mutations: storeModule.mutations || {},
							actions: storeModule.actions || {},
							namespaced: true,
						},
					};
				})
				.reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {}),
		});
	}

	returnOptions.stubs = {
		RouterLink: vueTestUtils.RouterLinkStub,
		NuxtLink: vueTestUtils.RouterLinkStub,
	};

	returnOptions.mocks = mocks || {};
	returnOptions.mocks.$config = mockEnv;

	Vue.use(Vuetify);
	returnOptions.vuetify = new Vuetify();

	return returnOptions;
};

export default global.createComponentMocks;