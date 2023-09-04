<template>
	<v-expansion-panel>
		<v-expansion-panel-header>
			<h3 class="text-overline mt-1">Type of Tool</h3>
		</v-expansion-panel-header>
		<v-expansion-panel-content>
			<CheckboxFilter
				v-for="(item, i) in type_items.slice(0, 4)"
				:key="i"
				:label="item.label"
				:count="item.count"
				:percent="item.percent"
			/>
			<v-btn
				v-if="!displayAll"
				x-small
				text
				outlined
				class="float-end mt-2"
				@click="displayAll = !displayAll"
				><v-icon color="grey-darken-1" small
					>mdi-chevron-double-down</v-icon
				></v-btn
			>

			<div v-if="displayAll">
				<CheckboxFilter
					v-for="(item, i) in type_items.slice(4, -1)"
					:key="i"
					:label="item.label"
					:count="item.count"
					:percent="item.percent"
				/>
				<v-btn
					x-small
					text
					outlined
					class="float-end mt-2"
					@click="displayAll = !displayAll"
					><v-icon color="grey-darken-1" small
						>mdi-chevron-double-up</v-icon
					></v-btn
				>
			</div>
		</v-expansion-panel-content>
		<v-divider></v-divider>
	</v-expansion-panel>
</template>
<script>
import CheckboxFilter from '~/components/Tools/Search/Filters/CheckboxFilter.vue';

export default {
	name: 'TypeFilter',
	components: {
		CheckboxFilter,
	},
	data() {
		return {
			types: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			displayAll: false,
			type_items: [
				{
					type: 'cmd',
					label: 'Command Line Tool',
					count: 3245,
					percent: 0.734,
				},
				{
					type: 'app',
					label: 'Desktop Application',
					count: 154,
					percent: 0.022,
				},
				{
					type: 'web',
					label: 'Web Application',
					count: 234,
					percent: 0.017,
				},
				{
					type: 'lib',
					label: 'Library',
					count: 123,
					percent: 0.009,
				},
				{
					type: 'rest',
					label: 'REST API',
					count: 20,
					percent: 0.01,
				},
				{
					type: 'workflow',
					label: 'Workflow',
					count: 4,
					percent: 0.01,
				},
				{
					type: 'sparql',
					label: 'SPARQL Endpoint',
					count: 0.001,
				},
			],
		};
	},
	methods: {
		updateTypes(value) {
			this.$store.dispatch('tool/updateToolsTypes', value);
		},
	},
};
</script>
