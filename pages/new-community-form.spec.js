import { mount } from '@vue/test-utils';
import NewCommunityForm from './new-community-form.vue';

const factory = () => {
	return mount(NewCommunityForm, {
		...createComponentMocks({}),
	});
};

describe('NewCommunityForm', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});
});
