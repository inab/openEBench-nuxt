import CommunityEventSelectorComponent from '~/components/Communities/CommunityEventSelector.vue';
import CommunityInfoComponent from '~/components/Communities/CommunityInfo.vue';
import CommunityEmptyStateComponent from '~/components/Communities/CommunityEmptyState.vue';
import MockCommunity from '~/test/unit/mockData/Community';
import MockEvent from '~/test/unit/mockData/Event';
import MockEvents from '~/test/unit/mockData/Events';

export default {
	title: 'Molecules/Communities',
};

export const CommunityEmptyState = () => ({
	components: { CommunityEmptyStateComponent },
	template: '<CommunityEmptyStateComponent />',
});

export const CommunityEventSelector = (_args, { argTypes }) => ({
	components: { CommunityEventSelectorComponent },
	props: Object.keys(argTypes),
	template: '<CommunityEventSelectorComponent v-bind="$props" />',
});

CommunityEventSelector.args = { events: MockEvents, currentEvent: MockEvent };

export const CommunityInfo = (_args, { argTypes }) => ({
	components: { CommunityInfoComponent },
	props: Object.keys(argTypes),
	template: '<CommunityInfoComponent v-bind="$props" />',
});

CommunityInfo.args = { community: MockCommunity };
