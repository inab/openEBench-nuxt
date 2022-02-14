import CommunityCard from '~/components/Cards/CommunityCard';
import MockCommunity from '~/test/unit/mockData/Community';

export default {
	title: 'Molecules/Communities/CommunityCard',
};

export const CommunityCards = (_args, { argTypes }) => ({
	components: { CommunityCard },
	props: Object.keys(argTypes),
	template: `
	<v-row>
		<v-col cols=4>
			<community-card v-bind="$props"/>
		</v-col>
		<v-col cols=4>
			<community-card v-bind="$props"/>
		</v-col>
		<v-col cols=4>
			<community-card v-bind="$props"/>
		</v-col>
	</v-row>
	`,
});

CommunityCards.args = MockCommunity;
