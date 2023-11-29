<template>
	<v-container class="mt-0 pt-0 pl-8">
		<v-row class="mt-0 pt-0 mb-3">
			<v-col cols="12" class="pt-0 mt-0 mb-0 pb-1">
				<span class="text-subtitle d-flex align-center">
					<v-icon small color="black" class="mr-1">
						mdi-text-box-multiple-outline
					</v-icon>
					Documents
				</span>
			</v-col>
			<v-col cols="12" class="mt-0 pt-0 pl-8 ml-4">
				<v-list-item
					v-for="(item, i) in tool.documentation"
					:key="i"
					class="pl-2 pt-0 mt-0"
				>
					<v-chip label text-color="blue darken-4" color="blue lighten-4">
						<span class="text-overline font-weight-medium">{{
							item.term.type.toUpperCase()
						}}</span>
					</v-chip>
				</v-list-item>
			</v-col>
		</v-row>
		<v-row class="mt-0 pt-0 mb-3">
			<v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
				<span class="text-subtitle d-flex align-center">
					<v-icon small color="black" class="mr-1"> mdi-label-multiple</v-icon>
					Related topics
				</span>
			</v-col>
			<v-col cols="12" class="ml-3 pl-8">
				<ItemChipMenu
					v-for="item in tool.topics"
					:key="item.id"
					:text="item.term.term"
					:edam-id="item.term.uri"
					:color="colorTopic"
					:text-color="textColorTopic"
				/>
			</v-col>
		</v-row>
		<v-row class="mt-0 mb-3">
			<v-col cols="12" class="pt-1">
				<span class="text-subtitle d-flex align-center">
					<v-icon small color="black" class="mr-1"> mdi-cog</v-icon>
					Operations performed by the software
				</span>
			</v-col>
			<v-col cols="12" class="mt-0 pt-0 pl-8 ml-3">
				<ItemChipMenu
					v-for="item in tool.operations"
					:key="item.id"
					:text="item.term.term"
					:edam-id="item.term.uri"
					:color="colorOperation"
					:text-color="textColorOperation"
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
			colorTopic: 'green lighten-4',
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
</style>
