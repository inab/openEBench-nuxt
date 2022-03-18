import { shallowMount } from '@vue/test-utils';
import ChartScatterVisualizerWrapper from './ChartScatterVisualizerWrapper.vue';

jest.mock('@inb/oeb-chart-scatter');
// eslint-disable-next-line
import { load_scatter_visualization } from '@inb/oeb-chart-scatter';

const factory = () => {
	return shallowMount(ChartScatterVisualizerWrapper, {
		...createComponentMocks({}),
		propsData,
	});
};

const propsData = { id: 'someid' };

describe('ChartScatterVisualizerWrapper', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('is calls load_scatter_visualization after mount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
		expect(load_scatter_visualization).toHaveBeenCalled();
	});

	it('sets the apiUrl according to SCIENTIFIC_SERVICE_URL env var', () => {
		const wrapper = factory();
		expect(wrapper.vm.$data.apiUrl).toBe(
			'https://jest-openebench.bsc.es/api/scientific/graphql'
		);
	});
});
