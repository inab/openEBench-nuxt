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
			<div class="main">
				<v-row>
					<v-col cols="3" class="mr-0 mt-0 mb-0 pb-0"
						><v-card
							class="sec pa-1 rounded-lg"
							elevation="1"
							v-if="!expand"
							@click="expand = !expand"
						>
							<v-row justify="end" class="mb-0 pb-0">
								<v-col cols="8" class="mt-1 pb-0 mr-1">
									<div class="circle" :style="opacity(findability)"></div>
								</v-col>
							</v-row>
							<v-row justify="end" class="mt-0 mb-0 pb-0">
								<v-col cols="8" class="justify-end pb-0 pt-2 mr-1">
									<div class="circle" :style="opacity(accessibility)"></div>
								</v-col>
							</v-row>
							<v-row justify="end" class="mt-0 mb-0 pb-0">
								<v-col cols="8" class="justify-end pb-0 pt-2 mr-1">
									<div class="circle" :style="opacity(interoperability)"></div>
								</v-col>
							</v-row>
							<v-row justify="end" class="mt-0 mb-0 pb-0">
								<v-col cols="8" class="justify-end pb-0 mb-1 pt-2 mr-1">
									<div class="circle" :style="opacity(reusability)"></div>
								</v-col>
							</v-row> </v-card
					></v-col>
					<v-col cols="9" class="trans mt-0 mb-0 pb-0"
						><v-slide-x-transition>
							<v-card
								class="pa-1 rounded-lg fairexpandedchip"
								elevation="1"
								v-if="expand"
								@click="expand = !expand"
							>
								<v-row justify="end" class="mb-0 pb-0">
									<v-col cols="12" class="pb-0 mr-1 d-flex align-center">
										<span class="fair-text pl-2 text-caption">Findability</span>
										<v-chip
											class="inner-chip text-caption"
											:style="opacity(findability)"
											><span :style="color(findability)">{{
												score(findability)
											}}</span></v-chip
										>
									</v-col>
								</v-row>
								<v-row justify="end" class="mt-0 mb-0 pb-0">
									<v-col cols="12" class="pb-0 pt-2 mr-1 d-flex align-center">
										<span class="fair-text pl-2 text-caption"
											>Accessibility</span
										>
										<v-chip
											class="inner-chip text-caption"
											:style="opacity(accessibility)"
											><span :style="color(accessibility)">{{
												score(accessibility)
											}}</span></v-chip
										>
									</v-col>
								</v-row>
								<v-row justify="end" class="mt-0 mb-0 pb-0">
									<v-col cols="12" class="pb-0 pt-2 mr-1 d-flex align-center">
										<span class="fair-text pl-2 text-caption"
											>Interoperability</span
										>
										<v-chip
											class="inner-chip text-caption"
											:style="opacity(interoperability)"
											><span :style="color(interoperability)">{{
												score(interoperability)
											}}</span></v-chip
										>
									</v-col>
								</v-row>
								<v-row justify="end" class="mt-0 mb-0 pb-0">
									<v-col cols="12" class="pb-0 pt-2 mr-1 d-flex align-center">
										<span class="fair-text pl-2 text-caption">Reusability</span>
										<v-chip
											class="inner-chip text-caption"
											:style="opacity(reusability)"
											><span :style="color(reusability)">{{
												score(reusability)
											}}</span></v-chip
										>
									</v-col>
								</v-row>
							</v-card>
						</v-slide-x-transition></v-col
					>
				</v-row>
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
		score(score) {
			// return the score of the letter from 0 to 100
			// Math.ceil to round up to the nearest integer
			console.log(score);
			return Math.ceil(score * 100);
		},
		opacity(score) {
			// return the opacity of the circle from 0 to 1
			return {
				background: 'rgba(57, 111, 186,' + score + ')',
			};
		},
		color(score) {
			// return the color of the circle from 0 to 1
			if (score < 0.4) {
				return {
					color: '#0B579F',
				};
			} else {
				return {
					color: 'white',
				};
			}
		},
		zIndex(order) {
			// return the zIndex of the card
			console.log(order);
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

.main {
	width: 250px;
	max-height: 100px;
	display: inline-block;
	position: relative !important;
	margin-left: -37px;
	z-index: 0;
}

.sec {
	width: 47px;
}

.trans {
	margin-left: -70px;
}

.fairchip {
	width: 60px;
	margin-top: 3px;
}

.fairexpandedchip {
	width: 165px !important;
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
	color: #0b579f;
}

.circle {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: #396fba;
}

.inner-chip {
	height: 18px !important;
	background-color: #396fba;
	color: white !important;
	position: absolute;
	right: 8px;
}
</style>
