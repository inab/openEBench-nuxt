import { mount } from '@vue/test-utils';
import Admin from './admin.vue';

const factory = () => {
	return mount(Admin, {
		...createComponentMocks({ store: mockStore }),
	});
};

const mockStore = {
	auth: {
		state: () => {
			return { loggedIn: false, user: {} };
		},
	},
};

describe('Admin', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
