import { mount } from '@vue/test-utils';
import Team from './team.vue';
import membersData from '@/static/members/members.json';

const factory = () => {
	return mount(Team, {
		...createComponentMocks({}),
	});
};

describe('Team', () => {
	// Test to check if the component is instantiated correctly
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper.exists()).toBeTruthy();
	});

	// Test to check if the correct title and introductory paragraphs are rendered
	it('renders correct title and introductory paragraphs', () => {
		const wrapper = factory();
		expect(wrapper.find('h1').text()).toBe('The Team of OpenEBench');

		const paragraphs = wrapper.findAll('p');
		expect(paragraphs.at(0).text()).toContain('current and');
		expect(paragraphs.at(1).text()).toContain('ELIXIR Open');
		expect(paragraphs.at(2).text()).toContain('committed group');
	});

	// Test to check if the Leaders section renders with the correct number of members
	it('renders Leaders section with correct number of members', () => {
		const wrapper = factory();
		const leaderSection = wrapper.find('.section-title-border');
		expect(leaderSection.text()).toBe('Leaders');

		const leaderCards = wrapper.findAllComponents({ name: 'MemberCard' });
		const leadersData = membersData.Members.filter((member) =>
			member.roles.includes('Leadership')
		);
		expect(leaderCards.length).toBe(leadersData.length);
	});

	// Test to check if the Group Members section renders with the correct number of members
	it('renders Group Members section with correct number of members', () => {
		const wrapper = factory();
		const groupMembersSection = wrapper.findAll('.section-title-border').at(1);
		expect(groupMembersSection.text()).toBe('Group Members');

		const memberCards = wrapper.findAllComponents({ name: 'MemberCard' });
		const groupMembersData = membersData.Members.filter(
			(member) => !member.roles.includes('Leadership')
		);
		expect(memberCards.length).toBe(groupMembersData.length);
	});

	// Test to check if the Alumni section renders with the correct number of members
	it('renders Alumni section with correct number of members', () => {
		const wrapper = factory();
		const alumniSection = wrapper.find('h2');
		expect(alumniSection.text()).toBe('The OpenEBench Alumni network');

		const alumniCards = wrapper.findAllComponents({ name: 'AlumniCard' });
		expect(alumniCards.length).toBe(membersData.Alumni.length);
	});
});
