import { shallowMount } from '@vue/test-utils';
import ChartBarplotVisualizerWrapper from './ChartBarplotVisualizerWrapper.vue';

jest.mock('@inb/oeb-chart-barplot');
// eslint-disable-next-line
import { load_bars_visualization } from '@inb/oeb-chart-barplot';

const factory = () => {
	return shallowMount(ChartBarplotVisualizerWrapper, {
		...createComponentMocks({}),
		propsData,
	});
};

const propsData = {
	id: 'someid',
	data: [
		{
			toolname: 'group01',
			mode: 'lines',
			type: 'bar-plot',
			metric_value: 0.936,
		},
		{
			toolname: 'group02',
			mode: 'lines',
			type: 'bar-plot',
			metric_value: 0.9279,
		},
	],
	metricName: 'Metric Name',
};

describe('ChartBarplotVisualizerWrapper', () => {
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

	it('is calls load_bars_visualization after mount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
		expect(load_bars_visualization).toHaveBeenCalled();
	});

	it('sets the apiUrl according to SCIENTIFIC_SERVICE_URL env var', () => {
		const wrapper = factory();
		expect(wrapper.vm.$data.apiUrl).toBe(
			'https://jest-openebench.bsc.es/api/scientific/graphql'
		);
	});
});
