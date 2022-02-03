import ClassificationTableWrapper from '~/components/Widgets/ClassificationTableWrapper';

export default {
	title: 'Widgets/ClassificationTable',
};

export const ClassificationTable = (_args, { argTypes }) => ({
	components: { ClassificationTableWrapper },
	props: Object.keys(argTypes),
	template: `<classification-table-wrapper id='OEBE0020000000' v-bind="$props"/>`,
});

ClassificationTable.args = {
	filterArray: [
		'OEBX0020000003',
		'OEBX0020000007',
		'OEBX0020000002',
		'OEBX0020000006',
	],
};
