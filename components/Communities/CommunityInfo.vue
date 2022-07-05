<template>
	<div>
		<h1 class="text-h4 d-flex text--clickable" @click="expand = !expand">
			{{ community.acronym }}
			<v-btn
				class="ml-2"
				color="primary"
				icon
				aria-label="Expand Community Information"
			>
				<v-icon>{{
					expand
						? 'mdi-chevron-up-circle-outline'
						: 'mdi-chevron-down-circle-outline'
				}}</v-icon>
			</v-btn>
		</h1>
		<h2 class="subtitle-1 mb-5 text--clickable" @click="expand = !expand">
			{{ community.name }}
		</h2>
		<v-expand-transition>
			<v-row v-show="expand" align="center">
				<v-col align="center" cols="2">
					<v-img :src="community.logo" contain max-width="500" />
				</v-col>
				<v-col class="text-body-2 text--primary" cols="10">
					<p>
						{{ community.description }}
					</p>
					<p v-if="community.keywords">
						Keywords:
						<span
							v-for="(keyword, index) in community.keywords"
							:key="index"
							class="font-weight-medium"
						>
							{{ keyword }};
						</span>
					</p>
					<p v-if="communityReferences.length > 0">
						References:
						<a
							v-for="(keyword, index) in communityReferences"
							:key="index"
							target="_blank"
							class="font-weight-medium"
							:href="keyword.href"
						>
							<v-icon x-small>mdi-open-in-new</v-icon>
							{{ keyword.doi }};
						</a>
					</p>
					<p v-if="linksFiltered.length > 0">
						Links:
						<a
							v-for="(link, index) in linksFiltered"
							:key="index"
							target="_blank"
							class="font-weight-medium"
							:href="link.uri"
						>
							<v-icon x-small>mdi-open-in-new</v-icon>
							{{ link.label }};
						</a>
					</p>
				</v-col>
			</v-row>
		</v-expand-transition>
	</div>
</template>

<script>
export default {
	props: {
		community: { type: Object, required: true },
		communityReferences: { type: Array, required: false, default: () => [] },
	},
	data() {
		return {
			expand: false,
		};
	},
	computed: {
		linksFiltered() {
			if (!this.community.links) return [];
			return this.community.links.filter((link) => link.comment !== '@logo');
		},
	},
};
</script>

<style lang="scss" scoped>
.text--clickable {
	cursor: pointer;
}
</style>
