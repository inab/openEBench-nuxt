export const SearchTools = {
	methods: {
		triggerSearch(value) {
			this.$store.dispatch('initialSearch', value);

			this.$router.push({
				path: 'tool/search',
				query: {
					q: value,
					searchIn:
						'name,label,description,topics,operations,publication_title,publication_abstract',
					page: 0,
				},
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
