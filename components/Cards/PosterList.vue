<template>
	<v-container fluid>
		<v-card elevation="0">
			<div v-if="selectedPoster" class="mt-8">
				<v-btn class="mb-4" @click="selectedPoster = null">
					Back to posters
				</v-btn>
				<div class="selected-pposter-details">
					<embed
						:src="getPosterPath(selectedPoster.poster)"
						type="application/pdf"
						width="100%"
						height="600px"
					/>
					<h3>
						<a :href="selectedPoster.link" target="_blank">
							{{ selectedPoster.title }}
							<v-icon v-if="selectedPoster.link" small right
								>mdi-open-in-new</v-icon
							>
						</a>
					</h3>
					<br />
					<p v-if="selectedPoster.authors && selectedPoster.authors.length > 0">
						<b>Authors:</b>
						<span
							v-for="(author, index) in selectedPoster.authors"
							:key="index"
						>
							{{ author }}
							<span v-if="index < selectedPoster.authors.length - 1">, </span>
						</span>
					</p>
					<p>
						Published in {{ formatDate(selectedPoster.date) }}
						{{ selectedPoster.publication_loc }}
					</p>
					<p>
						<b>Abstract:</b>
						<br />
						<span
							v-html="
								sanitizeHtml(
									getFormattedAbstract(
										selectedPoster.abstract,
										showFullAbstract
									)
								)
							"
						></span>
						<span
							v-if="shouldShowExpandIcon(selectedPoster.abstract)"
							class="show-all-button"
							@click="toggleShowFullAbstract"
						>
							<v-icon color="primary">{{
								showFullAbstract ? 'mdi-minus' : 'mdi-plus'
							}}</v-icon>
						</span>
					</p>

					<p>
						<b>How to cite this poster:</b> <br />{{ selectedPoster.citation }}
					</p>
					<p>Presented at {{ selectedPoster.presented_loc }}</p>
				</div>
			</div>
			<div v-else class="mt-8">
				<div class="license-text">
					This is an open access work distributed under the terms of the
					Creative Commons Attribution License, which permits unrestricted use,
					distribution, and reproduction in any medium, provided the original
					work is properly cited.
				</div>
				<v-row class="poster-grid">
					<v-col
						v-for="poster in paginatedPosters"
						:key="poster.title"
						cols="12"
						md="6"
					>
						<v-card class="poster-preview" outlined>
							<embed
								:src="getPosterPath(poster.poster)"
								type="application/pdf"
								class="embed-pdf"
							/>
							<v-card-title class="poster-title" @click="selectPoster(poster)">
								<span
									v-html="sanitizeHtml(formattedTitle(poster.title))"
								></span>
								<span> </span>
							</v-card-title>
							<div class="mx-2 chip">
								<a
									class="chip-icon"
									target="_blank"
									title="Creative Commons Attribution 4.0 International License"
									href="https://creativecommons.org/licenses/by/4.0/deed.en"
								>
									<img
										src="@/static/posters/cc.png"
										alt="Creative Commons Attribution 4.0 International License"
										title="Creative Commons Attribution 4.0 International License"
										class="logo chip-with-logo"
									/>
								</a>
								<a
									target="_blank"
									:href="poster.link"
									class="chip-icon"
									title="doi"
								>
									<img
										src="@/static/posters/doi.svg"
										alt="doi"
										title="doi"
										class="logo chip-with-logo"
									/>
								</a>
							</div>
							<v-card-subtitle class="publication-date">
								{{ formatDate(poster.date) }}
							</v-card-subtitle>
						</v-card>
					</v-col>
				</v-row>
				<v-pagination
					v-if="pageCount > 1"
					v-model="currentPage"
					class="mt-5"
					:length="pageCount"
					:total-visible="7"
					color="primary"
				></v-pagination>
			</div>
		</v-card>
	</v-container>
</template>

<script>
import DOMPurify from 'dompurify';
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
			showFullAbstract: false,
			currentPage: 1,
			postersPerPage: 10,
		};
	},
	computed: {
		sortedPosters() {
			// Create a copy of the array before sorting
			const sorted = [...this.localPosters];
			return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
		},
		paginatedPosters() {
			const start = (this.currentPage - 1) * this.postersPerPage;
			const end = start + this.postersPerPage;
			return this.sortedPosters.slice(start, end);
		},
		pageCount() {
			return Math.ceil(this.sortedPosters.length / this.postersPerPage);
		},
	},
	mounted() {
		this.localPosters = this.posters;
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
				const filePath = poster.poster;

				try {
					const module = context(filePath);

					if (module) {
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
					} else {
						console.error(`Error loading JSON for poster ${filePath}`); // eslint-disable-line no-console
					}
				} catch (error) {
					console.error(`Error loading JSON for poster ${filePath}:`, error); // eslint-disable-line no-console
				}
			});
		},
		formattedTitle(title) {
			return title.replace(/\(([^)]+)\)/g, '<br/>($1)');
		},
		getFormattedAbstract(abstract, showFull) {
			// Split the abstract into words and newline characters
			const words = abstract.split(/(\s+)/);

			if (showFull || words.length <= 50) {
				// Join the words array with proper HTML line breaks
				const formattedAbstract = words
					.map((word) => {
						if (word === '\n') {
							return '<br>';
						} else {
							return word;
						}
					})
					.join('');

				return formattedAbstract.replace(/\n/g, '<br>');
			} else {
				// Truncate to 50 words
				let truncatedWords = words.slice(0, 50);

				// Check if the 50th word is a newline
				if (truncatedWords[49] === '\n\n' || truncatedWords === '\n') {
					// If the 50th word is a newline, truncate to 49 words
					truncatedWords = words.slice(0, 49);
				}

				// Join the truncated words and add ellipsis
				const truncatedAbstract =
					truncatedWords
						.map((word) => {
							if (word === '\n') {
								return '<br>';
							} else {
								return word;
							}
						})
						.join('') + '...';

				return truncatedAbstract.replace(/\n/g, '<br>');
			}
		},

		shouldShowExpandIcon(abstract) {
			// Count the words and newline characters
			const words = abstract.split(/(\s+)/);
			return words.length > 50;
		},
		toggleShowFullAbstract() {
			this.showFullAbstract = !this.showFullAbstract;
		},
		sanitizeHtml(htmlContent) {
			return DOMPurify.sanitize(htmlContent);
		},
	},
};
</script>

<style lang="scss" scoped>
.chip {
	height: 35px;
	text-align: center;
	justify-content: center;
	display: flex;
	justify-content: center;
	align-items: end;
	gap: 10px;
	flex: 1;
	padding-bottom: 10px;
	.chip-icon {
		height: 23px;
		transition: all 0.3s ease-in-out;
		display: block;
		&:hover {
			transform: scale(1.4);
		}
		img {
			height: 100%;
			border-radius: 50%;
			opacity: 0.7;
		}
		&:focus {
			outline: none;
		}
	}
}

.poster-grid {
	display: flex;
	flex-wrap: wrap;
}

.poster-preview {
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	min-height: 350px;
}

.embed-pdf {
	width: 100%;
	height: 200px; /* Ensure the embed PDF has a fixed height */
	border: none;
}

.poster-title {
	cursor: pointer;
	font-size: 14px; /* Smaller font size for titles */
	margin: 8px 0; /* Ensure there is space between embed and title */
	text-align: left;
	word-break: break-word; /* Allow breaking long words */
	overflow: hidden; /* Hide overflow text */
	flex: 2;
}

.poster-title:hover {
	text-decoration: underline;
}

.poster-title span {
	display: block; /* Ensure the span occupies full width */
}

.publication-date {
	text-align: center;
	background-color: #f0f0f0; /* Light gray background for date section */
	padding: 8px;
	width: 100%; /* Occupy full card width */
}

.selected-poster-details {
	margin-top: 16px;
}

.license-text {
	background-color: #f0f0f0; /* Adjust the background color as needed */
	padding: 16px;
	text-align: center;
	margin-bottom: 20px;
	border-radius: 4px;
	font-weight: bold;
}

.show-all-button {
	cursor: pointer;
	margin-left: 8px;
}
</style>
