import { shallowMount } from '@vue/test-utils';
import MaintenanceNotice, {
	MAINTENANCE_RANGE,
} from '@/components/Molecules/MaintenanceNotice.vue';

describe('MaintenanceNotice', () => {
	it('should show the message when current date is within the range', () => {
		jest
			.useFakeTimers()
			.setSystemTime(
				new Date(MAINTENANCE_RANGE.start.getTime() + 60 * 60 * 1000)
			);
		const wrapper = shallowMount(MaintenanceNotice);
		expect(wrapper.vm.isMessageVisible).toBe(true);
	});

	it('should not show the message when current date is outside the range', () => {
		jest
			.useFakeTimers()
			.setSystemTime(
				new Date(MAINTENANCE_RANGE.end.getTime() + 60 * 60 * 1000)
			);
		const wrapper = shallowMount(MaintenanceNotice);
		expect(wrapper.vm.isMessageVisible).toBe(false);
	});
});
