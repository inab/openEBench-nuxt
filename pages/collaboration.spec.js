import { mount } from '@vue/test-utils';
import About from './collaboration.vue';

const factory = () => {
	return mount(About, {
		...createComponentMocks({}),
		stubs: {
			'v-container': true,
			'v-row': true,
			'v-col': true,
			'v-img': true,
			'v-card': true,
			'v-divider': true,
		},
	});
};

describe('Collaboration', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('passes the correct props to CollaboratorsCard components', () => {
		const wrapper = factory();
		const collaborators = wrapper.vm.collaborators;
		const cards = wrapper.findAllComponents(CollaboratorsCard);
		cards.wrappers.forEach((card, index) => {
			expect(card.props().title).toBe(collaborators[index].title);
			expect(card.props().href).toBe(collaborators[index].href);
			expect(card.props().src).toBe(collaborators[index].src);
		});
	});
});
