<template>
	<v-treeview
		v-model="tree"
		:items="items"
		item-key="avatar"
		class="text-body-2 mr-2 mb-1"
		open-all
		open-on-click
	>
		<template #prepend="{ item }">
			<v-chip
				:color="indicatorFullfilled(item.id) ? 'primary' : 'grey darken-2'"
				class="pa-1"
				label
				outlined
				small
			>
				<span class="text-caption pa-0">{{ item.avatar }}</span>
			</v-chip>
		</template>
		<template #label="{ item }">
			<span class="text-body-2 text-wrap">
				{{ item.name }}
			</span>
		</template>
		<template #append="{ item }">
			<v-btn
				v-if="item.info"
				icon
				small
				class="ml-2"
				:href="item.info"
				target="_blank"
			>
				<v-icon small>mdi-information-outline</v-icon>
			</v-btn>
		</template>
	</v-treeview>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'IndicatorsTree',
	props: {
		items: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			tree: [],
			openAll: true,
		};
	},
	computed: {
		...mapGetters({
			FAIRIndicatorsTool:
				'observatory/evaluation/results/getFAIRIndicatorsTool',
		}),
	},
	methods: {
		indicatorFullfilled(indicator) {
			// low-level indicators are boolean
			// high-level indicators are floats or integers
			switch (this.FAIRIndicatorsTool[0][indicator]) {
				case 1:
					return true;
				case 1.0:
					return true;
				case true:
					return true;
				default:
					return false;
			}
		},
	},
};
</script>
