<template>
	<v-card elevation="0" class="pr-5 mb-4 pl-3">
		<v-row justify="space-between">
			<v-col cols="6">
				<span class="text-h4">
					{{ name }}
				</span>
			</v-col>
			<v-col ref="Intro" cols="6" class="d-flex align-center">
				<ChipType :type="type" big class="ml-auto font-weight-bold" />
			</v-col>
		</v-row>
		<v-row class="mt-0 pt-0">
			<v-col>
				<v-chip
					v-for="(item, i) in cleanVersion(version)"
					:key="i"
					color="primary lighten-2"
					small
					outlined
					class="pa-2 mt-0 mr-1"
				>
					<span class="font-weight-bold text-body-2">{{ item }}</span>
				</v-chip>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<p class="text-body-2">{{ description }}</p>

				<div class="d-flex justify-center">
					<LinkChipWImage
						v-for="[key, value] in Object.entries(sourcesLabels)"
						:key="key"
						:link="value"
						:type="key"
						:text="key"
						light
						class="ml-1 mr-2"
						big
					/>
					<LinkChipWIcon
						v-if="webpage"
						:link="webpage[0].term"
						text="Homepage"
						icon="mdi-web"
						class="ml-1"
						big
					/>
				</div>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import LinkChipWImage from '../Search/Card/LinkChipWImage.vue';
import LinkChipWIcon from '../Search/Card/LinkChipWIcon.vue';
import ChipType from '~/components/Tools/Search/Card/ChipType.vue';
import { getSoftwareTypeDescription } from '~/static/dictionaries/softwareTypes';

export default {
	name: 'EntryIntro',
	components: {
		ChipType,
		LinkChipWImage,
		LinkChipWIcon,
	},
	props: {
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		version: {
			type: Array,
			required: true,
		},
		webpage: {
			type: Array,
			required: true,
		},
		sourcesLabels: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			typeText: getSoftwareTypeDescription(this.type),
		};
	},

	methods: {
		cleanString(str) {
			if (!str) {
				return '';
			} else {
				// remove " at the beginning of the string
				if (str.charAt(0) === '"') {
					str = str.substr(1);
				}
				// remove " at the end of the string
				if (str.charAt(str.length - 1) === '"') {
					str = str.substr(0, str.length - 1);
				}
				return str;
			}
		},
		cleanVersion(version) {
			// remove null in version array
			return version.filter((item) => item);
		},
	},
};
</script>
