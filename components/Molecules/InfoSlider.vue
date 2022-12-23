<template>
	<div class="text--clickable" @click="expand = !expand">
		<v-row>
			<v-col class="d-flex" cols="auto">
				<slot name="header" icon />
				<v-btn
					class="ml-2"
					color="primary"
					icon
					aria-label="Expand Information"
				>
					<v-icon>{{
						expand
							? 'mdi-chevron-up-circle-outline'
							: 'mdi-chevron-down-circle-outline'
					}}</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-expand-transition>
			<v-row v-show="expand" align="center">
				<v-col align="center" cols="6">
					<v-img :src="img" contain max-width="500" />
				</v-col>
				<v-col class="text-body-2" cols="6">
					<slot />
				</v-col>
			</v-row>
		</v-expand-transition>
	</div>
</template>

<script>
export default {
	props: {
		img: {
			type: String,
			required: true,
		},
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
