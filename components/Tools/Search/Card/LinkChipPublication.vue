<template>
	<v-tooltip bottom attach color="#EAF1F7" max-width="450px" allow-overflow>
		<template #activator="{ on, attrs }">
			<v-chip
				small
				light
				color="grey lighten-4"
				class="pr-2 pl-1 mt-1"
				v-bind="attrs"
				@click="openLink"
				v-on="on"
			>
				<v-icon small class="pa-1">{{ icon }}</v-icon>
				{{ text }}
			</v-chip>
		</template>
		<span v-if="title" class="black--text text-caption font-weight-medium">
			{{ title }}
		</span>
		<span v-if="year" class="black--text text-caption font-weight-light">
			({{ year }})
		</span>
		<br v-if="title" />
		<span
			v-if="doi"
			class="black--text text-caption font-weight-light font-italic"
		>
			DOI: {{ doi }}</span
		>
	</v-tooltip>
</template>
<script>
export default {
	name: 'LinkChipPublication',
	props: {
		title: {
			type: String,
			required: false,
			default: '',
		},
		year: {
			type: Number,
			required: false,
			default: 0,
		},
		doi: {
			type: String,
			required: true,
		},
		pmcid: {
			type: String,
			required: false,
			default: '',
		},
		pmid: {
			type: String,
			required: false,
			default: '',
		},
		icon: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
	},
	methods: {
		openLink() {
			let link = '';

			if (this.doi) {
				link = 'https://doi.org/' + this.doi;
			} else if (this.pmcid) {
				link = 'https://www.ncbi.nlm.nih.gov/pmc/articles/' + this.pmcid;
			} else if (this.pmid) {
				link = 'https://pubmed.ncbi.nlm.nih.gov/' + this.pmid;
			} else {
				link = 'https://www.google.com/search?q=' + this.title;
			}
			window.open(link, '_blank');
		},
	},
};
</script>
