export const SearchTools = {
	methods: {
		triggerSearch(value) {
			this.$router.push({
				path: '/tool/search',
				query: { q: value },
			});
		},
		search(q) {
			// Cleaning results?
			// Set searched term
			this.$store.dispatch('tool/updateSearchedTerm', q);

			// Make request to API
			this.$store.dispatch('tool/searchTools', q);
		},
	},
};
