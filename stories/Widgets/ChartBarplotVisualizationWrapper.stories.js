import ChartBarplotVisualizerWrapper from '~/components/Widgets/ChartBarplotVisualizerWrapper';

export default {
	title: 'Widgets/ChartBarplotVisualizerWrapper',
};

export const ChartBarplotVisualizer = (_args, { argTypes }) => ({
	components: { ChartBarplotVisualizerWrapper },
	props: Object.keys(argTypes),
	template: `<chart-barplot-visualizer-wrapper id='OEBD003000002S' v-bind="$props"/>`,
});

ChartBarplotVisualizer.args = {
	id: 'OEBD00200001HD',
};
