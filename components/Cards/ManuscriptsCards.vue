<template>
	<v-card class="no-border" elevation="0">
		<div class="paper-container mt-8">
			<div v-for="(paper, index) in papers" :key="paper.doi" class="paper">
				<!-- Link -->
				<h3>
					<a :href="`https://doi.org/${paper.doi}`" target="_blank">{{
						paper.title
					}}</a>
				</h3>
				<!-- Authors -->
				<p v-if="paper.authors && paper.authors.length > 0">
					<strong>Authors: </strong> {{ getAuthors(paper.authors, index) }}
					<span
						v-if="hasMoreAuthors(paper.authors, index)"
						class="show-all-button"
						@click="toggleShowAllAuthors(index)"
					>
						<v-icon color="primary">{{
							showAllAuthors[index] ? 'mdi-minus' : 'mdi-plus'
						}}</v-icon>
					</span>
				</p>
				<!-- Date -->
				<p v-if="paper.publicationDate">
					Publication Date: {{ formatDate(paper.publicationDate) }}
				</p>
				<hr />
			</div>
		</div>

		<div v-if="papers.length === 0" class="no-papers mt-5">
			<v-icon color="primary" size="48">mdi-file-hidden</v-icon>
			<p>No papers available.</p>
		</div>
	</v-card>
</template>

<script>
import sharedMethodsMixin from '@/mixins/sharedMethodsMixin.js';

export default {
	name: 'ManuscriptsCards',
	mixins: [sharedMethodsMixin],
	props: {
		papers: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			showAllAuthors: [],
		};
	},
	methods: {
		getAuthors(authors, index) {
			const authorList = authors.split(',').map((author) => author.trim()); // Convertir la cadena de autores en una lista
			if (!Array.isArray(authorList)) {
				return ''; // Devolver una cadena vacía si no es una lista
			}

			if (authorList.length <= 12 || this.showAllAuthors[index]) {
				return authorList.join(', ');
			} else {
				return authorList.slice(0, 12).join(', ') + '...';
			}
		},
		hasMoreAuthors(authors) {
			const authorList = authors.split(',').map((author) => author.trim()); // Convertir la cadena de autores en una lista
			return Array.isArray(authorList) && authorList.length > 12;
		},
		toggleShowAllAuthors(index) {
			this.$set(this.showAllAuthors, index, !this.showAllAuthors[index]);
		},
	},
};
</script>

<style scoped>
.no-border {
	border: none;
	box-shadow: none;
}

.paper-container {
	display: flex;
	flex-direction: column;
}

.paper {
	margin-bottom: 15px;
}

.show-all-button {
	cursor: pointer;
	color: blue;
}

.no-papers {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}
</style>
