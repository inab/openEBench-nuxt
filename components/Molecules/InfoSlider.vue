<template>
	<div>
		<v-row>
			<v-col class="d-flex headline" cols="auto" @click="expand = !expand">
				<slot name="header" icon />
				<v-btn class="ml-2" color="primary" icon>
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
.headline {
	cursor: pointer;
}
</style>
