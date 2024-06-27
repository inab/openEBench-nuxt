import { mount } from '@vue/test-utils';
import CollaborationPage from '@/pages/collaboration.vue';
import CollaboratorsCard from '@/components/Cards/CollaboratorsCard.vue';
import { mockCollaborators } from '@/test/unit/mockData/Collaborators.js';

describe('CollaborationPage.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(CollaborationPage, {
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
					collaborators: mockCollaborators,
				};
			},
		});
	});

	afterEach(() => {
		wrapper.destroy();
	});

	it('should render the page title correctly', () => {
		expect(wrapper.find('h1').text()).toBe('OpenEBench Collaborations');
	});

	it('should render the correct number of CollaboratorsCard components', () => {
		const collaboratorCards = wrapper.findAllComponents(CollaboratorsCard);
		const collaborators = wrapper.vm.sortedCollaborators;
		expect(collaboratorCards.length).toBe(collaborators.length);
	});

	it('should initialize breadcrumbs correctly', () => {
		const breadcrumbs = wrapper.vm.breadcrumbs;
		expect(breadcrumbs).toEqual([
			{ text: 'Home', disabled: false, exact: true, to: '/' },
			{ text: 'About', disabled: true },
			{ text: 'Collaboration', disabled: true },
		]);
	});

	it('should initialize collaborators with the correct structure', () => {
		const collaborators = wrapper.vm.collaborators;
		expect(collaborators).toBeInstanceOf(Array);
		collaborators.forEach((collaborator) => {
			expect(collaborator).toEqual(
				expect.objectContaining({
					title: expect.any(String),
					href: expect.any(String),
					src: expect.any(String),
				})
			);
		});
	});

	it('matches the snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
