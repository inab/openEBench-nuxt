<template>
	<v-row>
		<v-col cols="11" class="mr-0">
			<v-card
				class="m-1 pa-2 rounded-lg"
				:style="zIndex(order)"
				outlined
				elevation="1"
			>
				<v-card-title
					class="mb-0 pb-0"
					style="cursor: pointer"
					@click="goToTool"
				>
					<h3 class="text-subtitle-1">
						<a id="title">{{ name }}</a>
					</h3>
					<span class="text-caption grey--text font-italic ml-2">
						{{ subname }}</span
					>
					<v-spacer></v-spacer>
					<ChipType
						v-for="item in type"
						:type="item"
						:key="item"
						class="ml-1"
					/>
				</v-card-title>

				<v-card-text class="mb-0 mt-0 pt-1">
					<!-- DESCRIPTION -->
					<span v-if="resolvedDescription.length > 300">
						<span v-html="cutDescription(resolvedDescription)"></span>

						<a
							v-if="descriptionCollapsed"
							class="text-decoration-underline"
							@click="extendDescription()"
						>
							more
						</a>
					</span>

					<span v-else v-html="resolvedDescription"></span>
					<!-- TOPICS -->
					<div v-if="topics.length > 0" justify="center" class="mt-1">
						<LinkChipTopicOperation
							v-for="(item, i) in visibleTopics"
							:key="i"
							:uri="item.uri"
							:text="cleanString(item.term)"
							icon="mdi-label-multiple"
						/>
						<v-chip
							v-if="topics.length > MAX_CHIPS"
							small
							label
							light
							outlined
							class="mr-1 mt-1"
							@click="toggleSection('topics')"
						>
							{{
								expandedSections.topics
									? 'show less'
									: `+${topics.length - MAX_CHIPS} more`
							}}
						</v-chip>
					</div>

					<!-- OPERATIONS -->
					<div v-if="operations.length > 0" justify="center" class="mt-1">
						<LinkChipTopicOperation
							v-for="(item, i) in visibleOperations"
							:key="i"
							:uri="item.uri"
							:text="cleanString(item.term)"
							icon="mdi-cog"
						/>
						<v-chip
							v-if="operations.length > MAX_CHIPS"
							small
							label
							light
							outlined
							class="mr-1 mt-1"
							@click="toggleSection('operations')"
						>
							{{
								expandedSections.operations
									? 'show less'
									: `+${operations.length - MAX_CHIPS} more`
							}}
						</v-chip>
					</div>

					<!-- LICENSE -->
					<div v-if="license.length > 0" justify="center" class="mt-2">
						<LinkChipWIcon
							v-for="[key, value] in Object.entries(visibleLicense)"
							:key="key"
							:link="value.url || ''"
							icon="mdi-scale-balance"
							:text="value.name"
							light
							small
							label
							:disabled="value.url === ''"
							class="mr-1"
						/>
						<v-chip
							v-if="license.length > MAX_CHIPS"
							small
							label
							light
							outlined
							class="mr-1 mt-1"
							@click="toggleSection('license')"
						>
							{{
								expandedSections.license
									? 'show less'
									: `+${license.length - MAX_CHIPS} more`
							}}
						</v-chip>
					</div>

					<div justify="center" class="mt-2">
						<!-- LINKS -->
						<LinkChipWImage
							v-for="[key, value] in Object.entries(sourcesLabels)"
							:key="key"
							:link="value"
							:type="key"
							:text="key"
							light
							small
							class="mr-1"
						/>
						<LinkChipWIcon
							v-if="webpage"
							:link="webpage || ''"
							icon="mdi-web"
							text="Homepage"
							class="mr-1"
						/>
						<!-- PUBLICATIONS -->
						<!-- Latest publication. Chip with tooltip showing title,year and DOI -->
						<LinkChipPublication
							v-if="latestPublication"
							:doi="latestPublication.doi"
							:pmcid="latestPublication.pmcid"
							:pmid="latestPublication.pmid"
							:title="latestPublication.title"
							:year="latestPublication.year"
							icon="mdi-text-box-outline"
							:text="
								publications.length > 1 ? 'Latest Publication' : 'Publication'
							"
							class="mr-1"
						/>
						<!-- Remaining publications. Go to -->
						<LinkMorePublications
							v-if="publications.length > 1"
							:publications="publications.slice(1)"
							:name="name"
							icon="mdi-text-box-multiple-outline"
						/>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="1" class="mt-2">
			<BookMarkCard
				:findability="findability"
				:accessibility="accessibility"
				:interoperability="interoperability"
				:reusability="reusability"
			/>
		</v-col>
	</v-row>
</template>
<script>
import { marked } from 'marked';
import ChipType from './ChipType.vue';
import LinkMorePublications from './LinkMorePublications.vue';
import LinkChipTopicOperation from './LinkChipTopicOperation.vue';
import BookMarkCard from './BookMarkCard.vue';
import LinkChipWImage from '~/components/Tools/Search/Card/LinkChipWImage.vue';
import LinkChipWIcon from '~/components/Tools/Search/Card/LinkChipWIcon.vue';
import LinkChipPublication from '~/components/Tools/Search/Card/LinkChipPublication.vue';

export default {
	name: 'ToolCard',
	components: {
		LinkChipWImage,
		LinkChipWIcon,
		LinkChipPublication,
		LinkMorePublications,
		LinkChipTopicOperation,
		ChipType,
		BookMarkCard,
	},
	props: {
		id: {
			type: String,
			required: true,
			default: '',
		},
		name: {
			type: String,
			required: true,
		},
		subname: {
			type: String,
			required: true,
			default: '',
		},
		type: {
			type: Array,
			required: true,
			default: () => [],
		},
		description: {
			type: String,
			required: true,
			default: '',
		},
		documentation: {
			type: Array,
			required: false,
			default: () => [],
		},
		topics: {
			type: Array,
			required: true,
			default: () => [],
		},
		operations: {
			type: Array,
			required: true,
			default: () => [],
		},
		sourcesLabels: {
			type: Object,
			required: true,
			default: () => ({}),
		},
		publications: {
			type: Array,
			required: true,
			default: () => [],
		},
		license: {
			type: Array,
			required: true,
			default: () => [],
		},
		webpage: {
			type: String,
			required: false,
			default: '',
		},
		findability: {
			type: [Number, String],
			required: true,
		},
		accessibility: {
			type: [Number, String],
			required: true,
		},
		interoperability: {
			type: [Number, String],
			required: true,
		},
		reusability: {
			type: [Number, String],
			required: true,
		},
		order: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			items: [
				{
					label: 'Homepage',
					uri: '',
					icon: 'mdi-home',
				},
				{
					label: 'Publication',
					uri: '',
					icon: 'mdi-file-outline',
				},
			],
			descriptionCollapsed: true,
			MAX_CHIPS: 6, // Change this number as you see fit
			expandedSections: {
				topics: false,
				operations: false,
				license: false,
			},
		};
	},
	computed: {
		// return the latest publication
		latestPublication() {
			if (this.publications.length === 0) {
				return null;
			} else {
				let latestPublication = this.publications[0];
				for (const publication in this.publications) {
					if (publication.year > latestPublication.year) {
						latestPublication = publication;
					}
				}
				return latestPublication;
			}
		},
		resolvedDescription() {
			if (this.description && this.description.length > 0) {
				return marked(this.description);
			}

			const help = this.documentation?.find(
				(doc) => doc.type === 'help'
			)?.content;
			if (!help) return '';
			return marked(this.extractFirstLine(help));
		},
		visibleTopics() {
			return this.expandedSections.topics
				? this.topics
				: this.topics.slice(0, this.MAX_CHIPS);
		},
		visibleOperations() {
			return this.expandedSections.operations
				? this.operations
				: this.operations.slice(0, this.MAX_CHIPS);
		},
		visibleLicense() {
			return this.expandedSections.license
				? this.license
				: this.license.slice(0, this.MAX_CHIPS);
		},
	},
	methods: {
		goToTool() {
			this.$router.push({ path: `/tool/${this.subname}-${this.id}` });
		},
		extendDescription() {
			this.descriptionCollapsed = !this.descriptionCollapsed;
		},
		cutDescription(description) {
			if (!description) return '';

			if (this.descriptionCollapsed) {
				return description.substring(0, 300) + '... ';
			}

			return description;
		},
		cleanString(str) {
			if (!str) {
				return '';
			}
			// remove " at the beginning of the string
			if (str.charAt(0) === '"') {
				str = str.substr(1);
			}
			// remove " at the end of the string
			if (str.charAt(str.length - 1) === '"') {
				str = str.substr(0, str.length - 1);
			}
			return str;
		},

		zIndex(order) {
			// return the zIndex of the card
			return {
				'z-index': 9998 - order,
			};
		},
		extractFirstLine(content) {
			if (!content) return '';

			return (
				content
					.split('\n')
					.map((l) => l.trim())
					.find(
						(l) =>
							l &&
							!l.startsWith('**') &&
							!l.startsWith('..') &&
							!l.startsWith('---')
					) || ''
			);
		},
		toggleSection(section) {
			this.expandedSections[section] = !this.expandedSections[section];
		},
	},
};
</script>
<style scoped>
#title {
	font-weight: 700 !important;
}

.subtitle {
	font-weight: 700 !important;
}

.v-card {
	min-height: 130px;
}

::v-deep p {
	display: inline;
	margin: 0;
	color: rgb(0, 0, 0);
	font-size: 12px;
	line-height: 20px;
}
</style>
