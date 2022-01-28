import Community from '~/components/Cards/CommunityCard';
import MockCommunity from '~/test/unit/mockData/Community';

export default {
	title: 'Molecules/Communities/CommunityCard',
};

export const CommunityCard = (_args, { argTypes }) => ({
	components: { Community },
	props: Object.keys(argTypes),
	template: '<community v-bind="$props"/>',
});

CommunityCard.args = MockCommunity;
