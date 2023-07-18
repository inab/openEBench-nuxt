import ToolCard from '~/components/Tools/Result/Card/ToolCard.vue';

export default {
	title: 'Molecules/Tools/Result/Card/ToolCard',
};

export const List = (_args, { argTypes }) => ({
	components: { ToolCard },
	props: Object.keys(argTypes),
	template: `
		<v-row>
			<v-col cols=11>
				<tool-card v-bind="$props"/>
			</v-col>
		</v-row>
	`,
});

List.args = {};

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
