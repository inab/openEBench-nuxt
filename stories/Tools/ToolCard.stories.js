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
