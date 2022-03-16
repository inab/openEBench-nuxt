import { shallowMount } from '@vue/test-utils';
import ChartBarplotVisualizerWrapper from './ChartBarplotVisualizerWrapper.vue';

jest.mock('@inb/oeb-chart-Barplot');
// eslint-disable-next-line
import { load_bars_visualization } from '@inb/oeb-chart-Barplot';

const factory = () => {
	return shallowMount(ChartBarplotVisualizerWrapper, {
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

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('is calls load_bars_visualization after mount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
		expect(load_bars_visualization).toHaveBeenCalled();
	});
});
