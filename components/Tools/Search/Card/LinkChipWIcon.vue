<template>
	<v-chip
		small
		light
		color="grey lighten-4"
		class="pr-2 pl-1 mt-1"
		@click="openLink(link)"
	>
		<v-icon small class="pa-1">{{ icon }}</v-icon>
		{{ text }}
	</v-chip>
</template>
<script>
export default {
	name: 'LinkChipWIcon',
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
	},
	methods: {
		openLink(link) {
			window.open(link, '_blank');
		},
	},
};
</script>
