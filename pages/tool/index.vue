<template>
	<div>
		<div v-for="(item, i) in results" :key="i">{{ item.id }}</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'ToolsMonitoringPage',
	layout: 'embedIframeFullWidth',
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			query: this.$route.query.search ? this.$route.query.search : '',
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'Tools',
					disabled: true,
				},
			],
		};
	},
	computed: {
		...mapGetters('tools', {
			results: 'toolsList',
		}),
	},
	mounted() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		this.$store.dispatch('tools/getTools');
	},
};
</script>
