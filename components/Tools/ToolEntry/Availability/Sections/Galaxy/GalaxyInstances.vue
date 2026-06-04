<template>
	<v-row class="mt-0 pt-0 mb-2">
		<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
			<div class="text-subtitle d-flex justify-start align-center">
				<div class="title-label">Galaxy</div>
			</div>
		</v-col>
		<v-col
			cols="12"
			class="mt-0 pt-1 pb-0 mb-0 pl-8 d-flex justify-left text-body-2"
		>
			<span class="mb-4 mt-2">
				{{ tool.label[0] }} is available ready-to-use in
				<a href="https://usegalaxy.eu/" target="_blank"> GalaxyEU</a>.
			</span>
		</v-col>
	</v-row>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'GalaxyInstances',
	components: {},
	data() {
		return {
			galaxyIcon: require('@/static/icons/galaxy-logo-black.png'),
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
	},
};
</script>

<style scoped>
.title-label {
	font-size: 1.2rem !important;
	color: rgba(0, 0, 0, 50%);
	font-weight: 500;
	margin-bottom: 8px;
}
</style>
