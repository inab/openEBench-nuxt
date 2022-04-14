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
};
