<template>
	<span>
		<v-tooltip
			v-if="!minimal"
			nudge-left
			bottom
			attach
			color="#EAF1F7"
			max-width="450px"
			allow-overflow
		>
			<template #activator="{ on }">
				<v-chip
					:small="!big"
					:label="label"
					light
					color="grey lighten-4"
					class="pl-1 mt-1"
					:class="style()"
					@click="openLink(link)"
					v-on="on"
				>
					<v-icon small class="pa-1">{{ icon }}</v-icon>
					<span>{{ text }}</span>
				</v-chip>
			</template>
			<span class="text-caption black--text"> {{ link }} </span>
		</v-tooltip>
		<v-chip
			v-else
			:small="!big"
			:label="label"
			light
			color="grey lighten-4"
			class="pl-1 mt-1"
			:class="style()"
			@click="openLink(link)"
			v-on="on"
		>
			<v-icon x-small class="pa-1">{{ icon }}</v-icon>
		</v-chip>
	</span>
</template>
<script>
export default {
	name: 'LinkChipWIcon',
	props: {
		text: {
			type: String,
			required: false,
		},
		link: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		big: {
			type: Boolean,
			required: false,
			default: false,
		},
		label: {
			type: Boolean,
			required: false,
			default: false,
		},
		minimal: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		openLink(link) {
			window.open(link, '_blank');
		},
		style() {
			if (this.minimal) {
				return 'pr-1';
			} else {
				return 'pr-2';
			}
		},
	},
};
</script>
