import { mount } from '@vue/test-utils';
import Publications from './publications.vue';

const factory = (propsData) => {
	return mount(Publications, {
		propsData: {
			...propsData,
		},
	});
};

describe('Publications', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper.exists()).toBeTruthy();
	});

	it('renders correctly with default props', () => {
		const wrapper = factory();
		expect(wrapper.find('h1').text()).toBe('OpenEBench Publications');
		expect(wrapper.findAll('p').length).toBe(2);
		expect(wrapper.findAll('v-tab').length).toBe(2); // Check the number of tabs
	});

	it('displays Manuscripts tab and content', async () => {
		const wrapper = factory();
		const manuscriptsTab = wrapper.findAll('v-tab').at(0);
		expect(manuscriptsTab.exists()).toBeTruthy(); // Check if Manuscripts tab exists

		// Simulate clicking on the Manuscripts tab
		await manuscriptsTab.trigger('click');
		await wrapper.vm.$nextTick();

		// Check if Manuscripts content is rendered
		expect(
			wrapper.findComponent({ name: 'Manuscripts' }).exists()
		).toBeTruthy();
	});

	it('displays Posters tab and content', async () => {
		const wrapper = factory();
		const postersTab = wrapper.findAll('v-tab').at(1);
		expect(postersTab.exists()).toBeTruthy(); // Check if Posters tab exists

		// Simulate clicking on the Posters tab
		await postersTab.trigger('click');
		await wrapper.vm.$nextTick();

		// Check if Posters content is rendered
		expect(wrapper.find('.poster-grid').exists()).toBeTruthy();
	});

	// You can add more tests here to cover other aspects of the component, like fetching data, toggling tabs, etc.
});
