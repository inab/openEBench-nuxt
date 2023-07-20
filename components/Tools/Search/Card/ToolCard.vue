<template>
	<v-card class="m-1 pa-2 rounded-lg" outlined elevation="1">
		<v-card-title class="mb-0 pb-0">
			<h3 class="text-subtitle-1">
				<a id="title">{{ name }}</a>
			</h3>
			<v-spacer></v-spacer>
			<v-chip small label text-color="black" outlined>{{
				type.toUpperCase()
			}}</v-chip>
		</v-card-title>

		<v-card-text class="mb-0 mt-0 pt-1">
			<p class="text-caption mb-2">
				{{ description }}
			</p>
			<div v-if="topics.length > 0" justify="center" class="mt-1">
				<span class="text-caption text-center subtitle">Topics: </span>
				<v-chip
					v-for="(item, i) in topics"
					:key="i"
					label
					small
					light
					color="grey lighten-3"
					class="mr-1 mt-1"
				>
					{{ cleanString(item.term) }}
				</v-chip>
			</div>
			<div v-if="operations.length > 0" justify="center" class="mt-1">
				<span class="text-caption text-center subtitle">Operations: </span>
				<v-chip
					v-for="(item, i) in operations"
					:key="i"
					label
					small
					light
					color="grey lighten-3"
					class="mr-1 mt-1"
				>
					{{ cleanString(item.term) }}
				</v-chip>
			</div>
			<div justify="center" class="mt-2">
				<span class="text-caption text-center subtitle">Links: </span>
				<LinkChipWImage
					v-for="[key, value] in Object.entries(sources_labels)"
					:key="key"
					:link="value"
					:type="key"
					:text="key"
					light
					small
					class="mr-1"
				/>
				<LinkChipWIcon
					v-if="sources_labels['other']"
					:link="sources_labels['other']"
					icon="mdi-web"
					text="Homepage"
					color="grey darken-1"
					class="mr-1"
				/>
				<LinkChipPublication
					v-for="(item, i) in publications"
					:key="i"
					:doi="item.doi"
					:pmcid="item.pmcid"
					:pmid="item.pmid"
					:title="item.title"
					:year="item.year"
					icon="mdi-text-box-outline"
					text="Publication"
					color="grey darken-1"
					class="mr-1"
				/>
			</div>
		</v-card-text>
	</v-card>
</template>
<script>
import LinkChipWImage from '~/components/Tools/Search/Card/LinkChipWImage.vue';
import LinkChipWIcon from '~/components/Tools/Search/Card/LinkChipWIcon.vue';
import LinkChipPublication from '~/components/Tools/Search/Card/LinkChipPublication.vue';

export default {
	name: 'ToolCard',
	components: {
		LinkChipWImage,
		LinkChipWIcon,
		LinkChipPublication,
	},
	props: {
		name: {
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
		sources_labels: {
			type: Object,
			required: true,
		},
		publications: {
			type: Array,
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
		};
	},
	methods: {
		cleanString(str) {
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
</style>
