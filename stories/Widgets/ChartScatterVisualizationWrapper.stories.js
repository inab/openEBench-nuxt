import ChartScatterVisualizerWrapper from '~/components/Widgets/ChartScatterVisualizerWrapper';

export default {
	title: 'Widgets/ChartScatterVisualizerWrapper',
};

export const ChartScatterVisualizer = (_args, { argTypes }) => ({
	components: { ChartScatterVisualizerWrapper },
	props: Object.keys(argTypes),
	template: `
	<div>
		<p>Info: Reload page after changing the ID below.</p>
		<chart-scatter-visualizer-wrapper v-bind="$props"/>
	</div>
	`,
});

ChartScatterVisualizer.args = {
	id: 'OEBD00200001HD',
};
