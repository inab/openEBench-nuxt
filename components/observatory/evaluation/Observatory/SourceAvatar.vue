<template>
	<v-tooltip bottom>
		<template #activator="{ on, attrs }">
			<v-avatar
				:color="avatarProps.color"
				size="22"
				class="ma-0 pa-0"
				v-bind="attrs"
				v-on="on"
			>
				<v-img :src="require(`~/static/${avatarProps.src}`)"></v-img>
			</v-avatar>
		</template>
		<span>{{ avatarProps.content }}</span>
	</v-tooltip>
</template>

<script>
export default {
	name: 'SourceAvatar',
	props: ['avatarProps', 'sources_labels'],
	data() {
		return {
			hover: false,
			lab: [],
			link: false,
		};
	},
};
</script>
