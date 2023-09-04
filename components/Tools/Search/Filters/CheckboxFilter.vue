<template>
	<div>
		<StripeStats
			v-for="(item, i) in items"
			:key="i"
			:label="item.label"
			:count="item.count"
			:percent="item.percent"
			:active="active.includes(i)"
			@update:active="updateActive(i)"
		/>
	</div>
</template>
<script>
import StripeStats from './StripeStats.vue';

export default {
	name: 'CheckboxFilter',
	components: {
		StripeStats,
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
			active: [],
		};
	},
	methods: {
		updateActive(i) {
			// add or remove index from active array
			if (this.active.includes(i)) {
				this.active.splice(this.active.indexOf(i), 1);
			} else {
				this.active.push(i);
			}
			// values are items from items array whose index is in active array
			const payload = {
				property: this.property,
				values: this.active.map((i) => this.items[i].value),
			};

			this.$store.dispatch('tool/updateFilters', payload);
			this.$store.dispatch('tool/searchTools');
		},
	},
};
</script>
