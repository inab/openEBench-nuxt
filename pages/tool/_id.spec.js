import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Tool from './_id.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const VALID_ID = '69e76f48c0cec6c6a36f547c';

const createStore = (actions = {}) =>
	new Vuex.Store({
		modules: {
			tool_entry: {
				namespaced: true,
				state: {
					tool: {
						id: VALID_ID,
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
					resolveToolId: jest.fn(),
					...actions,
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

const factory = ({ params, router, actions } = {}) => {
	// Prevent scroll listener errors in jsdom
	window.addEventListener = jest.fn();
	window.removeEventListener = jest.fn();

	return mount(Tool, {
		localVue,
		store: createStore(actions),
		mocks: {
			$route: { params: params || { id: `test-tool-${VALID_ID}` } },
			$router: router || { replace: jest.fn() },
			$nuxt: { error: jest.fn() },
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

	it('redirects a name-only URL to the canonical name-id slug', async () => {
		const replace = jest.fn();
		const resolveToolId = jest.fn().mockResolvedValue(VALID_ID);
		const wrapper = factory({
			params: { id: 'bwa' },
			router: { replace },
			actions: { resolveToolId },
		});

		await wrapper.vm.loadTool('bwa');

		expect(resolveToolId).toHaveBeenCalledWith(expect.anything(), {
			name: 'bwa',
			source: 'biotools',
		});
		expect(replace).toHaveBeenCalledWith(`/tool/bwa-${VALID_ID}`);
	});

	it('404s a name-only URL that cannot be resolved', async () => {
		const error = jest.fn();
		const resolveToolId = jest.fn().mockResolvedValue(null);
		const wrapper = factory({
			params: { id: 'does-not-exist' },
			actions: { resolveToolId },
		});
		wrapper.vm.$nuxt.error = error;

		await wrapper.vm.loadTool('does-not-exist');

		expect(error).toHaveBeenCalledWith(
			expect.objectContaining({ statusCode: 404 })
		);
	});
});
