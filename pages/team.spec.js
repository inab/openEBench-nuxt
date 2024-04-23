import { mount } from '@vue/test-utils';
import Team from './team.vue';

const factory = () => {
	return mount(Team, {
		...createComponentMocks({}),
	});
};

describe('Team', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
