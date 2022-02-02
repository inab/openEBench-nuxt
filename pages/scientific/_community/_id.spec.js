import { mount } from '@vue/test-utils';
import Community from './_id.vue';

const factory = () => {
	return mount(Community, {
		...createComponentMocks({}),
		mocks: {
			$route: { params: { community: 'TESTCOMMUNITY', id: 'TESTID' } },
			$config: { OEB_LEGACY_ANGULAR_URI: 'https://jest-openebench.bsc.es/' },
		},
	});
};

describe('Community Participant', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('sets the iframe url according to env variable', () => {
		const wrapper = factory();
		expect(wrapper.vm.hostName).toBe('https://jest-openebench.bsc.es/');
		expect(wrapper.find('iframe').attributes('src')).toBe(
			'https://jest-openebench.bsc.es/scientific/TESTCOMMUNITY/TESTID'
		);
	});
});
