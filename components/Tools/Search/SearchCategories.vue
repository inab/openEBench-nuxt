<template>
	<v-chip-group
		v-model="searchingIn"
		column
		multiple
		class="ml-2"
		active-class="white--text"
	>
		<v-chip
			v-for="(label, i) in categories"
			:key="i"
			filter
			outlined
			class="search-chip"
		>
			{{ label }}
		</v-chip>
	</v-chip-group>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'SearchCategories',
	data() {
		return {
			searchingIn: [0, 1, 2, 3],
			categories: ['Name', 'Description', 'Topics', 'Operations'],
			equivalencies: {
				0: 'name',
				1: 'description',
				2: 'topics',
				3: 'operations',
			},
		};
	},
	computed: {
		...mapGetters('tool', {
			searchedTerm: 'searchedTerm',
		}),
	},
	watch: {
		searchingIn(newVal) {
			// Prevent deselecting all chips — keep at least one active
			if (newVal.length === 0) {
				this.$nextTick(() => {
					this.searchingIn = [0]; // fallback to Tool Name
				});
				return;
			}

			this.$emit('selection-change', this.searchingInLabels(newVal));

			if (!this.searchedTerm) return;

			this.$store.dispatch(
				'tool/updateVisibleCategories',
				this.searchingInCategories(newVal)
			);
			this.$store.dispatch('tool/searchTools');
		},
	},
	mounted() {
		this.$emit('selection-change', this.searchingInLabels(this.searchingIn));
	},
	methods: {
		searchingInCategories(newVal) {
			return Object.entries(this.equivalencies)
				.filter(([key]) => newVal.includes(parseInt(key)))
				.map(([, val]) => val);
		},
		searchingInLabels(newVal) {
			return this.categories.filter((_, index) => newVal.includes(index));
		},
	},
};
</script>

<style scoped>
::v-deep .v-chip {
	border-color: rgba(255, 255, 255, 70%) !important;
	color: white !important;
	background: transparent !important;
}

::v-deep .v-chip--active {
	border-color: white !important;
	background: rgba(255, 255, 255, 15%) !important;
}

::v-deep .v-chip .v-chip__filter {
	color: white !important;
}

::v-deep .v-icon {
	color: white !important;
}
</style>
