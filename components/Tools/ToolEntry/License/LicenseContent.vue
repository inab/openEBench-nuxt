<template>
	<v-container class="mt-0 pt-0 pl-8">
		<div v-if="tool.license" class="mt-2 pt-0 mb-2 ml-5">
			<!--License Cards-->
			<!--LicenseRow
				v-for="item in tool.license"
				:key="item.id"
				:name="item.term.name"
				:url="item.term.url"
			/-->
		</div>
		<v-row v-else justify="left" class="mt-0 pt-0 mb-2">
			<v-alert
				dense
				icon="mdi-scale-balance"
				color="grey"
				text
				class="ml-5 mt-3"
			>
				License information not available
			</v-alert>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'LicenseContent',
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
		}),
	},
};
</script>
