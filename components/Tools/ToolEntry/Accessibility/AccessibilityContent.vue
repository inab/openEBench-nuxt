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
			return 'REST API';
			// keep the rest
			/*
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
					return '';
			}
			*/
		},
		urlFormatter() {
			// TODO: this way of getting id will break the ap for some tools.

			const version = this.tool.version[0];
			// get domain of first webpage in tool.webpage
			const domain = this.tool.webpage[0].term.split('/')[2];

			const url = `biotools:${this.tool.name}:${version}/${this.tool.type}/${domain}`;

			return url;
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
