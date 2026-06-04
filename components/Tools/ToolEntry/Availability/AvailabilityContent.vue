<template>
	<v-container class="mt-0 pt-0 pl-8">
		<UpTime />
		<GalaxyInstances />
		<InstallationInstructions />
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import UpTime from './Sections/Uptime/UpTime.vue';
import GalaxyInstances from './Sections/Galaxy/GalaxyInstances.vue';
import InstallationInstructions from './Sections/Installation/InstallationInstructions.vue';

export default {
	name: 'AvailabilityContent',
	components: {
		UpTime,
		GalaxyInstances,
		InstallationInstructions,
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
	},
};
</script>
