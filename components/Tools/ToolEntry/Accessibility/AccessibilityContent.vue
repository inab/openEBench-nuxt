<template>
	<v-container class="mt-0 pt-0 pl-8">
		<UpTime v-if="accessibilitySection()" :type="accessibilitySection()" />
		<GalaxyInstances v-if="galaxyAvailable()" />
		<InstallationInstructions v-if="installationAvailable()" />
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import UpTime from './Sections/Uptime/UpTime.vue';
import GalaxyInstances from './Sections/Galaxy/GalaxyInstances.vue';
import InstallationInstructions from './Sections/Installation/InstallationInstructions.vue';

export default {
	name: 'AccessibilityContent',
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
	methods: {
		accessibilitySection() {
			if (!this.tool.webpage?.[0]?.term) {
				return '';
			}

			switch (this.tool.type) {
				case 'rest':
					return 'REST API';
				case 'web':
					return 'Web Application';
				case 'suite':
					return 'Suite';
				case 'workbench':
					return 'Workbench';
				default:
					return 'Webpage';
			}
		},
		galaxyAvailable() {
			// return 'galaxy' in this.tool.sources_labels;
			return true;
		},
		installationAvailable() {
			// TODO: complete this function
			return true;
		},
	},
};
</script>
<style>
.tab {
	font-size: 0.75rem;
}

.v-tabs-items {
	width: 100%;
}

.code {
	font-family: monospace;
	font-size: 0.85rem;
	background-color: #e8e8e8;
	color: black;
	width: 60%;
	border-radius: 5px;
}
</style>
