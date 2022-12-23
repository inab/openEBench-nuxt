import { mount } from '@vue/test-utils';
import Tools from './index.vue';

const factory = (query) => {
	return mount(Tools, {
		...createComponentMocks({ mocks: { $route: query } }),
	});
};

const emptyQueryMock = { query: { search: '' } };
const queryString = 'search_query';
const queryMock = { query: { search: queryString } };

describe('Tools Index', () => {
	it('is instantiated', () => {
		const wrapper = factory(emptyQueryMock);
		expect(wrapper).toBeTruthy();
	});

	it('sets the iframe url according to env variable', () => {
		const wrapper = factory(emptyQueryMock);
		expect(wrapper.vm.hostName).toBe('https://jest-openebench.bsc.es/');
		expect(wrapper.find('iframe').attributes('src')).toBe(
			'https://jest-openebench.bsc.es/tool?search='
		);
	});

	it('sets the iframe url according to env variable with search param if given in query', () => {
		const wrapper = factory(queryMock);
		expect(wrapper.vm.hostName).toBe('https://jest-openebench.bsc.es/');
		expect(wrapper.find('iframe').attributes('src')).toBe(
			'https://jest-openebench.bsc.es/tool?search=' + queryString
		);
	});
});
