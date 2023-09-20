<template>
	<v-badge
		:value="hoverType"
		color="grey lighten-1"
		text-color="primary"
		content="Type of tool"
		right
		transition="slide-x-reverse-transition"
		class="mr-1 ml-7 mt-0 pt-0"
	>
		<v-hover v-model="hoverType">
			<v-chip
				label
				dense
				small
				color="grey lighten-2"
				outlined
				text-color="grey darken-1"
				class="text-caption"
			>
				{{ label.toUpperCase() }}
			</v-chip>
		</v-hover>
	</v-badge>
</template>
<script>
export default {
	name: 'TypeBadge',
	props: {
		label: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			hoverType: false,
		};
	},
};
</script>
