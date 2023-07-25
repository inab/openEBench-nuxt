<template>
	<v-chip-group
		v-model="searchingIn"
		column
		multiple
		class="ml-4"
		active-class="primary--text"
	>
		<v-chip filter outlined>
			Tool Name (<b>{{ counts.name }}</b
			>)
		</v-chip>
		<v-chip filter outlined>
			Tool Description (<b>{{ counts.description }}</b
			>)
		</v-chip>
		<v-chip filter outlined>
			Associated Topics (<b>{{ counts.topics }}</b
			>)
		</v-chip>
		<v-chip filter outlined>
			Associated Operations (<b>{{ counts.operations }}</b
			>)
		</v-chip>
		<v-chip filter outlined>
			Publication Title (<b>{{ counts.publication_title }}</b
			>)
		</v-chip>
		<v-chip filter outlined>
			Publication Abstract (<b>{{ counts.publication_abstract }}</b
			>)
		</v-chip>
	</v-chip-group>
</template>
<script>
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
		};
	},
	watch: {
		searchingIn(newVal) {
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
			const equivalencies = {
				0: 'name',
				1: 'description',
				2: 'topics',
				3: 'operations',
				4: 'publication_title',
				5: 'publication_abstract',
			};
			const searchingInCatgs = [];
			for (const key in equivalencies) {
				if (this.searchingIn.includes(parseInt(key))) {
					searchingInCatgs.push(equivalencies[key]);
				}
			}
			return searchingInCatgs;
		},
	},
};
</script>
