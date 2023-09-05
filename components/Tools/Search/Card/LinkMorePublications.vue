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
				Other publications
			</v-chip>
		</template>
		<span class="black--text text-caption"> See </span>
		<span class="black--text text-caption font-weight-medium">
			{{ publications.length }}
		</span>
		<span class="black--text text-caption"> more publications in </span>
		<span class="black--text text-caption font-weight-medium">
			{{ name }}
		</span>
		<span class="black--text text-caption"> entry. </span>
	</v-tooltip>
</template>
<script>
export default {
	name: 'LinkMorePublications',
	props: {
		publications: {
			type: Array,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: false,
			default: 'mdi-text-box-outline',
		},
	},
	methods: {
		openLink() {
			// 🚧 provisional, since tool page and enrouting is not implemented yet
			const link = 'https://openebench.bsc.es/tools/';
			window.open(link, '_blank');
		},
	},
};
</script>
