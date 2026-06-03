<template>
	<v-container class="mt-0 pt-0 pl-8">
		<UpTime v-if="accessibilityLabel" :type="accessibilityLabel" />
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
		accessibilityLabel() {
			const allowedTypes = [
				'web',
				'rest',
				'sparql',
				'soap',
				'workbench',
				'suite',
			];
			if (!this.tool.type) return '';
			const labelMap = {
				rest: 'REST API',
				web: 'Web Application',
				suite: 'Suite',
				workbench: 'Workbench',
				sparql: 'SPARQL',
				soap: 'SOAP',
			};
			return this.tool.type
				.filter((t) => allowedTypes.includes(t))
				.map((t) => labelMap[t])
				.join(', ');
		},
	},
	methods: {
		galaxyAvailable() {
			if (!this.tool.source.includes('galaxy')) return false;
			return true;
		},
		installationAvailable() {
			if (
				this.tool.source.includes('bioconda_recipes') ||
				this.tool.source.includes('bioconductor') ||
				this.tool.repository ||
				this.tool.download
			)
				return true;
			return false;
		},
	},
};
</script>
