<template>
	<v-chip label color="blue lighten-5">
		<span class="font-weight-medium text-body-2">{{ data.item.label }}</span>
		<v-badge
			:value="hoverType"
			color="grey lighten-1"
			text-color="primary"
			content="Type of tool"
			right
			transition="slide-x-reverse-transition"
			class="mr-1 ml-4"
		>
			<v-hover v-model="hoverType">
				<v-chip
					label
					dense
					small
					color="white"
					text-color="grey darken-3"
					class="text-caption"
				>
					{{ data.item.type.toUpperCase() }}
				</v-chip>
			</v-hover>
		</v-badge>
	</v-chip>

	<!--a :href="data.item['@id']" target="blank"-->
	<!--v-badge
                :value="hoverSee"
                color="grey lighten-1"
                text-color="primary"
                content="See tool"
                right
                transition="slide-x-reverse-transition"
                class="ml-1 mt-1"
                >
                <v-hover v-model="hoverSee">
                    <OEBMinimalLogo size="14px"/>
                </v-hover>
            </v-badge-->
	<!--/a-->

	<!--Sources
                :itemSources="data.item.sources_labels"
                justify="end"
                class="ml-auto mr-10"/-->
</template>
<script>
export default {
	name: 'ToolSearchRow',
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		hoverType: false,
		hoverSee: false,
	}),
	methods: {
		goToTool() {
			this.$router.push({ name: 'Tool', params: { id: this.data.item.id } });
		},
	},
};
</script>
