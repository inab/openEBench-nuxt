import { mount } from '@vue/test-utils';
import ChartBarplotVisualizerWrapper from './ChartBarplotVisualizerWrapper.vue';

jest.mock('@inb/oeb-classification-table');
// eslint-disable-next-line
import { load_barplot_visualization } from '@inb/oeb-chart-Barplot';

const factory = () => {
	return mount(ChartBarplotVisualizerWrapper, {
		...createComponentMocks({}),
		propsData,
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

	it('is calls load_Barplot_visualization after mount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
		expect(load_barplot_visualization).toHaveBeenCalled();
	});
});
