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
			this.$store.dispatch('tool/updateSearchedTerm', q);
			this.$store.dispatch('tool/searchTools', q);
		},
		async fetchRandomTools() {
			await this.$store.dispatch('tool/fetchRandomTools');
			const randomTools = this.$store.getters['tool/randomTools'];
			console.log('✅ Random tools fetched:', randomTools);
		},
		async loadLanding() {
			await this.$store.dispatch('tool/fetchRandomTools');
			const randomTools = this.$store.getters['tool/randomTools'];
			// Push into the shared tools state so ResultCards renders them
			this.$store.commit('tool/updateTools', randomTools);
			console.log('🏠 Landing tools loaded:', randomTools);
		},
	},
};
