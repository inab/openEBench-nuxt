export default {
	data() {
		return {
			colors: ['#5da4d6', '#ff900e', '#2ca065', '#bd86f0'],
			colors_lines: ['#0075c7', '#995302', '#046b37', '#5e3d7d'],
			collection_scores: [],
			control_scores: [],
			text: [],
			isLoading: true,
			collection: this.$route.params.collection,
			plotTitle: this.$route.query.title,
		};
	},
	methods: {
		async fetchData(principle) {
			const collection = this.collection || 'tools';
			const URLCollection = `/stats/tools/fair_scores_summary?collection=${collection}`;
			const URLControl = `/stats/tools/fair_scores_summary?collection=tools`;
			this.isLoading = true;

			try {
				const response = await this.$observatory.get(URLCollection);
				const data = response.data.data;
				this.collection_scores = data[principle];
			} catch (error) {
				console.error('Error fetching  data:', error);
			}

			try {
				const response = await this.$observatory.get(URLControl);
				const data = response.data.data;
				this.control_scores = data[principle];
			} catch (error) {
				console.error('Error fetching data:', error);
			}
			this.isLoading = false;
		},
	},
};
