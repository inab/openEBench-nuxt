import { shallowMount } from '@vue/test-utils';
import TeamPage from '@/pages/team.vue';
import membersData from '@/static/members/members.json';
import MemberCard from '@/components/Cards/MemberCard.vue';
import AlumniCard from '@/components/Cards/AlumniCard.vue';

describe('TeamPage.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(TeamPage, {
			mocks: {
				$config: {
					OEB_LEGACY_ANGULAR_URI: 'http://example.com',
				},
				$parent: {
					$emit: jest.fn(),
				},
			},
			data() {
				return {
					members: membersData.Members.map((member) => ({
						...member,
						roles: member.roles.map((role) => ({ name: role, hover: false })),
					})),
					alumnis: membersData.Alumni.map((alumni) => ({
						...alumni,
						roles: alumni.roles.map((role) => ({ name: role, hover: false })),
					})),
					isMobile: false,
				};
			},
		});
	});

	afterEach(() => {
		wrapper.destroy();
	});

	it('should include MemberCard and AlumniCard components', () => {
		expect(wrapper.findComponent(MemberCard).exists()).toBe(true);
		expect(wrapper.findComponent(AlumniCard).exists()).toBe(true);
	});

	it('should render the page title correctly', () => {
		expect(wrapper.find('h1').text()).toBe('The Team of OpenEBench');
	});

	it('should render the correct number of MemberCard components for leaders', () => {
		const leaders = wrapper.vm.leaders;
		const leaderCards = wrapper
			.findAllComponents(MemberCard)
			.filter((card) => leaders.includes(card.props().member));
		expect(leaderCards.length).toBe(leaders.length);
	});

	it('should render the correct number of MemberCard components for teammates', () => {
		const teammates = wrapper.vm.teammates;
		const teammateCards = wrapper
			.findAllComponents(MemberCard)
			.filter((card) => teammates.includes(card.props().member));
		expect(teammateCards.length).toBe(teammates.length);
	});

	it('should render the AlumniCard components for alumni', () => {
		const alumniCards = wrapper.findAllComponents(AlumniCard);
		const alumnis = wrapper.vm.alumnis;
		expect(alumniCards.length).toBe(alumnis.length);
	});

	it('should correctly compute leaders and teammates', () => {
		const leaders = wrapper.vm.leaders;
		const teammates = wrapper.vm.teammates;

		expect(
			leaders.every((member) =>
				member.roles.some((role) => role.name === 'Leadership')
			)
		).toBe(true);
		expect(
			teammates.every(
				(member) => !member.roles.some((role) => role.name === 'Leadership')
			)
		).toBe(true);
	});

	it('should check if the device is mobile', () => {
		wrapper.vm.checkMobile();
		expect(wrapper.vm.isMobile).toBe(window.innerWidth <= 850);
	});

	it('matches the snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
