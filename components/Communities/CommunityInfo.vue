<template>
	<div class="text--clickable" @click="expand = !expand">
		<h1 class="text-h4 d-flex">
			{{ community.acronym }}
			<v-btn class="ml-2" color="primary" icon>
				<v-icon>{{
					expand
						? 'mdi-chevron-up-circle-outline'
						: 'mdi-chevron-down-circle-outline'
				}}</v-icon>
			</v-btn>
		</h1>
		<h2 class="subtitle-1 mb-5">{{ community.name }}</h2>
		<v-expand-transition>
			<v-row v-show="expand" align="center">
				<v-col align="center" cols="2">
					<v-img :src="community.logo" contain max-width="500" />
				</v-col>
				<v-col class="text-body-2 text--secondary" cols="10">
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
				</v-col>
			</v-row>
		</v-expand-transition>
	</div>
</template>

<script>
export default {
	props: {
		community: { type: Object, required: true },
	},
	data() {
		return {
			expand: true,
		};
	},
};
</script>

<style lang="scss" scoped>
.text--clickable {
	cursor: pointer;
}
</style>
