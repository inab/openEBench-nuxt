import { shallowMount } from '@vue/test-utils';
import ChartBoxplotVizWrapper from './ChartBoxplotVizWrapper.vue';

const factory = () => {
	return shallowMount(ChartBoxplotVizWrapper, {
		...createComponentMocks({}),
		propsData,
	});
};

const propsData = { id: 'someid' };

describe('ChartBoxplotVizWrapper', () => {
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
			// 'https://jest-openebench.bsc.es/api/scientific/graphql'
			'https://openebench.bsc.es/api/scientific/widget/box-plot/OEBD0100000013?log2=true'
		);
	});
});
