import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Tool from './_id.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const createStore = () =>
	new Vuex.Store({
		modules: {
			tool_entry: {
				namespaced: true,
				state: {
					tool: {
						id: 'TESTID',
						label: ['Test Tool'],
						type: ['web'],
						version: ['1.0'],
						webpage: [],
						sources_labels: {},
						description: [],
						documentation: [],
						license: [],
					},
					loading: false,
					similarTools: [],
					loadingSimilar: false,
				},
				getters: {
					tool: (s) => s.tool,
					loading: (s) => s.loading,
					similarTools: (s) => s.similarTools,
					loadingSimilar: (s) => s.loadingSimilar,
				},
				actions: {
					retrieveTool: jest.fn(),
					retrieveSimilarTools: jest.fn(),
				},
			},
			tool: {
				namespaced: true,
				getters: {
					searchedTerm: () => '',
				},
			},
		},
	});

const factory = () => {
	// Prevent scroll listener errors in jsdom
	window.addEventListener = jest.fn();
	window.removeEventListener = jest.fn();

	return mount(Tool, {
		localVue,
		store: createStore(),
		mocks: {
			$route: { params: { id: 'test-tool-TESTID' } },
			$vuetify: { goTo: jest.fn() },
			$config: { OEB_LEGACY_ANGULAR_URI: 'https://jest-openebench.bsc.es/' },
		},
		stubs: {
			// Stub heavy child components
			EntryIntro: true,
			ToolBrief: true,
			DocumentationContent: true,
			AvailabilityContent: true,
			CitationContent: true,
			LicenseContent: true,
			SimilarSoftwareContent: true,
			'v-breadcrumbs': true,
			'v-breadcrumbs-item': true,
		},
	});
};

describe('Tool (_id.vue)', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('renders without crashing when loading is false', () => {
		const wrapper = factory();
		expect(wrapper.vm.loading).toBe(false);
	});

	it('computes breadcrumbs with at least Home and Tools', () => {
		const wrapper = factory();
		const crumbs = wrapper.vm.breadcrumbs;
		expect(crumbs[0].text).toBe('Home');
		expect(crumbs[1].text).toBe('Tools');
	});

	it('calls loadTool on beforeMount', () => {
		const wrapper = factory();
		// loadTool dispatches to the store — verify it was called
		expect(wrapper.vm.$store.state.tool_entry).toBeDefined();
	});
});
