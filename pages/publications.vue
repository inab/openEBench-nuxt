<template>
	<v-container>
		<h1 class="text--h3">OpenEBench Publications</h1>
		<br />
		<p>
			Here, you can find different scientific contributions, e.g. peer-reviewed
			articles, conference posters and public pre-prints, reflecting the work
			carried out by the OpenEBench team and the multiple collaborations with
			the scientific communities that use and support the platform.
		</p>
		<p>
			These contributions are organised into two sections to reflect whether
			they are core to the OpenEBench activities or contribute to the different
			communities.
		</p>
		<br />

		<v-tabs :vertical="vertical" class="mt-10">
			<!-- Manuscripts -->
			<v-tab>
				<v-icon left>mdi-information-outline</v-icon>
				Manuscripts
			</v-tab>
			<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
				<v-card outlined class="pa-5" elevation="1">
					<v-tabs v-model="activeTab">
						<v-tab>
							<h3>Core Contributions</h3>
						</v-tab>
						<v-tab>
							<h3>Collaborations</h3>
						</v-tab>

						<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
							<Manuscripts :papers="papers.core"/>
						</v-tab-item>
						<v-tab-item class="ma-5 mt-5 mt-md-0" :transition="false">
							<Manuscripts :papers="papers.collaboration" />
						</v-tab-item>
					</v-tabs>
				</v-card>
			</v-tab-item>

			<!-- Posters -->
			<v-tab>
				<v-icon left>mdi-file-image-outline</v-icon>
				Posters
			</v-tab>
			<v-tab-item>
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
							<h2>
								<a :href="selectedPoster.link" target="_blank">{{
									selectedPoster.title
								}}</a>
							</h2>
							<p
								v-if="
									selectedPoster.authors && selectedPoster.authors.length > 0
								"
							>
								<b>Authors:</b>
								<span
									v-for="(author, index) in selectedPoster.authors"
									:key="index"
								>
									{{ author }}
									<span v-if="index < selectedPoster.authors.length - 1"
										>,
									</span>
								</span>
							</p>
							<p>
								Published in {{ formatDate(selectedPoster.date) }}
								{{ selectedPoster.publication_loc }}
							</p>
							<p>Abstract: {{ selectedPoster.abstract }}</p>
							<p>Presented at {{ selectedPoster.presented_loc }}</p>
						</div>
					</div>
					<div v-else>
						<div class="license-text">
							This is an open access work distributed under the terms of the
							Creative Commons Attribution License, which permits unrestricted
							use, distribution, and reproduction in any medium, provided the
							original work is properly cited.
						</div>
						<div class="poster-grid">
							<div
								v-for="poster in posters"
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
			</v-tab-item>
			<!-- <v-tab>
				<v-icon left>mdi-school-outline</v-icon>
				Training
			</v-tab>
			<v-tab-item>
				<v-card
					outlined
					class="pa-5 d-flex align-center justify-center"
					elevation="1"
				>
					Here will go the training content SOON
				</v-card>
			</v-tab-item>
			<v-tab>
				<v-icon left>mdi-video-outline</v-icon>
				Videos
			</v-tab>
			<v-tab-item>
				<v-card
					outlined
					class="pa-5 d-flex align-center justify-center"
					elevation="1"
				>
					Here will go the videos content SOON
				</v-card>
			</v-tab-item> -->
		</v-tabs>
	</v-container>
</template>

<script>
import posters from '@/static/posters/posters.json';
import Manuscripts from '~/components/Cards/Manuscripts.vue';

export default {
	name: 'PublicationsPage',
	components: {
       Manuscripts
    },
	data() {
		return {
			hostName: this.$config.OEB_LEGACY_ANGULAR_URI,
			breadcrumbs: [
				{
					text: 'Home',
					disabled: false,
					exact: true,
					to: '/',
				},
				{
					text: 'About',
					disabled: true,
				},
				{
					text: 'Publications',
					disabled: true,
				},
			],
			activeTab: null,
			papers: {
				core: [
					{ doi: '10.1101/181677' },
					{ doi: '10.1101/2022.05.04.490563' },
					// Add more core papers here as needed
				],
				collaboration: [
					{ doi: '10.1101/2023.07.25.550582' },
					{ doi: '10.1093/nar/gkac330' },
					{ doi: '10.1093/nar/gkaa308' },
					{ doi: '10.1093/bioinformatics/btx542' },
					// Add more core papers here as needed
				],
			},
			posters: [],
			selectedPoster: null,
			basePath: '/posters/poster_list/',
		};
	},
	computed: {
		vertical() {
			return this.$vuetify.breakpoint.mdAndUp;
		},
	},
	beforeMount() {
		this.$parent.$emit('emitBreadcrumbs', this.breadcrumbs);
		this.posters = posters;
	},
	async mounted() {
		await this.fetchAllPaperDetails();
		this.posterDetails();
	},
	methods: {
		async fetchPaperInfo(doi) {
			try {
				const response = await fetch(`https://api.crossref.org/works/${doi}`);
				if (!response.ok) {
					throw new Error('Failed to fetch paper information');
				}
				const data = await response.json();
				if (data && data.message) {
					const { title, author, published } = data.message;
					const publicationDate =
						published &&
						published['date-parts'] &&
						published['date-parts'][0].join('-');
					return {
						title: title && title[0],
						authors:
							author && author.map((a) => `${a.given} ${a.family}`).join(', '),
						publicationDate: publicationDate || 'Unknown',
					};
				} else {
					throw new Error('Invalid response format');
				}
			} catch (error) {
				console.error('Error fetching paper information:', error); // eslint-disable-line no-console
				return null;
			}
		},
		async fetchAllPaperDetails() {
			for (const group in this.papers) {
				for (let i = 0; i < this.papers[group].length; i++) {
					const paper = this.papers[group][i];
					const details = await this.fetchPaperInfo(paper.doi);
					if (details) {
						this.$set(this.papers[group], i, { ...paper, ...details });
					}
				}
				// Sort papers by date after getting all details
				this.papers[group].sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
			}
		},

		getPosterPath(filename) {
			return `${this.basePath}${filename}`;
		},
		selectPoster(poster) {
			this.selectedPoster = poster;
		},
		posterDetails() {
			this.posters.forEach((poster) => {
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
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		},
	},
};
</script>

<style lang="scss" scoped>
.v-tab {
	text-transform: none !important;
}

.paper-container {
	display: flex;
	flex-wrap: wrap;
}

.paper {
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
}

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
	width: 100%; /* Make it occupy full width */
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
