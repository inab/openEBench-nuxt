export const SearchTools = {
	methods: {
		triggerSearch(value) {
			// Just navigate (with no filter params, so a new search starts clean).
			// The search page's $route.query watcher seeds the facets and runs the
			// search — this is the single trigger point.
			//
			// `searchIn` must reflect the actually selected categories (not a fixed
			// list): the watcher only fires when the URL changes, so if the term is
			// unchanged but the user narrowed the categories, a hardcoded value would
			// produce an identical URL and the search would never re-run.
			const selected = this.$store.getters['tool/visibleCategories'];
			const searchIn =
				selected && selected.length > 0
					? selected.join(',')
					: 'name,description,topics,operations';
			const navigation = this.$router.push({
				path: '/tool/search',
				query: {
					q: value,
					searchIn,
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
