import { mount } from '@vue/test-utils';
import ClassificationTableWrapper from './ClassificationTableWrapper.vue';

jest.mock('@inb/oeb-classification-table');
// eslint-disable-next-line
import { run_summary_table } from '@inb/oeb-classification-table';

const factory = () => {
	return mount(ClassificationTableWrapper, {
		...createComponentMocks({}),
		propsData,
	});
};

const propsData = {
	id: 'testid',
	debounce: 0,
};

describe('ClassificationTableWrapper', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('is instantiated', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
	});

	it('is calls run_summary_table after mount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();
		expect(run_summary_table).toHaveBeenCalled();
	});

	it('should execute debounceFunction and call loadTable when filterArray prop changes', async () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();

		wrapper.vm.debouncedFilterArrayWatch = jest.fn();
		expect(wrapper.vm.debouncedFilterArrayWatch).not.toHaveBeenCalled();

		await wrapper.setProps({ filterArray: ['testId'] });
		expect(wrapper.vm.debouncedFilterArrayWatch).toHaveBeenCalled();
	});

	it('should cancel the debounce at unmount', () => {
		const wrapper = factory();
		expect(wrapper).toBeTruthy();

		wrapper.vm.debouncedFilterArrayWatch.cancel = jest.fn();
		wrapper.destroy();
		expect(wrapper.vm.debouncedFilterArrayWatch.cancel).toHaveBeenCalled();
	});
});
