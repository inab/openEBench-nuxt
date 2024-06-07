import { mount } from '@vue/test-utils';
import LoaderChartWidgets from './LoaderChartWidgets.vue';

const factory = (propsData) => {
	return mount(LoaderChartWidgets, {
		propsData: {
			...propsData,
		},
	});
};

describe('LoaderChartWidgets', () => {
	// Test to check if LoaderChartWidgets component renders correctly when data is provided
	it('renders correctly when data is provided', async () => {
		const data = {
			_id: '123',
			dates: ['2024-06-07', '2024-06-08'],
			dataset_contact_ids: ['id1', 'id2'],
			datalink: {
				inline_data: {
					visualization: {
						type: 'bar-plot',
						metric: 'metric-1',
						x_axis: 'x-axis',
						y_axis: 'y-axis',
					},
					challenge_participants: [
						{
							tool_id: 'tool-1',
							metric_value: 10,
							stderr: 1,
						},
						{
							tool_id: 'tool-2',
							metric_value: 20,
							stderr: 2,
						},
					],
				},
			},
		};

		const wrapper = factory({ data });
		await wrapper.vm.$nextTick();

		// Assert that the component exists and the LoaderWidgets component is rendered
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.findComponent({ name: 'LoaderWidgets' }).exists()).toBe(
			true
		);
	});

	// Test to check if LoaderChartWidgets component renders correctly when no data is provided
	it('renders correctly when no data is provided', async () => {
		const wrapper = factory({ data: null });
		await wrapper.vm.$nextTick();

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.findComponent({ name: 'LoaderWidgets' }).exists()).toBe(
			false
		);
	});
});
