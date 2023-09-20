<template>
	<v-row>
		<v-col cols="11" class="mr-0">
			<v-card class="m-1 pa-2 rounded-lg" outlined elevation="1">
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
						<v-chip
							v-for="(item, i) in license"
							:key="i"
							label
							small
							light
							color="grey lighten-4"
							class="mr-1 mt-1"
						>
							<v-icon small class="mr-1">mdi-scale-balance</v-icon>
							<a v-if="item.url" :href="item.url"
								><span class="ml-1">{{ cleanString(item.name) }}</span></a
							>
							<span v-else class="ml-1">{{ cleanString(item.name) }}</span>
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
		<v-col cols="1" class="ml-0 pl-0 mt-2">
			<div class="main">
				<div class="sec">
					<v-chip
						v-if="!expand1"
						class="elevation-1 fairchip"
						color="white"
						@click="expand1 = !expand1"
					>
						<div class="circle c1"></div>
					</v-chip>
				</div>
				<v-slide-x-transition>
					<v-chip
						v-if="expand1"
						v-show="expand1"
						class="elevation-1 fairexpandedchip findability"
						color="white"
						@click="expand1 = !expand1"
					>
						<span class="fair-text pl-2 text-caption">Findability</span>
						<v-chip class="inner-chip text-caption c1" color="#396fba"
							>85</v-chip
						>
					</v-chip>
				</v-slide-x-transition>

				<div class="sec">
					<v-chip
						v-if="!expand2"
						class="elevation-1 fairchip"
						color="white"
						@click="expand2 = !expand2"
					>
						<div class="circle c2"></div>
					</v-chip>
				</div>
				<v-slide-x-transition>
					<v-chip
						v-if="expand2"
						v-show="expand2"
						class="elevation-1 fairexpandedchip accessibility"
						color="white"
						@click="expand2 = !expand2"
					>
						<span class="fair-text pl-2 text-caption">Accessibility</span>
						<v-chip class="inner-chip text-caption c2" color="#396fba"
							>30</v-chip
						>
					</v-chip>
				</v-slide-x-transition>

				<div class="sec">
					<v-chip
						v-if="!expand3"
						class="elevation-1 fairchip"
						color="white"
						@click="expand3 = !expand3"
					>
						<div class="circle c3"></div>
					</v-chip>
				</div>
				<v-slide-x-transition>
					<v-chip
						v-if="expand3"
						v-show="expand3"
						class="elevation-1 fairexpandedchip interoperability"
						color="white"
						@click="expand3 = !expand3"
					>
						<span class="fair-text pl-2 text-caption">Interoperability</span>
						<v-chip class="inner-chip text-caption c3" color="#396fba"
							>70</v-chip
						>
					</v-chip>
				</v-slide-x-transition>

				<div class="sec">
					<v-chip
						v-if="!expand4"
						class="elevation-1 fairchip"
						color="white"
						@click="expand4 = !expand4"
					>
						<div class="circle c4"></div>
					</v-chip>
				</div>
				<v-slide-x-transition>
					<v-chip
						v-if="expand4"
						v-show="expand4"
						class="elevation-1 fairexpandedchip reusability"
						color="white"
						@click="expand4 = !expand4"
					>
						<span class="fair-text pl-2 text-caption">Reusability</span>
						<v-chip class="inner-chip text-caption c4" color="#396fba"
							>50</v-chip
						>
					</v-chip>
				</v-slide-x-transition>
			</div>
		</v-col>
	</v-row>
</template>
<script>
import ChipType from './ChipType.vue';
import LinkMorePublications from './LinkMorePublications.vue';
import LinkChipTopicOperation from './LinkChipTopicOperation.vue';
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
			expand1: false,
			expand2: false,
			expand3: false,
			expand4: false,
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
	},
};
</script>
<style>
#title {
	font-weight: 700 !important;
}

.subtitle {
	font-weight: 700 !important;
}

.v-card {
	width: 100%;
	display: inline-block;
	z-index: 1;
	min-height: 145px;
}

.main {
	max-width: 200px;
	display: inline-block;
	position: relative !important;
	margin-left: -40px;
	z-index: 0;
}

.sec {
	width: 80px;
}

.fairchip {
	width: 60px;
	margin-top: 3px;
	height: 28px !important;
}

.fairexpandedchip {
	width: 155px !important;
	margin-top: 3px;
	height: 28px !important;
}

.findability {
	width: 151px !important;
}

.accessibility {
	width: 163px !important;
}

.interoperability {
	width: 175px !important;
}

.reusability {
	width: 151px !important;
}

.fair-text {
	display: inline-block;
	margin-left: 15px;
	margin-right: 20px;
}

.circle {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	position: absolute;
	right: 8px;
	background-color: #396fba;
}

.inner-chip {
	height: 18px !important;
	background-color: #396fba;
	color: white !important;
	position: absolute;
	right: 8px;
}

.c1 {
	opacity: 0.9;
}

.c2 {
	opacity: 0.3;
}

.c3 {
	opacity: 0.7;
}

.c4 {
	opacity: 0.5;
}
</style>
