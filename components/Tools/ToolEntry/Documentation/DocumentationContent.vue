<template>
	<v-container class="mt-0 pt-0 pl-8">
		<v-row
			v-if="tool.documentation && tool.documentation.length"
			class="mt-0 pt-0 mb-0"
		>
			<v-col cols="12" class="pt-0 mt-0 mb-0">
				<span class="text-subtitle d-flex align-center">
					<div class="pub-line mr-3 flex-shrink-0 dot-black"></div>
					Documents
				</span>
			</v-col>
			<v-col cols="12" class="mt-0 pt-0 pl-8 ml-3">
				<v-chip
					v-for="(item, i) in tool.documentation"
					:key="i"
					label
					text-color="blue darken-4"
					color="blue lighten-5"
					class="mr-4 mb-2"
				>
					<span class="text-overline font-weight-medium">{{
						item.term.type.toUpperCase()
					}}</span>
				</v-chip>
			</v-col>
		</v-row>
		<v-row v-if="tool.topics && tool.topics.length" class="mt-0 pt-0 mb-0">
			<v-col cols="12" class="mt-0 pt-0">
				<span class="text-subtitle d-flex align-center">
					<div class="pub-line mr-3 flex-shrink-0 dot-black"></div>
					Related topics
				</span>
			</v-col>
			<v-col cols="12" class="mt-0 pt-0 pl-8">
				<ItemChipMenu
					v-for="item in tool.topics"
					:key="item.id"
					:text="item.term.term"
					:edam-id="item.term.uri"
					:color="colorTopic"
					:text-color="textColorTopic"
					class="mb-2 mr-1"
				/>
			</v-col>
		</v-row>
		<v-row
			v-if="tool.operations && tool.operations.length"
			class="mt-0 pt-0 mb-0"
		>
			<v-col cols="12" class="mt-0 pt-0">
				<span class="text-subtitle d-flex align-center">
					<div class="pub-line mr-3 flex-shrink-0 dot-black"></div>
					Operations performed by the software
				</span>
			</v-col>
			<v-col cols="12" class="mt-0 pt-0 pl-8">
				<ItemChipMenu
					v-for="item in tool.operations"
					:key="item.id"
					:text="item.term.term"
					:edam-id="item.term.uri"
					:color="colorOperation"
					:text-color="textColorOperation"
					class="mb-2 mr-1"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import ItemChipMenu from './ItemChipMenu.vue';

export default {
	name: 'DocumentationContent',
	components: {
		ItemChipMenu,
	},
	data() {
		return {
			colorTopic: 'green lighten-5',
			textColorTopic: 'green darken-4',
			colorOperation: 'orange lighten-5',
			textColorOperation: 'orange darken-3',
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
	},
};
</script>

<style>
.v-dialog {
	width: 75%;
	height: 70%;
}

.pub-line {
	width: 2px;
	height: 20px;
	flex-shrink: 0;
}

.dot-black {
	background-color: rgba(17, 16, 16, 95%);
}
</style>
