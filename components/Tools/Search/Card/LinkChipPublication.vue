<template>
	<v-tooltip bottom color="grey lighten-4" max-width="450px" allow-overflow>
		<template #activator="{ on, attrs }">
			<v-chip
				small
				light
				outlined
				color="grey lighten-3"
				:text-color="color"
				class="pr-2 pl-1 mt-1"
				v-bind="attrs"
				@click="openLink(link)"
				v-on="on"
			>
				<v-icon small class="pa-1">{{ icon }}</v-icon>
				{{ text }}
			</v-chip>
		</template>

		<span class="black--text text-caption font-weight-medium"
			>trimAl: A tool for automated alignment trimming in large-scale
			phylogenetic analyses</span
		>
		<br />
		<span class="black--text text-caption font-weight-light"
			>Capella-Gutierrez S. Silla-Martinez J.M. Gabaldon T.
		</span>
		<br />
		<span class="black--text text-caption font-weight-light font-italic"
			>Bioinformatics 2009</span
		>
	</v-tooltip>
</template>
<script>
export default {
	name: 'LinkChipPublication',
	props: {
		text: {
			type: String,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	},
	methods: {
		openLink(link) {
			window.open(link, '_blank');
		},
	},
};
</script>
