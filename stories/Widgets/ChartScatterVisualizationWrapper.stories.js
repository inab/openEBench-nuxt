import ChartScatterVisualizerWrapper from '~/components/Widgets/ChartScatterVisualizerWrapper';

export default {
	title: 'Widgets/ChartScatterVisualizerWrapper',
};

export const ChartScatterVisualizer = (_args, { argTypes }) => ({
	components: { ChartScatterVisualizerWrapper },
	props: Object.keys(argTypes),
	template: `<chart-scatter-visualizer-wrapper id='OEBD00200001HD' v-bind="$props"/>`,
});

ChartScatterVisualizer.args = {
	id: 'OEBD00200001HD',
};
