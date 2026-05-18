<template>
	<v-chip-group
		v-model="searchingIn"
		column
		multiple
		class="ml-4"
		active-class="primary--text"
		:disabled="!isSearchActive"
		:class="{ 'disabled-chip': !isSearchActive }"
	>
		<v-chip filter outlined>
			Tool Name
			<span class="ml-1" v-if="showCounts">
				(<b>{{ counts.name }}</b
				>)</span
			>
		</v-chip>
		<v-chip filter outlined>
			Tool Description
			<span class="ml-1" v-if="showCounts">
				(<b>{{ counts.description }}</b
				>)</span
			>
		</v-chip>
		<v-chip filter outlined>
			Associated Topics
			<span class="ml-1" v-if="showCounts">
				(<b>{{ counts.topics }}</b
				>)</span
			>
		</v-chip>
		<v-chip filter outlined>
			Associated Operations
			<span class="ml-1" v-if="showCounts">
				(<b>{{ counts.operations }}</b
				>)</span
			>
		</v-chip>
		<v-chip filter outlined>
			Publication Title
			<span class="ml-1" v-if="showCounts">
				(<b>{{ counts.publication_title }}</b
				>)</span
			>
		</v-chip>
		<v-chip filter outlined>
			Publication Abstract
			<span class="ml-1" v-if="showCounts">
				(<b>{{ counts.publication_abstract }}</b
				>)</span
			>
		</v-chip>
	</v-chip-group>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'SearchCategories',
	props: {
		counts: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			searchingIn: [0, 1, 2, 3, 4, 5],
			equivalencies: {
				0: 'name',
				1: 'description',
				2: 'topics',
				3: 'operations',
				4: 'publication_title',
				5: 'publication_abstract',
			},
		};
	},
	computed: {
		...mapGetters('tool', {
			visibleTools: 'tools',
			searchedTerm: 'searchedTerm',
		}),
		showCounts() {
			return (
				this.searchedTerm && this.counts && Object.keys(this.counts).length > 0
			);
		},
		isSearchActive() {
			return this.searchedTerm && this.searchedTerm.length > 0;
		},
	},
	watch: {
		searchingIn(newVal) {
			if (!this.isSearchActive) return;
			// Update the visible categories in store
			this.$store.dispatch(
				'tool/updateVisibleCategories',
				this.searchingInCategories(newVal)
			);

			// Update the visible tools in store
			this.$store.dispatch('tool/searchTools');
		},
	},
	methods: {
		searchingInCategories() {
			const searchingInCatgs = [];
			for (const key in this.equivalencies) {
				if (this.searchingIn.includes(parseInt(key))) {
					searchingInCatgs.push(this.equivalencies[key]);
				}
			}
			return searchingInCatgs;
		},
	},
};
</script>

<style>
.disabled-chip {
	opacity: 0.5;
	pointer-events: none;
	cursor: not-allowed !important;
}
</style>
