<template>
	<v-tooltip bottom attach color="#EAF1F7" max-width="450px" allow-overflow>
		<template #activator="{ on, attrs }">
			<v-chip
				label
				small
				light
				color="grey lighten-4"
				class="mr-1 mt-1"
				link
				:href="uri"
				target="_blank"
				v-bind="attrs"
				v-on="on"
			>
				<v-icon small class="mr-1">{{ icon }}</v-icon>
				{{ text }}
			</v-chip>
		</template>
		<span class="black--text text-caption font-weight-light">
			{{ uri }}
		</span>
	</v-tooltip>
</template>
<script>
export default {
	name: 'LinkChipTopic',
	props: {
		uri: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: false,
			default: 'mdi-label-multiple',
		},
	},
};
</script>
