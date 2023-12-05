<template>
	<v-container class="mt-0 pt-0 pl-8">
		<v-row v-if="tool.license" class="mt-0 pt-0 mb-2"> Hello </v-row>
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
