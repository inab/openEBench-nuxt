<template>
	<v-card elevation="0" class="pr-5 mb-4 pl-3">
		<v-row class="d-flex align-center">
			<v-col cols="9">
				<span class="text-h5">
					{{ name }}
				</span>
			</v-col>
			<v-col ref="Intro" cols="3" class="align-self-center">
				<ChipType :type="type" big />
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
			</v-col>
		</v-row>
		<!--v-row class="mt-0">
			<v-col cols="12" class="pt-1">

				<div v-if="topics.length > 0" justify="left" class="mt-1">
					<LinkChipTopicOperation
						v-for="(item, i) in topics"
						:key="i"
						:uri="item.term.uri"
						:text="cleanString(item.term.term)"
						icon="mdi-label-multiple"
						big
						class="mr-1"
					/>
				</div>

				<div v-if="operations.length > 0" justify="center" class="mt-3">
					<LinkChipTopicOperation
						v-for="(item, i) in operations"
						:key="i"
						:uri="item.term.uri"
						:text="cleanString(item.term.term)"
						icon="mdi-cog"
						big
						class="mr-1"
					/>
				</div>

				<div v-if="license.length > 0" justify="center" class="mt-2">
					<LinkChipWIcon
						v-for="(item, i) in license"
						:key="i"
						:link="item.term.u"
						icon="mdi-scale-balance"
						:text="item.term.name"
						light
						big
						label
						:disabled="item.term.url === ''"
						class="mr-1"
					/>
				</div>
			</v-col>
		</v-row-->
	</v-card>
</template>
<script>
import ChipType from '~/components/Tools/Search/Card/ChipType.vue';
// import LinkChipTopicOperation from '~/components/Tools/Search/Card/LinkChipTopicOperation.vue';
// import LinkChipWIcon from '~/components/Tools/Search/Card/LinkChipWIcon.vue';

export default {
	name: 'EntryIntro',
	components: {
		ChipType,
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
		repository: {
			type: Array,
			required: true,
		},
		license: {
			type: Array,
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
