import ChartBoxplotVizWrapper from '~/components/Widgets/ChartBoxplotVizWrapper';

export default {
	title: 'Widgets/ChartBoxplotVizWrapper',
};

export const ChartBoxplotViz = (_args, { argTypes }) => ({
	components: { ChartBoxplotVizWrapper },
	props: Object.keys(argTypes),
	template: `
	<div>
		<p>Info: Reload page after changing the ID below.</p>
		<chart-boxplot-viz-wrapper v-bind="$props"/>
	</div>
	`,
});

ChartBoxplotViz.args = {
	id: 'OEBD0100000013?log2=true',
};
