<template>
	<v-card outlined class="pa-5" elevation="1">
		<div v-if="selectedPoster">
			<v-btn class="mb-4" @click="selectedPoster = null">
				Back to posters
			</v-btn>
			<div class="selected-poster-details">
				<embed
					:src="getPosterPath(selectedPoster.poster)"
					type="application/pdf"
					width="100%"
					height="600px"
				/>
				<h3>
					<a :href="selectedPoster.link" target="_blank"
						>{{ selectedPoster.title
						}}<v-icon small right>mdi-open-in-new</v-icon></a
					>
				</h3>
				<br />
				<p v-if="selectedPoster.authors && selectedPoster.authors.length > 0">
					<b>Authors:</b>
					<span v-for="(author, index) in selectedPoster.authors" :key="index">
						{{ author }}
						<span v-if="index < selectedPoster.authors.length - 1"
							>,&nbsp;</span
						>
					</span>
				</p>
				<p>
					Published in {{ formatDate(selectedPoster.date) }}
					{{ selectedPoster.publication_loc }}
				</p>
				<p><b>Abstract:</b> {{ selectedPoster.abstract }}</p>
				<p>Presented at {{ selectedPoster.presented_loc }}</p>
			</div>
		</div>
		<div v-else>
			<div class="license-text">
				This is an open access work distributed under the terms of the Creative
				Commons Attribution License, which permits unrestricted use,
				distribution, and reproduction in any medium, provided the original work
				is properly cited.
			</div>
			<div class="poster-grid">
				<div
					v-for="poster in sortedPosters"
					:key="poster.title"
					class="poster-preview"
					@click="selectPoster(poster)"
				>
					<embed
						:src="getPosterPath(poster.poster)"
						type="application/pdf"
						width="100%"
						height="200px"
					/>
					<h3>
						{{ poster.title }}
					</h3>
					<p class="publication-date">
						{{ formatDate(poster.date) }}
					</p>
				</div>
			</div>
		</div>
	</v-card>
</template>
<script>
import sharedMethodsMixin from '@/mixins/sharedMethodsMixin.js';

export default {
	name: 'PosterList',
	mixins: [sharedMethodsMixin],
	props: {
		posters: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			selectedPoster: null,
			basePath: '/posters/poster_list/',
			localPosters: [],
		};
	},
	computed: {
		sortedPosters() {
			// Create a copy of the array before sorting
			const sorted = [...this.localPosters];
			return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
		},
	},
	mounted() {
		this.localPosters = this.posters;
		this.posterDetails();
	},
	methods: {
		getPosterPath(filename) {
			return `${this.basePath}${filename}`;
		},
		selectPoster(poster) {
			this.selectedPoster = poster;
		},
		posterDetails() {
			this.localPosters.forEach((poster) => {
				const filenameWithoutExt = poster.poster.split('.')[0];
				const filePath = `@/static/posters/poster_list/${filenameWithoutExt}.json`;

				import(filePath)
					.then((module) => {
						this.$set(poster, 'abstract', module.default.abstract);
						this.$set(
							poster,
							'publication_loc',
							module.default.publication_loc
						);
						this.$set(poster, 'link', module.default.link);
						this.$set(poster, 'presented_loc', module.default.presented_loc);
						this.$set(
							poster,
							'publicationDate',
							module.default.publicationDate
						);
					})
					.catch((error) => {
						console.error(
							`Error loading JSON for poster ${filenameWithoutExt}:`,
							error
						); // eslint-disable-line no-console
					});
			});
		},
	},
};
</script>
<style scoped>
.poster-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 30px;
}

.poster-preview {
	width: calc(50% - 16px); /* Two posters per row */
	cursor: pointer;
	text-align: center;
	border: 1px solid #ddd; /* Add border */
	padding: 10px; /* Add padding */
	background-color: #fff; /* Background color */
	border-radius: 4px; /* Rounded corners */
	display: flex;
	flex-direction: column; /* Stack items vertically */
	justify-content: space-between; /* Space out items to push date to bottom */
}

.poster-preview embed {
	width: 100%;
	height: 200px;
}

.poster-preview h3 {
	margin: 10px 0;
}

.poster-preview .publication-date {
	background-color: #f0f0f0; /* Background color for date */
	padding: 10px;
	border-radius: 4px;
	text-align: center; /* Center the text */
	margin-top: 10px;
	width: 100%;
	bottom: 0;
	box-sizing: border-box;
}

.selected-poster-details {
	text-align: left;
}

.selected-poster-details embed {
	width: 100%;
	height: 600px;
	margin-bottom: 16px;
}

.license-text {
	background-color: #f0f0f0; /* Adjust the background color as needed */
	padding: 16px;
	text-align: center;
	margin-bottom: 20px;
	border-radius: 4px;
	font-weight: bold;
}
</style>
