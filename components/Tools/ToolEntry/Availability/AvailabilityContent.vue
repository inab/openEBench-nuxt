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
		// ✅ inside computed
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
	watch: {
		'tool.type': {
			immediate: true,
			handler() {
				const webpages =
					this.tool.webpage?.map((w) => w?.term).filter(Boolean) || [];
				const uniqueDomains = [
					...new Set(webpages.map((url) => new URL(url).hostname)),
				];
				console.log('tool.type:', this.tool.type);
				console.log('accessibilityLabel:', this.accessibilityLabel);
				console.log('webpage URLs found:', webpages);
				console.log('unique domains:', uniqueDomains);
				console.log('same domain?:', uniqueDomains.length === 1);
			},
		},
	},
	methods: {
		galaxyAvailable() {
			// todo: check if galaxy instances are available for this tool
			return true;
		},
		installationAvailable() {
			// todo: check if installation instructions are available for this tool
			return true;
		},
	},
};
</script>
