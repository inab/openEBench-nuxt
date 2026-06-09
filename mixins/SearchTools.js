export const SearchTools = {
	methods: {
		triggerSearch(value) {
			// Just navigate (with no filter params, so a new search starts clean).
			// The search page's $route.query watcher seeds the facets and runs the
			// search — this is the single trigger point.
			const navigation = this.$router.push({
				path: '/tool/search',
				query: {
					q: value,
					searchIn: 'name,label,description,topics,operations',
					page: 0,
				},
			});

			if (navigation && typeof navigation.catch === 'function') {
				navigation.catch(() => {});
			}
		},
		search(q) {
			this.$store.dispatch('tool/updateSearchedTerm', q);
			this.$store.dispatch('tool/searchTools');
		},
		async loadLanding() {
			this.$store.dispatch('tool/updateSearchedTerm', '');
			await this.$store.dispatch('tool/initialSearch', '');
		},
	},
};
