<template>
	<div>
		<!--When list expanded, show btn to collapse at top-->
		<div v-if="displayAll && items.length > 20" id="upper-collapse-btn">
			<v-btn
				x-small
				color="grey lighten-4"
				elevation="0"
				class="float-end mt-2 mb-2"
				@click="displayAll = !displayAll"
				><v-icon color="grey-darken-1" small
					>mdi-chevron-double-up</v-icon
				></v-btn
			>
		</div>

		<div>
			<CheckboxFilter :items="items.slice(0, 5)" :property="property" />
		</div>

		<!--If more than 5 items, add "expand" btn and remaining items hiden until btn clicked -->

		<div v-if="items.length > 5">
			<v-btn
				v-if="!displayAll"
				x-small
				color="grey lighten-4"
				elevation="0"
				class="float-end mt-2"
				@click="displayAll = !displayAll"
				><v-icon color="grey-darken-1" small
					>mdi-chevron-double-down</v-icon
				></v-btn
			>

			<div v-if="displayAll">
				<CheckboxFilter :items="items.slice(5)" :property="property" />

				<v-btn
					x-small
					color="grey lighten-4"
					elevation="0"
					class="float-end mt-2"
					@click="displayAll = !displayAll"
					><v-icon color="grey-darken-1" small
						>mdi-chevron-double-up</v-icon
					></v-btn
				>
			</div>
		</div>
	</div>
</template>
<script>
import CheckboxFilter from './CheckboxFilter.vue';

export default {
	name: 'CheckboxFilterExpand',
	components: {
		CheckboxFilter,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},
		property: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			displayAll: false,
		};
	},
};
</script>
<style scoped>
#upper-collapse-btn {
	display: block;
	clear: both;
}
</style>
