import { shallowMount } from '@vue/test-utils';
import ChartBarplotVisualizerWrapper from './ChartBarplotVisualizerWrapper.vue';

jest.mock('@inb/oeb-classification-table');
// eslint-disable-next-line
import { load_barplot_visualization } from '@inb/oeb-chart-Barplot';

const factory = (methods) => {
	return shallowMount(ChartBarplotVisualizerWrapper, {
		...createComponentMocks({}),
		propsData,
		methods,
	});
};

const propsData = { id: 'someid' };

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
});
