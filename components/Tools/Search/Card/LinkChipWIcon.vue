<template>
	<v-tooltip bottom attach color="#EAF1F7" max-width="450px" allow-overflow>
		<template #activator="{ on, attrs }">
			<v-chip
				small
				light
				color="grey lighten-4"
				class="pr-2 pl-1 mt-1"
				v-bind="attrs"
				@click="openLink(link)"
				v-on="on"
			>
				<v-icon small class="pa-1">{{ icon }}</v-icon>
				{{ text }}
			</v-chip>
		</template>
		<v-icon small class="pa-0">mdi-open-in-new</v-icon>
		<span class="text-caption black--text"> {{ link }} </span>
	</v-tooltip>
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
