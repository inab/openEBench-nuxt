export default {
	namespaced: true,
	state: () => {
		return {
			searchedTerm: '',
			toolsDisplayCards: false,
			loading: {
				search: false,
			},
			tools: [],
			visibleTools: [],
			counts: {},
			visibleCategories: [
				'name',
				'description',
				'topics',
				'operations',
				'publication_title',
				'publication_abstract',
			],
			EDAMTerms: [],
		};
	},
	actions: {
		updateToolsDisplayCards({ commit }, value) {
			commit('updateToolsDisplayCards', value);
		},
		updateSearchedTerm({ commit }, value) {
			commit('updateSearchedTerm', value);
		},
		updateLoadingSearch({ commit }, value) {
			commit('updateLoadingSearch', value);
		},
		async searchTools({ commit }, q) {
			commit('updateLoadingSearch', true);

			const result = await this.$observatory.$get('/search?q=' + q);

			commit('updateTools', result.tools);

			commit('updateVisibleTools', result.tools);
			commit('updateCounts', result.counts);

			commit('updateLoadingSearch', false);
		},

		updateVisibleCategories({ commit }, value) {
			/* This function is called whenever the user clicks on a chip in SearchCategory
			/  component to hide/show tools found in that category.
			/  The value is the visible categories.
			*/
			commit('updateVisibleCategories', value);
		},

		updateVisibleTools({ state, commit }) {
			const newVisibleTools = [];
			for (const category of state.visibleCategories) {
				// filter tools with cateegory in foundIn field
				const visibleTools = state.tools.filter((tool) =>
					tool.foundIn.includes(category)
				);
				// add tools to newVisibleTools
				for (const tool of visibleTools) {
					if (!newVisibleTools.includes(tool)) {
						newVisibleTools.push(tool);
					}
				}
			}
			commit('updateVisibleTools', newVisibleTools);
		},

		updateVisibleToolsByTopic({ state, commit }, topics) {
			// 🚧 This function recieves the array of topics selected by the user
			// and updates the visible tools array accordingly.
			// This function should not commit, but be called by another function
			console.log('updateVisibleToolsByTopic');

			function topicInTool(tool, topics) {
				for (const topic of tool.topics) {
					for (const selectedTopic of topics) {
						if (topic.term === selectedTopic) {
							return true;
						}
					}
				}
				return false;
			}

			// filter visible tools
			if (topics.length > 0) {
				const visibleTools = state.visibleTools.filter((tool) =>
					topicInTool(tool, topics)
				);
				console.log(visibleTools);
				commit('updateVisibleTools', visibleTools);
			} else {
				// this is repeated

				const visibleTools = state.tools;
				commit('updateVisibleTools', visibleTools);
			}
		},

		async getEDAMTerms({ commit }) {
			// This function gets the EDAM terms from the API
			const response = await this.$observatory.$get('/EDAMTerms');

			commit('updateEDAMTerms', response);
		},
	},
	mutations: {
		updateToolsDisplayCards(state, value) {
			state.toolsDisplayCards = value;
		},
		updateSearchedTerm(state, value) {
			state.searchedTerm = value;
		},
		updateLoadingSearch(state, value) {
			state.loading.search = value;
		},
		updateTools(state, value) {
			state.tools = value;
		},
		updateCounts(state, value) {
			state.counts = value;
		},
		updateVisibleTools(state, value) {
			state.visibleTools = value;
		},
		updateVisibleCategories(state, value) {
			state.visibleCategories = value;
		},
		updateEDAMTerms(state, value) {
			state.EDAMTerms = value;
		},
	},
	getters: {
		searchedTerm: (state) => state.searchedTerm,
		toolsDisplayCards: (state) => state.toolsDisplayCards,
		loading: (state) => state.loading,
		tools: (state) => state.tools,
		counts: (state) => state.counts,
		visibleTools: (state) => state.visibleTools,
		visibleCategories: (state) => state.visibleCategories,
		EDAMFormats: (state) => state.EDAMTerms.format,
		EDAMOperations: (state) => state.EDAMTerms.operation,
		EDAMTopics: (state) => state.EDAMTerms.topic,
		EDAMTypes: (state) => state.EDAMTerms.datatype,
	},
};
