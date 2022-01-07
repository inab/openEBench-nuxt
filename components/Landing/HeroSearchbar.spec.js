import { mount } from '@vue/test-utils';
import HeroSearchbar from './HeroSearchbar.vue';

const factory = () => {
	return mount(HeroSearchbar, {
		...createComponentMocks({
			vuetify: true,
		}),
		mocks: {
			$router: { push: jest.fn() },
		},
	});
};

describe('HeroSearchbar', () => {
	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('should match snapshot', () => {
		const wrapper = factory();
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should push router to tools page on button click', () => {
		const wrapper = factory();

		const submitBtn = wrapper.find('[data-testid="submit-button"]');
		expect(submitBtn.exists()).toBe(true);

		submitBtn.vm.$emit('click');
		expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
			path: 'tools',
			query: { search: '' },
		});
	});

	it('should push router to tools page on enter press in input field', async () => {
		const wrapper = factory();

		const searchInput = wrapper.find('[data-testid="input-field"]');
		expect(searchInput.exists()).toBe(true);

		await searchInput.trigger('keyup.enter');

		expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
			path: 'tools',
			query: { search: '' },
		});
	});

	it('should push router to tools with query on button click', () => {
		const wrapper = factory();

		const submitBtn = wrapper.find('[data-testid="submit-button"]');
		expect(submitBtn.exists()).toBe(true);

		const searchInput = wrapper.find('[data-testid="input-field"]');
		expect(searchInput.exists()).toBe(true);
		searchInput.setValue('Random Tool Name');

		submitBtn.vm.$emit('click');

		expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
			path: 'tools',
			query: { search: 'Random Tool Name' },
		});
	});
});
