<template>
	<v-container class="mt-0 pt-0 pl-8">
		<!-- Documents -->
		<v-row
			v-if="documents.length"
			class="mt-0 pt-0 mb-0 section-row"
			align="center"
		>
			<v-col cols="3" class="pt-3 pb-3">
				<span class="section-label">Documents</span>
			</v-col>
			<v-col cols="9" class="pt-3 pb-3 d-flex flex-wrap" style="gap: 14px">
				<v-chip
					v-for="(item, i) in documents"
					:key="i"
					label
					color="grey lighten-3"
					text-color="grey darken-3"
					class="font-weight-medium"
					:href="item.term.url"
					target="_blank"
					rel="noopener"
				>
					{{ item.term.type.charAt(0).toUpperCase() + item.term.type.slice(1) }}
				</v-chip>
			</v-col>
		</v-row>

		<v-divider v-if="documents.length" />

		<!-- Related topics -->
		<!-- Vocabulary EDAM si lleva los 3 puntitos sino no. -->
		<v-row
			v-if="topics.length"
			class="mt-0 pt-0 mb-0 section-row"
			align="center"
		>
			<v-col cols="3" class="pt-3 pb-3">
				<span class="section-label">Related topics</span>
			</v-col>
			<v-col cols="9" class="pt-3 pb-3 d-flex flex-wrap" style="gap: 14px">
				<ItemChipMenu
					v-for="item in topics"
					:key="item.id"
					:text="item.term.term"
					:edam-id="item.term.uri"
					:vocabulary="item.term.vocabulary"
					:color="colorTopic"
					:text-color="textColorTopic"
				/>
			</v-col>
		</v-row>

		<v-divider v-if="topics.length" />

		<!-- Operations -->
		<v-row
			v-if="operations.length"
			class="mt-0 pt-0 mb-0 section-row"
			align="center"
		>
			<v-col cols="3" class="pt-3 pb-3">
				<span class="section-label">Function</span>
			</v-col>
			<v-col cols="9" class="pt-3 pb-3 d-flex flex-wrap" style="gap: 14px">
				<ItemChipMenu
					v-for="item in operations"
					:key="item.id"
					:text="item.term.term"
					:edam-id="item.term.uri"
					:color="colorOperation"
					:text-color="textColorOperation"
					:vocabulary="item.term.vocabulary"
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
			colorTopic: '#e0eaf3',
			textColorTopic: '#0b579f',
			colorOperation: '#e0eaf3',
			textColorOperation: '#0b579f',
		};
	},
	computed: {
		...mapGetters('tool_entry', {
			tool: 'tool',
			loading: 'loading',
		}),
		// Documentation entries that carry a link; entries with only inline
		// `content` (no URL) render no chip, so they are excluded here.
		documents() {
			return (this.tool?.documentation || []).filter(
				(d) => d.term && d.term.url
			);
		},
		topics() {
			return (this.tool?.topics || []).filter((t) => t.term && t.term.term);
		},
		operations() {
			return (this.tool?.operations || []).filter((o) => o.term && o.term.term);
		},
	},
};
</script>

<style scoped>
.section-label {
	font-size: 1rem;
	color: rgb(0, 0, 0);
}

.section-row {
	min-height: 64px;
}

.v-dialog {
	width: 75%;
	height: 70%;
}
</style>
