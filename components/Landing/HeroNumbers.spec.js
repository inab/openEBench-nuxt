import { shallowMount } from '@vue/test-utils';
import HeroNumbers from './HeroNumbers.vue';

const factory = (propsData) => {
	return shallowMount(HeroNumbers, {
		...createComponentMocks({}),
		mocks: {
			$vuetify: { breakpoint: {} },
		},
		propsData,
	});
};

const propsData = {
	toolsCount: 10,
	communityCount: 5,
	resourcesCount: 20,
};

describe('HeroNumbers', () => {
	it('is instantiated', () => {
		const wrapper = factory(propsData);
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory(propsData);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should have a container height of 350 on small devices', async () => {
		const wrapper = factory(propsData);

		wrapper.vm.$vuetify.breakpoint.xs = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.containerHeight).toBe(450);
	});

	it('should have a container height of 170 on bigger devices', async () => {
		const wrapper = factory(propsData);

		wrapper.vm.$vuetify.breakpoint.mdAndUp = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.containerHeight).toBe(170);
	});
});
