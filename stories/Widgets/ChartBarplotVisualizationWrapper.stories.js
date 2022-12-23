import ChartBarplotVisualizerWrapper from '~/components/Widgets/ChartBarplotVisualizerWrapper';

export default {
	title: 'Widgets/ChartBarplotVisualizerWrapper',
};

export const ChartBarplotVisualizer = (_args, { argTypes }) => ({
	components: { ChartBarplotVisualizerWrapper },
	props: Object.keys(argTypes),
	template: `
	<div>
		<p>Info: Reload page after changing the ID below.</p>
		<chart-barplot-visualizer-wrapper v-bind="$props"/>
	</div>
	`,
});

ChartBarplotVisualizer.args = {
	id: 'OEBD003000002S',
	metricName: 'Metric Name',
	data: [
		{
			toolname: 'Ensemble_1',
			metric_value: 0.562,
		},
		{
			toolname: 'Ensemble_2',
			metric_value: 0.556,
		},
		{
			toolname: 'Ensemble_3',
			metric_value: 0.5539999999999999,
		},
		{
			toolname: 'Ensemble_4',
			metric_value: 0.517,
		},
		{
			toolname: 'Ensemble_5',
			metric_value: 0.506,
		},
		{
			toolname: 'Kernel_1',
			metric_value: 0.583,
		},
		{
			toolname: 'Kernel_2',
			metric_value: 0.5589999999999999,
		},
		{
			toolname: 'Kernel_3',
			metric_value: 0.5529999999999999,
		},
		{
			toolname: 'Kernel_4',
			metric_value: 0.5489999999999999,
		},
		{
			toolname: 'Nonlinear_reg_1',
			metric_value: 0.5770000000000001,
		},
		{
			toolname: 'Nonlinear_reg_10',
			metric_value: 0.5379999999999999,
		},
		{
			toolname: 'Nonlinear_reg_11',
			metric_value: 0.524,
		},
		{
			toolname: 'Nonlinear_reg_2',
			metric_value: 0.569,
		},
		{
			toolname: 'Nonlinear_reg_3',
			metric_value: 0.565,
		},
		{
			toolname: 'Nonlinear_reg_4',
			metric_value: 0.564,
		},
		{
			toolname: 'Nonlinear_reg_5',
			metric_value: 0.5589999999999999,
		},
		{
			toolname: 'Nonlinear_reg_6',
			metric_value: 0.551,
		},
		{
			toolname: 'Nonlinear_reg_7',
			metric_value: 0.5479999999999999,
		},
		{
			toolname: 'Nonlinear_reg_8',
			metric_value: 0.5479999999999999,
		},
		{
			toolname: 'Nonlinear_reg_9',
			metric_value: 0.544,
		},
		{
			toolname: 'Other_1',
			metric_value: 0.57,
		},
		{
			toolname: 'Other_2',
			metric_value: 0.5529999999999999,
		},
		{
			toolname: 'Other_3',
			metric_value: 0.5529999999999999,
		},
		{
			toolname: 'Other_4',
			metric_value: 0.531,
		},
		{
			toolname: 'Other_5',
			metric_value: 0.528,
		},
		{
			toolname: 'Other_6',
			metric_value: 0.521,
		},
		{
			toolname: 'PLS_PC_reg_1',
			metric_value: 0.562,
		},
		{
			toolname: 'PLS_PC_reg_2',
			metric_value: 0.5429999999999999,
		},
		{
			toolname: 'PLS_PC_reg_3',
			metric_value: 0.535,
		},
		{
			toolname: 'PLS_PC_reg_4',
			metric_value: 0.524,
		},
		{
			toolname: 'Sparse_reg_1',
			metric_value: 0.564,
		},
		{
			toolname: 'Sparse_reg_10',
			metric_value: 0.531,
		},
		{
			toolname: 'Sparse_reg_11',
			metric_value: 0.527,
		},
		{
			toolname: 'Sparse_reg_12',
			metric_value: 0.519,
		},
		{
			toolname: 'Sparse_reg_13',
			metric_value: 0.517,
		},
		{
			toolname: 'Sparse_reg_14',
			metric_value: 0.485,
		},
		{
			toolname: 'Sparse_reg_2',
			metric_value: 0.564,
		},
		{
			toolname: 'Sparse_reg_3',
			metric_value: 0.564,
		},
		{
			toolname: 'Sparse_reg_4',
			metric_value: 0.551,
		},
		{
			toolname: 'Sparse_reg_5',
			metric_value: 0.539,
		},
		{
			toolname: 'Sparse_reg_6',
			metric_value: 0.539,
		},
		{
			toolname: 'Sparse_reg_7',
			metric_value: 0.532,
		},
		{
			toolname: 'Sparse_reg_8',
			metric_value: 0.531,
		},
		{
			toolname: 'Sparse_reg_9',
			metric_value: 0.531,
		},
	],
};
