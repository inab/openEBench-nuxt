import { shallowMount } from '@vue/test-utils';
import MaintenanceNotice from '@/components/Molecules/MaintenanceNotice.vue';

describe('MaintenanceNotice', () => {
	it('should show the message when current date is within the range', () => {
		jest.useFakeTimers().setSystemTime(new Date('2024-10-19T10:00:00+02:00'));
		const wrapper = shallowMount(MaintenanceNotice);
		expect(wrapper.vm.isMessageVisible).toBe(true);
	});

	it('should not show the message when current date is outside the range', () => {
		jest.useFakeTimers().setSystemTime(new Date('2024-10-25T10:00:00+02:00'));
		const wrapper = shallowMount(MaintenanceNotice);
		expect(wrapper.vm.isMessageVisible).toBe(false);
	});
});
