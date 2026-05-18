export const SearchTools = {
	methods: {
		triggerSearch(value) {
			this.$store.dispatch('tool/initialSearch', value);
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
			this.$store.dispatch('tool/updateSearchedTerm', q);
			this.$store.dispatch('tool/searchTools');
		},
		async loadLanding() {
			this.$store.dispatch('tool/updateSearchedTerm', '');
			await this.$store.dispatch('tool/initialSearch', '');
		},
	},
};
