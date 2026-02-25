<template>
	<v-chip label color="blue lighten-5">
		<span class="font-weight-medium text-body-2">
			{{ data.item.label }}
		</span>

		<!-- 🔹 Caso 1: Si existe types (array) -->
		<template v-if="hasTypesArray">
			<v-chip
				v-for="(typeItem, index) in data.item.types"
				:key="index"
				label
				dense
				small
				color="white"
				text-color="grey darken-3"
				class="text-caption ml-3"
			>
				{{ typeItem.toUpperCase() }}
			</v-chip>
		</template>

		<!-- 🔹 Caso 2: Si existe type (string) -->
		<template v-else-if="hasSingleType">
			<v-chip
				label
				dense
				small
				color="white"
				text-color="grey darken-3"
				class="text-caption ml-3"
			>
				{{ data.item.type.toUpperCase() }}
			</v-chip>
		</template>
	</v-chip>

	<!-- Código comentado original -->
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
	computed: {
		hasTypesArray() {
			return (
				Array.isArray(this.data.item.types) && this.data.item.types.length > 0
			);
		},
		hasSingleType() {
			return (
				typeof this.data.item.type === 'string' &&
				this.data.item.type.length > 0
			);
		},
	},
	methods: {
		goToTool() {
			this.$router.push({
				name: 'Tool',
				params: { id: this.data.item.id },
			});
		},
	},
};
</script>
