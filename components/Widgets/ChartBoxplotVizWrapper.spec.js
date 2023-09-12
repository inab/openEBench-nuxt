import { shallowMount } from '@vue/test-utils';
import {
	ChartBoxplotVizWrapper,
	loadBoxplotVisualization,
} from './ChartBoxplotVizWrapper.vue';

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

	/* it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	}); */

	it('is calls loadBoxplotVisualization after mount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
		expect(loadBoxplotVisualization).toHaveBeenCalled();
	});

	it('sets the apiUrl according to SCIENTIFIC_SERVICE_URL env var', () => {
		const wrapper = factory();
		expect(wrapper.vm.$data.apiUrl).toBe(
			'https://openebench.bsc.es/api/scientific/widget/box-plot/OEBD01000000Q2?log2=true'
		);
	});
});
