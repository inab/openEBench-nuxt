<template>
	<v-row>
		<v-col cols="11" class="mr-0">
			<v-card
				class="m-1 pa-2 rounded-lg"
				:style="zIndex(order)"
				outlined
				elevation="1"
			>
				<v-card-title class="mb-0 pb-0">
					<h3 class="text-subtitle-1">
						<a id="title">{{ name }}</a>
					</h3>
					<span class="text-caption grey--text font-italic ml-2">
						{{ subname }}</span
					>
					<v-spacer></v-spacer>
					<ChipType :type="type" />
				</v-card-title>

				<v-card-text class="mb-0 mt-0 pt-1">
					<!-- DESCRIPTION -->
					<p class="text-caption black--text mb-2">
						<span v-if="description.length > 300"
							>{{ cutDescription(description)
							}}<a
								v-if="descriptionCollapsed"
								class="text-decoration-underline"
								@click="extendDescription()"
								>more</a
							>
						</span>
						<span v-else>{{ description }}</span>
					</p>
					<!-- TOPICS -->
					<div v-if="topics.length > 0" justify="center" class="mt-1">
						<LinkChipTopicOperation
							v-for="(item, i) in topics"
							:key="i"
							:uri="item.uri"
							:text="cleanString(item.term)"
							icon="mdi-label-multiple"
						/>
					</div>

					<!-- OPERATIONS -->
					<div v-if="operations.length > 0" justify="center" class="mt-1">
						<LinkChipTopicOperation
							v-for="(item, i) in operations"
							:key="i"
							:uri="item.uri"
							:text="cleanString(item.term)"
							icon="mdi-cog"
						/>
					</div>
					<!-- LICENSE -->
					<div v-if="license.length > 0" justify="center" class="mt-2">
						<LinkChipWIcon
							v-for="[key, value] in Object.entries(license)"
							:key="key"
							:link="value.url"
							icon="mdi-scale-balance"
							:text="value.name"
							light
							small
							label
							:disabled="value.url === ''"
							class="mr-1"
						/>
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
							:link="webpage"
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
		name: {
			type: String,
			required: true,
		},
		subname: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		topics: {
			type: Array,
			required: true,
		},
		operations: {
			type: Array,
			required: true,
		},
		sourcesLabels: {
			type: Object,
			required: true,
		},
		publications: {
			type: Array,
			required: true,
		},
		license: {
			type: Array,
			required: true,
		},
		webpage: {
			type: String,
			required: false,
			default: '',
		},
		findability: {
			type: Number,
			required: true,
		},
		accessibility: {
			type: Number,
			required: true,
		},
		interoperability: {
			type: Number,
			required: true,
		},
		reusability: {
			type: Number,
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
			expand: false,
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
	},
	methods: {
		extendDescription() {
			this.descriptionCollapsed = !this.descriptionCollapsed;
		},
		cutDescription(description) {
			if (this.descriptionCollapsed === true) {
				return description.substring(0, 300) + '... ';
			} else {
				return description;
			}
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
</style>
