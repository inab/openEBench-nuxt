import ToolCard from '~/components/Tools/Search/Card/ToolCard.vue';

export default {
	title: 'Molecules/Tools/Search/Card/ToolCard',
};

export const List = (_args, { argTypes }) => ({
	components: { ToolCard },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=9>
				<tool-card v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

List.args = {
	name: 'Tool name',
	subname: 'Tool subname',
	type: 'web',
	description: 'Tool description',
	topics: [
		{
			term: 'Data identity and mapping',
			uri: 'http://edamontology.org/topic_3345',
			vocabulary: 'EDAM',
		},
	],
	operations: [
		{
			term: 'Data retrieval',
			uri: 'http://edamontology.org/operation_2422',
			vocabulary: 'EDAM',
		},
		{
			term: 'ID mapping',
			uri: 'http://edamontology.org/operation_3282',
			vocabulary: 'EDAM',
		},
	],
	sourcesLabels: {
		biotools: 'https://bio.tools/identifiers.org',
	},
	publications: [
		{
			doi: '10.1101/117812',
			ref_count: 2,
			refs: [
				{
					count: 1,
					year: '1994',
				},
				{
					count: 1,
					year: '2015',
					title:
						'Identifiers for the 21st century: How to design, provision, and reuse persistent identifiers to maximize utility and impact of life science data',
				},
			],
		},
	],
	license: [],
	webpage: ['http://identifiers.org'],
};

export const Card = (_args, { argTypes }) => ({
	components: { ToolCard },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=4>
				<tool-card v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

Card.args = {};
